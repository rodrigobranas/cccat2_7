import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Database from "../../database/Database";

export default class ItemRepositoryDatabase implements ItemRepository {
    database: Database;
    
    constructor (database: Database) {
        this.database = database;
    }

    async getAll(): Promise<Item[]> {
        const itemsData = await this.database.many("select * from ccca.item", []);
        const items: Item[] = [];
        for (const itemData of itemsData) {
            items.push(new Item(itemData.id, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight));
        }
        return items;
    }

    async getById(id: number): Promise<Item | undefined> {
        const itemData = await this.database.one("select * from ccca.item where id = $1", [id]);
        return new Item(itemData.id, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
    }
}
