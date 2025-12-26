import { useQuery } from "@tanstack/react-query";

import { isApiErrorResponse, isApiSuccessResponse } from "@/apis/auth";
import { orderApi } from "@/apis/order";

export const useOrderData = (orderId: string | null) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) return null;

      const response = await orderApi.getOrderById(orderId);

      if (isApiErrorResponse(response)) {
        throw new Error(response.errorMessage || "Failed to get order");
      }

      if (isApiSuccessResponse(response)) {
        return response.responseContent;
      }

      throw new Error("Failed to get order");
    },
    enabled: !!orderId,
  });
};
