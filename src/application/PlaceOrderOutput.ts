export default class PlaceOrderOutput {
    freight: number;
    total: number;

    constructor ({ freight, total }: { freight: number, total: number }) {
        this.freight = freight;
        this.total = total;
    }
}
