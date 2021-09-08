import Item from "../entity/Item";

export default interface ItemRepository {
    getById(id: number): Promise<Item | undefined>;
    getAll(): Promise<Item[]>;
}