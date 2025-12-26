import { CART_DRAWER_MESSAGES } from "../utils/cartDrawerConstants";

export const CartEmptyState = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12">
      <span className="mb-4 text-5xl">🛒</span>
      <p className="font-prompt text-foreground/60">
        {CART_DRAWER_MESSAGES.EMPTY_CART}
      </p>
    </div>
  );
};
