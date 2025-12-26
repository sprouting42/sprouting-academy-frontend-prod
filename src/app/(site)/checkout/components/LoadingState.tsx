import { CHECKOUT_MESSAGES } from "../utils/checkoutConstants";

export const LoadingState = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="alert"
      aria-live="polite"
    >
      <div className="text-center">
        <div
          className="animate-spin border-b-2 border-primary h-12 mx-auto rounded-full w-12"
          aria-hidden="true"
        />
        <p className="mt-4 text-foreground/70">{CHECKOUT_MESSAGES.LOADING}</p>
      </div>
    </div>
  );
};
