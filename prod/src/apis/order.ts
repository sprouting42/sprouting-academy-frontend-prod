import { interceptedApiFetch } from "@/utils/api-interceptor";

import type { ApiResponse } from "./auth";

export type OrderItemRequest = {
  courseId: string;
};

export type CreateOrderRequest = {
  items: OrderItemRequest[];
  couponId?: string;
};

export type OrderItemResponse = {
  id: string;
  courseId: string;
  unitPrice: number;
  createdAt: string;
};

export type OrderResponse = {
  id: string;
  subtotalAmount: number;
  totalAmount: number;
  orderStatus: string;
  items: OrderItemResponse[];
  couponId: string | null;
  createdAt: string;
};

export const orderApi = {
  createOrder: async (
    payload: CreateOrderRequest,
  ): Promise<ApiResponse<OrderResponse>> => {
    return interceptedApiFetch.post<ApiResponse<OrderResponse>>(
      "order",
      payload,
    );
  },

  getOrderById: async (
    orderId: string,
  ): Promise<ApiResponse<OrderResponse>> => {
    return interceptedApiFetch.get<ApiResponse<OrderResponse>>(
      `order/${orderId}`,
    );
  },

  getMyOrders: async (): Promise<ApiResponse<OrderResponse[]>> => {
    return interceptedApiFetch.get<ApiResponse<OrderResponse[]>>("order");
  },
};
