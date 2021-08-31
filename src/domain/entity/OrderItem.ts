export default class OrderItem {
    idItem: number;
    price: number;
    quantity: number;

    constructor (idItem: number, price: number, quantity: number) {
        this.idItem = idItem;
        this.price = price;
        this.quantity = quantity;
    }

    getTotal () {
        return this.price * this.quantity;
    }
}
