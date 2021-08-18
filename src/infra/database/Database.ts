export default interface Database {
    many(query: string, parameters: any): any;
    one(query: string, parameters: any): any;
    none(query: string, parameters: any): void;
}
