import pgp from "pg-promise";
import Database from "../database/Database";

export default class PgPromiseDatabase implements Database {
    private pgp: any;
    static instance: PgPromiseDatabase;

    private constructor () {
        this.pgp = pgp()("postgres://postgres:123456@localhost:5432/app");
    }

    static getInstance() {
        if (!PgPromiseDatabase.instance) {
            PgPromiseDatabase.instance = new PgPromiseDatabase();
        }
        return PgPromiseDatabase.instance;
    }

    many(query: string, parameters: any) {
        return this.pgp.query(query, parameters);
    }
    
    one(query: string, parameters: any) {
        return this.pgp.oneOrNone(query, parameters);
    }

    none(query: string, parameters: any): void {
        return this.pgp.none(query, parameters);
    }
}
