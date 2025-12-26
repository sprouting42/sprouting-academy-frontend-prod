import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { isApiErrorResponse } from "@/apis/auth";
import {
  type AddItemRequest,
  cartApi,
  isApiSuccessResponse,
} from "@/apis/cart";
import { ItemType } from "@/enum/itemType";
import { mapApiItemToCartItem } from "@/lib/cart/mapApiItemToCartItem";
import {
  BootcampCartItem,
  CartItem,
  CourseCartItem,
  EbookCartItem,
  useCartStore,
} from "@/store/cartStore";
import { isAuthenticated } from "@/utils/auth";
import { clearCartTimestamp } from "@/utils/cartStorage";
import { mapItemTypeToProductType } from "@/utils/itemTypeMapper";

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
  const serverItemIds = new Set(
    serverItems.map((i) => `${i.productType}-${i.productId}`),
  );

  const localOnlyItems = localItems.filter((item) => {
    if (item.itemType !== ItemType.COURSE) return false;
    const key = `${item.itemType}-${item.itemId}`;
    return !serverItemIds.has(key);
  });

  if (localOnlyItems.length > 0) {
    const addPromises = localOnlyItems.map((item) =>
      cartApi.addItem({
        productId: item.itemId,
        productType: mapItemTypeToProductType(item.itemType),
      }),
    );
    await Promise.allSettled(addPromises);
  }

  clearCart();
  clearCartTimestamp();
};

export const useGetCart = () => {
  const { data: user } = useGetMe();
  const localItems = useCartStore((state) => state.items);
  const isLoggedIn = !!user && isAuthenticated();

  return useQuery({
    queryKey: cartKeys.list(isLoggedIn),
    queryFn: async () => {
      if (!isAuthenticated()) {
        return useCartStore.getState().items;
      }
      const response = await cartApi.getCart();
      if (isApiSuccessResponse(response) && response.responseContent) {
        return response.responseContent.items.map(mapApiItemToCartItem);
      }
      throw new Error("Failed to fetch cart");
    },
    placeholderData: isLoggedIn ? undefined : localItems,
    enabled: true,
  });
};

export type AddCourseToCartInput = {
  itemType: ItemType.COURSE;
  courseId: string;
  courseName: string;
  price: number;
  date: string;
  totalTime: string;
  classType: string;
  imageUrl?: string;
  availableDates?: string[];
};

export type AddEbookToCartInput = {
  itemType: ItemType.EBOOK;
  ebookId: string;
  ebookName: string;
  price: number;
  imageUrl?: string;
  pageCount?: number;
};

export type AddBootcampToCartInput = {
  itemType: ItemType.BOOTCAMP;
  bootcampId: string;
  bootcampName: string;
  price: number;
  startDate?: string;
  duration?: string;
  imageUrl?: string;
  schedule?: string;
  features?: string[];
};

export type AddItemToCartInput =
  | AddCourseToCartInput
  | AddEbookToCartInput
  | AddBootcampToCartInput;

const getItemId = (item: AddItemToCartInput): string => {
  switch (item.itemType) {
    case ItemType.EBOOK:
      return item.ebookId;
    case ItemType.BOOTCAMP:
      return item.bootcampId;
    case ItemType.COURSE:
    default:
      return item.courseId;
  }
};
const getItemTypeName = (itemType: ItemType): string => {
  switch (itemType) {
    case ItemType.EBOOK:
      return "E-book";
    case ItemType.BOOTCAMP:
      return "Bootcamp";
    case ItemType.COURSE:
    default:
      return "คอร์ส";
  }
};

const createCartItem = (item: AddItemToCartInput): CartItem => {
  switch (item.itemType) {
    case ItemType.EBOOK:
      return {
        id: `ebook-${item.ebookId}`,
        itemType: ItemType.EBOOK,
        itemId: item.ebookId,
        name: item.ebookName,
        price: item.price,
        imageUrl: item.imageUrl,
        pageCount: item.pageCount,
      } as EbookCartItem;

    case ItemType.BOOTCAMP:
      return {
        id: `bootcamp-${item.bootcampId}`,
        itemType: ItemType.BOOTCAMP,
        itemId: item.bootcampId,
        name: item.bootcampName,
        price: item.price,
        startDate: item.startDate || "",
        duration: item.duration || "",
        imageUrl: item.imageUrl,
        schedule: item.schedule,
        features: item.features,
      } as BootcampCartItem;

    case ItemType.COURSE:
    default:
      return {
        id: `course-${item.courseId}`,
        itemType: ItemType.COURSE,
        itemId: item.courseId,
        name: item.courseName,
        price: item.price,
        date: item.date,
        totalTime: item.totalTime,
        classType: item.classType,
        imageUrl: item.imageUrl,
        availableDates: item.availableDates,
      } as CourseCartItem;
  }
};

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  const addItemToStore = useCartStore((state) => state.addItem);
  const localItems = useCartStore((state) => state.items);

  return useMutation({
    mutationFn: async (item: AddItemToCartInput) => {
      const itemId = getItemId(item);
      const itemType = item.itemType;

      if (!isAuthenticated()) {
        const existsInLocalCart = localItems.some(
          (existingItem) =>
            existingItem.itemType === itemType &&
            existingItem.itemId === itemId,
        );
        if (existsInLocalCart) {
          throw new Error("ITEM_ALREADY_EXISTS");
        }

        const localItem = createCartItem(item);
        addItemToStore(localItem);
        return {
          id: itemId,
          itemId: itemId,
          message: "Added to local cart",
        };
      }

      const apiPayload: AddItemRequest = {
        productId: itemId,
        productType: mapItemTypeToProductType(itemType),
      };

      const response = await cartApi.addItem(apiPayload);
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
    onError: (error: Error, variables) => {
      if (error.message === "ITEM_ALREADY_EXISTS") {
        const typeName = getItemTypeName(variables.itemType);
        toast.warning(`${typeName}นี้มีอยู่ในตะกร้าแล้ว`);
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
