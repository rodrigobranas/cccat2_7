import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import Database from "../../database/Database";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {
    database: Database;

    constructor (database: Database) {
        this.database = database;   
    }

    async getByIdItem(idItem: number): Promise<StockEntry[]> {
        const stockEntriesData = await this.database.many("select * from ccca.stock_entry where id_item = $1", [idItem]);
        const stockEntries = [];
        for (const stockEntryData of stockEntriesData) {
            stockEntries.push(new StockEntry(stockEntryData.id_item, stockEntryData.operation, stockEntryData.quantity, new Date()));
        }
        return stockEntries;
    }

    async save(stockEntry: StockEntry): Promise<void> {
        await this.database.none("insert into ccca.stock_entry (id_item, operation, quantity) values ($1, $2, $3)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity]);
    }

    async clean(): Promise<void> {
        await this.database.none("delete from ccca.stock_entry where operation = 'out'", []);
    }
}