import { CHECKOUT_MESSAGES } from "../utils/checkoutConstants";

export const EmptyState = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="alert"
      aria-live="polite"
    >
      <div className="text-center">
        <p className="text-foreground/70">{CHECKOUT_MESSAGES.EMPTY_CART}</p>
      </div>
    </div>
  );
};
