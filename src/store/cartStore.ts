import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  checkCartExpiry,
  clearCartTimestamp,
  updateCartTimestamp,
} from "@/utils/cartStorage";

export interface CartItem {
  id: string;
  courseId: string;
  courseName: string;
  price: number;
  date: string;
  totalTime: string;
  classType: string;
}

interface CartState {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const TIMESTAMP_KEY = "cart-storage-timestamp";

const isBrowser = typeof window !== "undefined";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const itemExists = state.items.some(
            (existingItem) => existingItem.courseId === item.courseId,
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

      clearCart: () => {
        clearCartTimestamp();
        set({ items: [] });
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
          !hasExpired &&
          !localStorage.getItem(TIMESTAMP_KEY) &&
          state &&
          state.items.length > 0
        ) {
          updateCartTimestamp();
        }
      },
    },
  ),
);
