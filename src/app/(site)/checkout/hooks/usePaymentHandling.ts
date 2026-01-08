import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { cartApi } from "@/apis/cart";
import type { OrderResponse } from "@/apis/order";
import type { PaymentConfirmData } from "@/components/modal";
import { cartKeys } from "@/hooks/useCart";
import type { CartItem } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";
import { isAuthenticated } from "@/utils/auth";

import { formatDateTime, formatItemName } from "../utils/checkoutHelpers";

export const usePaymentHandling = (
  orderId: string | null,
  selectedCartItems: CartItem[],
  orderData: OrderResponse | null | undefined,
  userFullName?: string,
) => {
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] =
    useState<PaymentConfirmData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const handlePaymentSuccess = useCallback(async () => {
    setIsPaymentCompleted(true);

    const userName = userFullName || "ผู้ใช้";
    const itemNames =
      selectedCartItems?.map((item) => item.name).filter(Boolean) || [];

    const totalAmount = orderData?.totalAmount || 0;
    const itemCount = selectedCartItems?.length || 0;

    const paymentData: PaymentConfirmData = {
      amount: totalAmount,
      userName,
      itemName: formatItemName(itemNames, itemCount),
      orderNumber: orderId || "",
      dateTime: formatDateTime(new Date()),
    };
    setPaymentSuccessData(paymentData);
    setIsModalOpen(true);

    if (selectedCartItems.length > 0) {
      if (isAuthenticated()) {
        await Promise.allSettled(
          selectedCartItems.map((item) => cartApi.removeItem(item.id)),
        );
      } else {
        selectedCartItems.forEach((item) => {
          useCartStore.getState().removeItem(item.id);
        });
      }
    }

    queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
  }, [orderId, selectedCartItems, orderData, userFullName, queryClient]);

  const handlePaymentError = useCallback((error: string) => {
    toast.error(error);
  }, []);

  return {
    isPaymentCompleted,
    paymentSuccessData,
    isModalOpen,
    setIsModalOpen,
    handlePaymentSuccess,
    handlePaymentError,
  };
};
