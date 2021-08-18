export default class OrderCode {
    value: string;

    constructor (issueDate: Date, sequence: number) {
        this.value = `${issueDate.getFullYear()}${(new String(sequence)).padStart(8, "0")}`;
    }
}