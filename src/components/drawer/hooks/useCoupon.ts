import { useState } from "react";

import { COUPON_CODES } from "../utils/cartDrawerConstants";

export const useCoupon = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const applyCoupon = (code: string) => {
    const upperCode = code.toUpperCase().trim();
    const discount = COUPON_CODES[upperCode];
    setCouponDiscount(discount || 0);
  };

  const clearCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
  };

  return {
    couponCode,
    couponDiscount,
    setCouponCode,
    applyCoupon,
    clearCoupon,
  };
};
