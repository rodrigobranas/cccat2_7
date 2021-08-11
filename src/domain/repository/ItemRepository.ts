import Item from "../entity/Item";

export default interface ItemRepository {
    getById(id: string): Promise<Item | undefined>;
}