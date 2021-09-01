import axios from "axios";

test.skip("Deve invocar a API /orders/${code}", async function () {
    const response = await axios({
        url: "http://localhost:3000/orders/202100000001",
        method: "get" 
    });
    const order = response.data;
    expect(order.code).toBe("202100000001");
});

test.skip("Deve invocar a API /orders", async function () {
    const response = await axios({
        url: "http://localhost:3000/orders",
        method: "post",
        data: {
            cpf: "778.278.412-36",
            zipcode: "11.111-11",
            items: [
                { idItem: 1, quantity: 2},
                { idItem: 2, quantity: 1},
                { idItem: 3, quantity: 3}
            ],
            coupon: "VALE20"
        }
    });
    const order = response.data;
    expect(order.total).toBe(5982);
});
