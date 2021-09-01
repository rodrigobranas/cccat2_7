import GetOrder from "../../application/get-order/GetOrder";
import PlaceOrder from "../../application/place-order/PlaceOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPIMemory from "../gateway/memory/ZipcodeCalculatorAPIMemory";
import Http from "./Http";

export default class RoutesConfig {
    http: Http;
    repositoryFactory: RepositoryFactory;

    constructor (http: Http, repositoryFactory: RepositoryFactory) {
        this.http = http;
        this.repositoryFactory = repositoryFactory;
    }

    build () {
        this.http.on("get", "/orders/${code}", async (params: any, body: any) => {
            const getOrder = new GetOrder(this.repositoryFactory);
            const order = await getOrder.execute(params.code);
            return order;
        });

        this.http.on("post", "/orders", async (params: any, body: any) => {
            const placeOrder = new PlaceOrder(this.repositoryFactory, new ZipcodeCalculatorAPIMemory());
            const order = await placeOrder.execute(body);
            return order;
        });
    }
}
