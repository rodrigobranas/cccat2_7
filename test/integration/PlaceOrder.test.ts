import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInput from "../../src/application/PlaceOrderInput";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

test("Deve fazer um pedido", async function () {
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
    const repositoryFactory = new DatabaseRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5982);
});

test("Deve fazer um pedido com cupom de desconto expirado", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { idItem: 1, quantity: 2},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    });
    const repositoryFactory = new DatabaseRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(7400);
});

test("Deve fazer um pedido com cálculo de frete", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { idItem: 1, quantity: 2},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    });
    const repositoryFactory = new DatabaseRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    const output = await placeOrder.execute(input);
    expect(output.freight).toBe(310);
});

test("Deve fazer um pedido calculando o código", async function () {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { idItem: 1, quantity: 2},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3}
        ],
        issueDate: new Date("2020-10-10"),
        coupon: "VALE20_EXPIRED"
    });
    const repositoryFactory = new DatabaseRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator);
    await placeOrder.execute(input);
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202000000002");
});
