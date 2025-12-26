import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

import { isApiErrorResponse, isApiSuccessResponse } from "@/apis/auth";
import { orderApi } from "@/apis/order";
import type { CartItem } from "@/store/cartStore";

import { CHECKOUT_MESSAGES } from "../utils/checkoutConstants";
import { buildOrderPayload } from "../utils/checkoutHelpers";

export const useOrderCreation = (
  selectedCartItems: CartItem[],
  onSuccess: (orderId: string) => void,
) => {
  const router = useRouter();
  const orderCreationAttempted = useRef(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedCartItems || selectedCartItems.length === 0) {
        throw new Error(CHECKOUT_MESSAGES.NO_ITEMS_SELECTED);
      }

      const payload = buildOrderPayload(selectedCartItems);

      console.log("[Checkout] createOrder payload:", payload);

      const response = await orderApi.createOrder(payload);

      console.log("[Checkout] createOrder response:", response);

      if (isApiErrorResponse(response)) {
        throw new Error(response.errorMessage || CHECKOUT_MESSAGES.ORDER_ERROR);
      }

      if (isApiSuccessResponse(response)) {
        return response.responseContent;
      }

      throw new Error(CHECKOUT_MESSAGES.ORDER_ERROR);
    },
    onSuccess: (order) => {
      onSuccess(order.id);
    },
    onError: (error: Error) => {
      toast.error(error.message || CHECKOUT_MESSAGES.ORDER_ERROR);
      router.push("/courses");
    },
  });

  return { mutation, orderCreationAttempted };
};
