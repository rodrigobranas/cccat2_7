import Coupon from "../entity/Coupon";

export default interface CouponRepository {
    getByCode(code: string): Promise<Coupon | undefined>;
}
