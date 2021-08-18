export default class PlaceOrderOutput {
    code: string;
    freight: number;
    total: number;

    constructor ({ code, freight, total }: { code: string, freight: number, total: number }) {
        this.code = code;
        this.freight = freight;
        this.total = total;
    }
}
