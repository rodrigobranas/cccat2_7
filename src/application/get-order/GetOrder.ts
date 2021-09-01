import CouponRepository from "../../domain/repository/CouponRepository";
import FreightCalculator from "../../domain/service/FreightCalculator";
import ItemRepository from "../../domain/repository/ItemRepository";
import Order from "../../domain/entity/Order"
import OrderRepository from "../../domain/repository/OrderRepository";
import PlaceOrderInput from "../place-order/PlaceOrderInput";
import PlaceOrderOutput from "../place-order/PlaceOrderOutput";
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI";
import ZipcodeCalculatorAPIMemory from "../../infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import GetOrderOutput from "./GetOrderOutput";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetOrder {
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;

    constructor (repositoryFactory: RepositoryFactory) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute (code: string): Promise<GetOrderOutput> {
        const order = await this.orderRepository.get(code);
        const orderItems: any[] = [];
        for (const orderItem of order.items) {
            const item = await this.itemRepository.getById(orderItem.idItem);
            const orderItemOutput = {
                itemDescription: item?.description,
                price: orderItem.price,
                quantity: orderItem.quantity
            }
            orderItems.push(orderItemOutput);
        }
        return new GetOrderOutput({
            code: order.code.value,
            freight: order.freight,
            taxes: order.taxes,
            total: order.getTotal(),
            orderItems
        });
    }
}
