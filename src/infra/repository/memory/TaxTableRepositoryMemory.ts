import TaxTable from "../../../domain/entity/TaxTable";
import TaxTableRepository from "../../../domain/repository/TaxTableRepository";

export default class TaxTableRepositoryMemory implements TaxTableRepository {
    taxTables: TaxTable[];

    constructor () {
        this.taxTables = [
            new TaxTable(1, "default", 15),
            new TaxTable(2, "default", 15),
            new TaxTable(3, "default", 5),
            new TaxTable(1, "november", 5),
            new TaxTable(2, "november", 5),
            new TaxTable(3, "november", 1),
        ];
    }

    getByIdItem(idItem: number): Promise<TaxTable[]> {
        return Promise.resolve(this.taxTables.filter(taxTable => taxTable.idItem === idItem));
    }
}