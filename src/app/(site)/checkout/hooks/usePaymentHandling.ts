import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import type { OrderResponse } from "@/apis/order";
import { notificationApi } from "@/apis/payment";
import type { PaymentConfirmData } from "@/components/modal";
import { cartKeys } from "@/hooks/useCart";
import type { CartItem } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";

import { CHECKOUT_MESSAGES } from "../utils/checkoutConstants";
import {
  formatDateTime,
  formatItemName,
  formatPaymentTypeLabel,
} from "../utils/checkoutHelpers";

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
  const clearCart = useCartStore((state) => state.clearCart);
  const queryClient = useQueryClient();

  const handlePaymentSuccess = useCallback(
    async (
      paymentId: string,
      paymentType: "card" | "bank-transfer" | "promptpay",
    ) => {
      setIsPaymentCompleted(true);

      const userName = userFullName || "ผู้ใช้";
      const itemNames =
        selectedCartItems?.map((item) => item.name).filter(Boolean) || [];
      const allItemNames =
        itemNames.length > 0 ? itemNames.join(", ") : "สินค้า";

      if (paymentType === "card") {
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
      } else {
        toast.success(CHECKOUT_MESSAGES.PAYMENT_SUCCESS);
      }

      try {
        await notificationApi.sendDiscordNotification({
          courseName: allItemNames,
          userName,
          orderId: orderId || "",
          paymentId,
          paymentType: formatPaymentTypeLabel(paymentType),
        });
      } catch {}

      clearCart();
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
    },
    [
      orderId,
      selectedCartItems,
      orderData,
      userFullName,
      clearCart,
      queryClient,
    ],
  );

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
