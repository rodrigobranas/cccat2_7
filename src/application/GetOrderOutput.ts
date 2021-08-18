export default class PlaceOrderOutput {
    code: string;
    freight: number;
    total: number;
    orderItems: { itemDescription: string, price: number, quantity: number }[];

    constructor ({ code, freight, total, orderItems }: { code: string, freight: number, total: number, orderItems:  { itemDescription: string, price: number, quantity: number }[] }) {
        this.code = code;
        this.freight = freight;
        this.total = total;
        this.orderItems = orderItems;
    }
}
