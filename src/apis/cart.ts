import { ApiResponse, isApiSuccessResponse } from "@/apis/auth";
import { ItemType } from "@/enum/itemType";
import { interceptedApiFetch } from "@/utils/api-interceptor";

export type AddItemRequest = {
  productId: string;
  productType: "course" | "ebook" | "bootcamp";
};

export type CartItemDetail = {
  id: string;
  productId: string;
  productType: ItemType;
  title: string;
  price: number;
  imageUrl?: string | null;
  courseDate?: string | null;
  classType?: string | null;
  totalTimesCourse?: number | null;
  totalClass?: number | null;
  earlyBirdPrice?: number;
  isEarlyBird?: boolean;
  availableDates?: string[];
  pageCount?: number;
  startDate?: string | null;
  duration?: string | null;
  schedule?: string | null;
  features?: string[];
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
