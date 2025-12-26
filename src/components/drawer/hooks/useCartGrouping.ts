import { useMemo } from "react";

import { ItemType } from "@/enum/itemType";
import type { CartItem } from "@/store/cartStore";

import { groupCartItemsByType } from "../utils/cartDrawerHelpers";

export const useCartGrouping = (cartItems: CartItem[]) => {
  const groupedItems = useMemo(
    () => groupCartItemsByType(cartItems),
    [cartItems],
  );

  const courses = useMemo(
    () => groupedItems[ItemType.COURSE] || [],
    [groupedItems],
  );

  const ebooks = useMemo(
    () => groupedItems[ItemType.EBOOK] || [],
    [groupedItems],
  );

  const bootcamps = useMemo(
    () => groupedItems[ItemType.BOOTCAMP] || [],
    [groupedItems],
  );

  return { courses, ebooks, bootcamps };
};
