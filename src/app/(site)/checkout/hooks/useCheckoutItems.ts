import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import type { CartItem } from "@/store/cartStore";

export const useCheckoutItems = (cartItems: CartItem[]) => {
  const searchParams = useSearchParams();

  const selectedItemIds = useMemo(() => {
    const itemsParam = searchParams.get("items");
    if (!itemsParam) return null;
    return new Set(itemsParam.split(","));
  }, [searchParams]);

  const selectedCartItems = useMemo(() => {
    if (!selectedItemIds) {
      return cartItems;
    }
    return cartItems.filter((item) => selectedItemIds.has(item.id));
  }, [cartItems, selectedItemIds]);

  return {
    selectedCartItems,
    hasSelection: !!selectedItemIds,
  };
};
