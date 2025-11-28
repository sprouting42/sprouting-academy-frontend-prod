import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  courseName: string;
  price: string;
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

const CART_EXPIRY_MINUTES = 60 * 24;
const TIMESTAMP_KEY = "cart-storage-timestamp";

const isBrowser = typeof window !== "undefined";

const checkCartExpiry = (): boolean => {
  if (!isBrowser) return false;

  const lastUpdated = localStorage.getItem(TIMESTAMP_KEY);
  if (lastUpdated) {
    const expiryTime = parseInt(lastUpdated) + CART_EXPIRY_MINUTES * 60 * 1000;
    if (Date.now() > expiryTime) {
      localStorage.removeItem("cart-storage");
      localStorage.removeItem(TIMESTAMP_KEY);
      return true;
    }
  }
  return false;
};

const updateCartTimestamp = (): void => {
  if (isBrowser) {
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const itemExists = state.items.some(
            (existingItem) => existingItem.id === item.id,
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
        if (isBrowser) {
          localStorage.removeItem(TIMESTAMP_KEY);
        }
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",

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
