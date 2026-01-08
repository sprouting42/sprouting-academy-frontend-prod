import { ItemType } from "@/enum/itemType";
import type { CartItem } from "@/store/cartStore";

export const groupCartItemsByType = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => {
      const type = item.itemType;
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    },
    {} as Record<ItemType, CartItem[]>,
  );
};

export const formatPrice = (amount: number): string => {
  return amount.toLocaleString();
};

export const getSelectedItemIds = (
  checkedItems: Record<string, boolean>,
): string[] => {
  return Object.entries(checkedItems)
    .filter(([, checked]) => checked)
    .map(([itemId]) => itemId);
};
