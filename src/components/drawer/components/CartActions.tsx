import { Button } from "@/components/common/button";

import { CART_DRAWER_MESSAGES } from "../utils/cartDrawerConstants";

interface CartActionsProps {
  onCheckout: () => void;
  disabled: boolean;
}

export const CartActions = ({ onCheckout, disabled }: CartActionsProps) => {
  return (
    <div className="flex flex-row gap-3 justify-between mt-4 pb-4">
      <Button
        variant="secondaryGradientBorder"
        shape="rounded"
        size="md"
        text={CART_DRAWER_MESSAGES.VIEW_ALL_COURSES}
        className="max-w-72 w-full xl:max-w-103"
      />
      <Button
        variant="primaryGradientBorder"
        shape="rounded"
        size="md"
        text={CART_DRAWER_MESSAGES.CHECKOUT}
        className="max-w-72 w-full xl:max-w-103"
        onClick={onCheckout}
        disabled={disabled}
      />
    </div>
  );
};
