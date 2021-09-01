import TaxTable from "../entity/TaxTable";

export default interface TaxTableRepository {
    getByIdItem(idItem: number): Promise<TaxTable[]>;
}
