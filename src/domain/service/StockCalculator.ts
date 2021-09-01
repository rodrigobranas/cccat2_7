import StockEntry from "../entity/StockEntry";

export default class StockCalculator {
    constructor () {
    }

    calculate (stockEntries: StockEntry[]) {
        let quantity = 0;
        for (const stockEntry of stockEntries) {
            if (stockEntry.operation === "in") {
                quantity += stockEntry.quantity;
            }
            if (stockEntry.operation === "out") {
                quantity -= stockEntry.quantity;
            }
        }
        return quantity;
    }
}