export default class PlaceOrderOutput {
    code: string;
    freight: number;
    taxes: number;
    total: number;
    orderItems: { itemDescription: string, price: number, quantity: number }[];

    constructor ({ code, freight, taxes, total, orderItems }: { code: string, freight: number, taxes: number, total: number, orderItems:  { itemDescription: string, price: number, quantity: number }[] }) {
        this.code = code;
        this.freight = freight;
        this.taxes = taxes;
        this.total = total;
        this.orderItems = orderItems;
    }
}
