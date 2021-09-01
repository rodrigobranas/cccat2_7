import PlaceOrder from "../../src/application/place-order/PlaceOrder";
import PlaceOrderInput from "../../src/application/place-order/PlaceOrderInput";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import GetOrder from "../../src/application/get-order/GetOrder";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI";

let repositoryFactory: RepositoryFactory;
let zipcodeCalculator: ZipcodeCalculatorAPI;

beforeEach(async function () {
    repositoryFactory = new DatabaseRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const stockEntryRepository = repositoryFactory.createStockEntryRepository();
    await stockEntryRepository.clean();
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
});

test("Deve consultar um pedido", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { idItem: 1, quantity: 2},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        coupon: "VALE20"
    });
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    const output = await placeOrder.execute(input);
    const getOrder = new GetOrder(repositoryFactory);
    const getOrderOutput = await getOrder.execute(output.code);
    expect(getOrderOutput.total).toBe(5982);
});
