import axios from "axios";

test.skip("Deve invocar a API /orders/${code}", async function () {
    const response1 = await axios({
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
            issueDate: new Date("2021-10-10"),
            coupon: "VALE20"
        }
    });
    const newOrder = response1.data;
    const response2 = await axios({
        url: `http://localhost:3000/orders/${newOrder.code}`,
        method: "get" 
    });
    const getOrder = response2.data;
    expect(getOrder.code).toBe(newOrder.code);
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
            issueDate: new Date("2021-10-10"),
            coupon: "VALE20"
        }
    });
    const order = response.data;
    expect(order.total).toBe(5982);
});
