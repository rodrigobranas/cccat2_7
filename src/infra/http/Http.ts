export default interface Http {
    on (method: string, url: string, fn: any): Promise<void>;
    filter (fn: any): Promise<void>;
    listen (port: number): Promise<void>;
}
