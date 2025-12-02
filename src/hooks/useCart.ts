import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { isApiErrorResponse } from "@/apis/auth";
import { cartApi, isApiSuccessResponse } from "@/apis/cart";
import { mapApiItemToCartItem } from "@/lib/cart/mapApiItemToCartItem";
import { CartItem, useCartStore } from "@/store/cartStore";
import { isAuthenticated } from "@/utils/auth";
import { clearCartTimestamp } from "@/utils/cartStorage";

import { useGetMe } from "./useAuth";

export const cartKeys = {
  all: ["cart"] as const,
  lists: () => [...cartKeys.all, "list"] as const,
  list: (authenticated: boolean) =>
    [...cartKeys.lists(), { authenticated }] as const,
};

export const syncCartOnLogin = async (
  localItems: CartItem[],
  clearCart: () => void,
) => {
  if (!isAuthenticated()) {
    return;
  }

  const serverCartResponse = await cartApi.getCart();
  if (!isApiSuccessResponse(serverCartResponse)) {
    throw new Error("Failed to sync cart");
  }

  const serverItems = serverCartResponse.responseContent.items;
  const serverCourseIds = new Set(serverItems.map((i) => i.courseId));

  const localOnlyItems = localItems.filter(
    (item) => !serverCourseIds.has(item.courseId),
  );

  if (localOnlyItems.length > 0) {
    const addPromises = localOnlyItems.map((item) =>
      cartApi.addItem({ courseId: item.courseId }),
    );
    await Promise.allSettled(addPromises);
  }

  clearCart();
  clearCartTimestamp();
};

export const useGetCart = () => {
  const { data: user } = useGetMe();
  const localItems = useCartStore((state) => state.items);

  return useQuery({
    queryKey: cartKeys.list(!!user && isAuthenticated()),
    queryFn: async () => {
      if (!isAuthenticated()) {
        return localItems;
      }
      const response = await cartApi.getCart();
      if (isApiSuccessResponse(response) && response.responseContent) {
        return response.responseContent.items.map(mapApiItemToCartItem);
      }
      throw new Error("Failed to fetch cart");
    },
    enabled: true,
  });
};

export type AddItemToCartInput = {
  courseId: string;
  courseName: string;
  price: number;
  date: string;
  totalTime: string;
  classType: string;
};

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  const addItemToStore = useCartStore((state) => state.addItem);
  const localItems = useCartStore((state) => state.items);

  return useMutation({
    mutationFn: async (item: AddItemToCartInput) => {
      if (!isAuthenticated()) {
        const existsInLocalCart = localItems.some(
          (existingItem) => existingItem.courseId === item.courseId,
        );
        if (existsInLocalCart) {
          throw new Error("ITEM_ALREADY_EXISTS");
        }

        const localItem: CartItem = {
          id: item.courseId,
          ...item,
        };
        addItemToStore(localItem);
        return {
          id: item.courseId,
          courseId: item.courseId,
          message: "Added to local cart",
        };
      }
      const response = await cartApi.addItem({ courseId: item.courseId });
      if (isApiSuccessResponse(response) && response.responseContent) {
        return response.responseContent;
      }
      if (
        isApiErrorResponse(response) &&
        response.errorDetails?.code === "CART.ITEM_ALREADY_EXISTS"
      ) {
        throw new Error("ITEM_ALREADY_EXISTS");
      }
      throw new Error("Failed to add item to cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
      toast.success("เพิ่มลงตะกร้าสำเร็จ");
    },
    onError: (error: Error) => {
      if (error.message === "ITEM_ALREADY_EXISTS") {
        toast.warning("คอร์สนี้มีอยู่ในตะกร้าแล้ว");
      } else {
        toast.error("ไม่สามารถเพิ่มสินค้าลงตะกร้า");
      }
    },
  });
};

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  const removeItemFromStore = useCartStore((state) => state.removeItem);

  return useMutation({
    mutationFn: async (cartItemId: string) => {
      if (!isAuthenticated()) {
        removeItemFromStore(cartItemId);
        return { message: "Removed from local cart" };
      }

      const response = await cartApi.removeItem(cartItemId);
      if (isApiSuccessResponse(response)) {
        return response.responseContent;
      }
      throw new Error("Failed to remove item from cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
      toast.success("ลบสินค้าออกจากตะกร้าสำเร็จ");
    },
    onError: () => {
      toast.error("ไม่สามารถลบสินค้าออกจากตะกร้า");
    },
  });
};
