import CouponRepository from "../domain/repository/CouponRepository";
import FreightCalculator from "../domain/service/FreightCalculator";
import ItemRepository from "../domain/repository/ItemRepository";
import Order from "../domain/entity/Order"
import OrderRepository from "../domain/repository/OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ZipcodeCalculatorAPI from "../domain/gateway/ZipcodeCalculatorAPI";
import ZipcodeCalculatorAPIMemory from "../infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import RepositoryFactory from "../domain/factory/RepositoryFactory";

export default class PlaceOrder {
    zipcodeCalculator: ZipcodeCalculatorAPIMemory;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;

    constructor (repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.zipcodeCalculator = zipcodeCalculator;
    }

    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-99");
        for (const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.idItem);
            if (!item) throw new Error("Item not found");
            order.addItem(orderItem.idItem, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        const total = order.getTotal();
        await this.orderRepository.save(order);
        return new PlaceOrderOutput({
            freight: order.freight,
            code: order.code.value,
            total
        });
    }
}
