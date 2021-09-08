import GetItems from "../../application/get-items/GetItems";
import GetOrder from "../../application/get-order/GetOrder";
import Login from "../../application/login/Login";
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
        this.http.filter(async (params: any, body:  any) => {
            console.log("Log", new Date());
            return true;
        });

        this.http.on("get", "/orders/${code}", async (params: any, body: any) => {
            const getOrder = new GetOrder(this.repositoryFactory);
            const order = await getOrder.execute(params.code);
            return order;
        });

        this.http.on("post", "/orders", async (params: any, body: any) => {
            const placeOrder = new PlaceOrder(this.repositoryFactory, new ZipcodeCalculatorAPIMemory());
            body.issueDate = new Date(body.issueDate);
            const order = await placeOrder.execute(body);
            return order;
        });

        this.http.on("get", "/items", async (params: any, body: any) => {
            const getItems = new GetItems(this.repositoryFactory);
            const items = await getItems.execute();
            return items;
        });

        this.http.on("post", "/login", async (params: any, body: any) => {
            const login = new Login();
            const loginOutput = await login.execute();
            return loginOutput;
        });
    }
}
