import { useEffect } from "react";

import { orderApi } from "@/apis/order";

export const useOrderCleanup = (
  orderId: string | null,
  isPaymentCompleted: boolean,
) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (orderId && !isPaymentCompleted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (orderId && !isPaymentCompleted) {
        orderApi.cancelOrder(orderId).catch(() => {});
      }
    };
  }, [orderId, isPaymentCompleted]);
};
