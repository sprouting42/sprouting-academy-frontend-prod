import type { CartItem } from "@/store/cartStore";

import { CART_DRAWER_MESSAGES } from "../utils/cartDrawerConstants";
import { formatPrice } from "../utils/cartDrawerHelpers";
import { CouponInput } from "./CouponInput";

interface CartSummaryProps {
  totalPrice: number;
  discountPercent: number;
  discountAmount: number;
  couponDiscount: number;
  courses: CartItem[];
  checkedItems: Record<string, boolean>;
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  finalPrice: number;
}

export const CartSummary = ({
  totalPrice,
  discountPercent,
  discountAmount,
  couponDiscount,
  courses,
  checkedItems,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  finalPrice,
}: CartSummaryProps) => {
  return (
    <div className="border-foreground/10 border-t flex flex-col gap-3 pt-4">
      {/* Price breakdown */}
      <div className="flex justify-between">
        <span className="font-prompt text-foreground/70 text-sm">
          {CART_DRAWER_MESSAGES.PRICE_BEFORE_DISCOUNT}
        </span>
        <span className="font-prompt text-foreground text-sm">
          {formatPrice(totalPrice)} บาท
        </span>
      </div>

      {/* Course discount info */}
      {discountPercent > 0 && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="font-prompt text-foreground/70 text-sm">
              {CART_DRAWER_MESSAGES.COURSE_PACKAGE_DISCOUNT} ({discountPercent}
              %)
            </span>
            <span className="font-prompt text-secondary text-sm">
              -{formatPrice(discountAmount)} บาท
            </span>
          </div>
          <p className="font-prompt text-secondary text-sm">
            {discountPercent === 10
              ? CART_DRAWER_MESSAGES.DISCOUNT_SUGGESTION_10
              : CART_DRAWER_MESSAGES.DISCOUNT_SUGGESTION_20}
          </p>
        </div>
      )}

      {/* Suggest discount */}
      {discountPercent === 0 &&
        courses.filter((c) => checkedItems[c.id]).length === 1 && (
          <p className="font-prompt text-secondary text-sm">
            {CART_DRAWER_MESSAGES.DISCOUNT_SUGGESTION_0}
          </p>
        )}

      {/* Coupon section */}
      <CouponInput
        couponCode={couponCode}
        couponDiscount={couponDiscount}
        onCouponCodeChange={onCouponCodeChange}
        onApplyCoupon={onApplyCoupon}
      />

      {/* Final total */}
      <div className="border-foreground/20 border-t flex justify-between pt-3">
        <span className="font-bold font-prompt text-foreground">
          {CART_DRAWER_MESSAGES.FINAL_TOTAL}
        </span>
        <span className="font-bold font-prompt text-foreground">
          {formatPrice(finalPrice)} บาท
        </span>
      </div>
    </div>
  );
};
