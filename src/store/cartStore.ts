import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ItemType } from "@/enum/itemType";
import {
  checkCartExpiry,
  clearCartTimestamp,
  updateCartTimestamp,
} from "@/utils/cartStorage";

interface BaseCartItem {
  id: string;
  itemType: ItemType;
  itemId: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface CourseCartItem extends BaseCartItem {
  itemType: ItemType.COURSE;
  date: string;
  totalTime: string;
  classType: string;
  availableDates?: string[];
}

export interface EbookCartItem extends BaseCartItem {
  itemType: ItemType.EBOOK;
  pageCount?: number;
}

export interface BootcampCartItem extends BaseCartItem {
  itemType: ItemType.BOOTCAMP;
  startDate?: string;
  duration?: string;
  schedule?: string;
  features?: string[];
}

export type CartItem = CourseCartItem | EbookCartItem | BootcampCartItem;

interface CartState {
  items: CartItem[];
  _hasHydrated: boolean;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemDate: (id: string, newDate: string) => void;
  clearCart: () => void;
  setHasHydrated: (state: boolean) => void;
}

const TIMESTAMP_KEY = "cart-storage-timestamp";

const isBrowser = typeof window !== "undefined";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      _hasHydrated: false,

      addItem: (item) =>
        set((state) => {
          const itemExists = state.items.some(
            (existingItem) =>
              existingItem.itemType === item.itemType &&
              existingItem.itemId === item.itemId,
          );
          if (itemExists) {
            return state;
          }
          updateCartTimestamp();
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => {
          updateCartTimestamp();
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        }),

      updateItemDate: (id, newDate) =>
        set((state) => {
          updateCartTimestamp();
          return {
            items: state.items.map((item) => {
              if (item.id === id && item.itemType === ItemType.COURSE) {
                return { ...item, date: newDate } as CourseCartItem;
              }
              return item;
            }),
          };
        }),

      clearCart: () => {
        clearCartTimestamp();
        set({ items: [] });
      },

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),

      onRehydrateStorage: () => (state?: CartState) => {
        if (!isBrowser) return;

        const hasExpired = checkCartExpiry();
        if (hasExpired && state) {
          state.items = [];
        } else if (
          state &&
          state.items.length > 0 &&
          !localStorage.getItem(TIMESTAMP_KEY)
        ) {
          updateCartTimestamp();
        }

        useCartStore.getState().setHasHydrated(true);
      },
    },
  ),
);
