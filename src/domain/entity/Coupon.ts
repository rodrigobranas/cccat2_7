export default class Coupon {
    code: string;
    percentage: number;
    expireDate: Date;

    constructor (code: string, percentage: number, expireDate: Date) {
        this.code = code;
        this.percentage = percentage;
        this.expireDate = expireDate;
    }

    isExpired() {
        const today = new Date();
        return (this.expireDate.getTime() < today.getTime());
    }
}
