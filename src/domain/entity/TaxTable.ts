export default class TaxTable {
    idItem: number;
    type: string;
    value: number;

    constructor (idItem: number, type: string, value: number) {
        this.idItem = idItem;
        this.type = type;
        this.value = value;
    }
}