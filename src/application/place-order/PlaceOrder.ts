import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI";
import ZipcodeCalculatorAPIMemory from "../../infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import OrderCreator from "../../domain/service/OrderCreator";

export default class PlaceOrder {
    zipcodeCalculator: ZipcodeCalculatorAPIMemory;
    repositoryFactory: RepositoryFactory;

    constructor (repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipcodeCalculatorAPI) {
        this.repositoryFactory = repositoryFactory;
        this.zipcodeCalculator = zipcodeCalculator;
    }

    // Registry
    // DI
    async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const orderService = new OrderCreator(this.repositoryFactory, this.zipcodeCalculator);
        const order = await orderService.create(input);
        const total = order.getTotal();
        return new PlaceOrderOutput({
            freight: order.freight,
            taxes: order.taxes,
            code: order.code.value,
            total
        });
    }
}
