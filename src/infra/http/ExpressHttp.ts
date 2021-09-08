import Http from "./Http";
import express from "express";

export default class ExpressHttp implements Http {
    app: any;

    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.app.all('*', function (req: any, res: any, next: any) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type,authentication');
            next();
        });
        this.app.options("*", function (req: any, res: any) {
            res.end();
        });
    }

    async filter(fn: any): Promise<void> {
        this.app.use("/", async function (req: any, res: any, next: any) {
            const result = await fn(req.params, req.body);
            if (result) {
                next();
            } else {
                res.end();
            }
        });
    }

    convertUrl (url: string) {
        return url.replace(/\$\{/g, ":").replace(/\}/g, "");
    }

    async on(method: string, url: string, fn: any): Promise<void> {
        this.app[method](this.convertUrl(url), async (req: any, res: any) => {
            const data = await fn(req.params, req.body);
            res.json(data);
        });
    }

    async listen(port: number): Promise<void> {
        this.app.listen(port);
    }
}
