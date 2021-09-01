import TaxTable from "../entity/TaxTable";
import TaxCalculator from "./TaxCalculator";

export default class NovemberTaxCalculator extends TaxCalculator {

    getTax(taxTables: TaxTable[]): number {
        const taxTable = taxTables.find(taxTable => taxTable.type === "november");
        if (!taxTable) return 0;
        return taxTable.value;
    }
}