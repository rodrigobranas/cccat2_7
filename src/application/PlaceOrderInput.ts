export default class PlaceOrderInput {
    cpf: string;
    zipcode: string;
    items: any;
    coupon: string;

    constructor ({ cpf, zipcode, items, coupon }: { cpf: string, zipcode: string, items: any, coupon: string }) {
        this.cpf = cpf;
        this.zipcode = zipcode;
        this.items = items;
        this.coupon = coupon;
    }
}
