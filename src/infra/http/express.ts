import express from "express";
import GetOrder from "../../application/GetOrder";
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory";
const app = express();

app.get("/orders/:code", async function (req: any, res: any) {
    const getOrder = new GetOrder(new DatabaseRepositoryFactory());
    const order = await getOrder.execute(req.params.code);
    res.json(order);
});

app.listen(3000);