import FreightCalculator from "../../src/domain/service/FreightCalculator";
import Item from "../../src/domain/entity/Item";

test("Deve calcular o frete do amplificador", function () {
    const item = new Item(1, "Guitarra", 1000, 100, 50, 15, 3);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(30);
});

test("Deve calcular o frete do amplificador", function () {
    const item = new Item(2, "Amplificador", 5000, 50, 50, 50, 22);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(220);
});

test("Deve calcular o frete do cabo", function () {
    const item = new Item(3, "Cabo", 30, 9, 9, 9, 0.1);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(10);
});
