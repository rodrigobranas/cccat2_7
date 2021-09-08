import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
    items: Item[];

    constructor () {
        this.items = [
            new Item(1, "Guitarra", 1000, 100, 50, 15, 3),
            new Item(2, "Amplificador", 5000, 50, 50, 50, 22),
            new Item(3, "Cabo", 30, 10, 10, 10, 1)
        ];
    }

    getAll(): Promise<Item[]> {
        return Promise.resolve(this.items);
    }

    getById(id: number): Promise<Item | undefined> {
        return Promise.resolve(this.items.find(item => item.id === id));
    }
}
