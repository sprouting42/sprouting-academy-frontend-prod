import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import type { CartItem } from "@/store/cartStore";

import { CHECKOUT_MESSAGES } from "../utils/checkoutConstants";

interface UseAutoCreateOrderParams {
  isCartLoading: boolean;
  selectedCartItems: CartItem[];
  orderId: string | null;
  createOrderMutation: {
    mutate: () => void;
  };
  cartError: Error | null;
  orderCreationAttempted: React.MutableRefObject<boolean>;
}

export const useAutoCreateOrder = ({
  isCartLoading,
  selectedCartItems,
  orderId,
  createOrderMutation,
  cartError,
  orderCreationAttempted,
}: UseAutoCreateOrderParams) => {
  const router = useRouter();

  useEffect(() => {
    if (cartError) {
      toast.error(CHECKOUT_MESSAGES.CART_ERROR);
      router.push("/courses");
      return;
    }

    if (
      !isCartLoading &&
      selectedCartItems &&
      selectedCartItems.length > 0 &&
      !orderId &&
      !orderCreationAttempted.current
    ) {
      orderCreationAttempted.current = true;
      createOrderMutation.mutate();
    } else if (
      !isCartLoading &&
      (!selectedCartItems || selectedCartItems.length === 0) &&
      !orderId &&
      !orderCreationAttempted.current
    ) {
      toast.error(CHECKOUT_MESSAGES.EMPTY_CART);
      router.push("/courses");
    }
  }, [
    isCartLoading,
    selectedCartItems,
    orderId,
    createOrderMutation,
    cartError,
    router,
    orderCreationAttempted,
  ]);
};
