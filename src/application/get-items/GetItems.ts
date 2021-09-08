import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import ItemRepository from "../../domain/repository/ItemRepository";
import GetItemOutput from "./GetItemOutput";

export default class GetItems {
    itemsRepository: ItemRepository;

    constructor (repositoryFactory: RepositoryFactory) {
        this.itemsRepository = repositoryFactory.createItemRepository();
    }

    async execute(): Promise<GetItemOutput[]> {
        const items = await this.itemsRepository.getAll();
        const getItemsOutput = [];
        for (const item of items) {
            getItemsOutput.push(new GetItemOutput(item.id, item.description, item.price, item.width, item.height, item.length, item.weight));
        }
        return getItemsOutput;
    }
}
