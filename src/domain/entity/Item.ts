export default class Item {
    id: number;
    description: string;
    price: number;
    width: number;
    height: number;
    length: number;
    weight: number;

    constructor (id: number, description: string, price: number, width: number, height: number, length: number, weight: number) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.width = width;
        this.height = height;
        this.length = length;
        this.weight = weight;
    }

    getVolume() {
        return this.width/100 * this.height/100 * this.length/100;
    }

    getDensity() {
        return this.weight / this.getVolume();
    }
}
