import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Database from "../../database/Database";

export default class ItemRepositoryDatabase implements ItemRepository {
    database: Database;
    
    constructor (database: Database) {
        this.database = database;
    }

    async getById(id: number): Promise<Item | undefined> {
        const itemData = await this.database.one("select * from ccca.item where id = $1", [id]);
        return new Item(itemData.id, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
    }
}
