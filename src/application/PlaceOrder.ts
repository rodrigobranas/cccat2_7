import CouponRepository from "../domain/repository/CouponRepository";
import FreightCalculator from "../domain/service/FreightCalculator";
import ItemRepository from "../domain/repository/ItemRepository";
import Order from "../domain/entity/Order"
import OrderRepository from "../domain/repository/OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ZipcodeCalculatorAPI from "../domain/gateway/ZipcodeCalculatorAPI";
import ZipcodeCalculatorAPIMemory from "../infra/gateway/memory/ZipcodeCalculatorAPIMemory";

export default class PlaceOrder {
    zipcodeCalculator: ZipcodeCalculatorAPIMemory;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;

    constructor (itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
        this.zipcodeCalculator = zipcodeCalculator;
    }

    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const order = new Order(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, "99.999-99");
        for (const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.id);
            if (!item) throw new Error("Item not found");
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        const total = order.getTotal();
        this.orderRepository.save(order);
        return new PlaceOrderOutput({
            freight: order.freight,
            total
        });
    }
}
