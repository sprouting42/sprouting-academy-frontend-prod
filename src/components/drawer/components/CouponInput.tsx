import { TagIcon } from "@phosphor-icons/react/dist/csr/Tag";

import { CART_DRAWER_MESSAGES } from "../utils/cartDrawerConstants";

interface CouponInputProps {
  couponCode: string;
  couponDiscount: number;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
}

export const CouponInput = ({
  couponCode,
  couponDiscount,
  onCouponCodeChange,
  onApplyCoupon,
}: CouponInputProps) => {
  return (
    <>
      {couponDiscount > 0 && (
        <div className="flex justify-between">
          <span className="font-prompt text-foreground/70 text-sm">
            {CART_DRAWER_MESSAGES.COUPON_DISCOUNT}
          </span>
          <span className="font-prompt text-secondary text-sm">
            -{couponDiscount.toLocaleString()} บาท
          </span>
        </div>
      )}

      <div className="flex gap-4 items-center justify-between mt-2">
        <span className="font-prompt shrink-0 text-foreground/70 text-sm">
          {CART_DRAWER_MESSAGES.COUPON_LABEL}
        </span>
        <div className="flex gap-4">
          <div className="bg-[rgba(15,15,15,1)] border border-foreground/20 flex flex-1 gap-2 px-4 py-2.5 rounded-sm w-102">
            <TagIcon
              size={16}
              weight="duotone"
              className="shrink-0 text-foreground/60"
            />
            <input
              type="text"
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value)}
              placeholder={CART_DRAWER_MESSAGES.COUPON_PLACEHOLDER}
              className="bg-transparent flex-1 font-prompt outline-none placeholder:text-foreground/40 text-foreground text-sm"
            />
          </div>
          <button
            type="button"
            onClick={onApplyCoupon}
            className="bg-[rgba(30,41,59,1)] font-medium font-prompt hover:bg-[rgba(40,51,69,1)] px-6 py-2.5 rounded-sm shrink-0 text-foreground text-sm transition-colors"
          >
            {CART_DRAWER_MESSAGES.APPLY}
          </button>
        </div>
      </div>
    </>
  );
};
