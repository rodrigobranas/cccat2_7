import DefaultTaxCalculator from "../service/DefaultTaxCalculator";
import NovemberTaxCalculator from "../service/NovemberTaxCalculator";

export default class TaxCalculatorFactory {

    static create(date: Date) {
        if (date.getMonth() === 10) {
            return new NovemberTaxCalculator();
        }
        return new DefaultTaxCalculator();
    }
}