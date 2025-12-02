import { ApiResponse, isApiSuccessResponse } from "@/apis/auth";
import { interceptedApiFetch } from "@/utils/api-interceptor";

export type AddItemRequest = {
  courseId: string;
};

export type CartItemDetail = {
  id: string;
  courseId: string;
  courseTitle: string;
  courseDate?: string | null;
  price: number;
  classType?: string | null;
  totalTimesCourse?: number | null;
  totalClass?: number | null;
};

export type CartResponse = {
  id: string;
  items: CartItemDetail[];
  totalPrice: number;
  itemCount: number;
};

export type AddItemResponse = {
  id: string;
  courseId: string;
  message: string;
};

export type DeleteItemResponse = {
  message: string;
};

export const cartApi = {
  getCart: async (): Promise<ApiResponse<CartResponse>> => {
    return interceptedApiFetch.get<ApiResponse<CartResponse>>("cart");
  },

  addItem: async (
    payload: AddItemRequest,
  ): Promise<ApiResponse<AddItemResponse>> => {
    return interceptedApiFetch.post<ApiResponse<AddItemResponse>>(
      "cart/items",
      payload,
    );
  },

  removeItem: async (
    cartItemId: string,
  ): Promise<ApiResponse<DeleteItemResponse>> => {
    return interceptedApiFetch.delete<ApiResponse<DeleteItemResponse>>(
      `cart/items/${cartItemId}`,
    );
  },
};

export { isApiSuccessResponse };
