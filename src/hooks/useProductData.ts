import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { ItemType } from "@/enum/itemType";
import { resolveProductData } from "@/utils/productDataResolver";

/**
 * Hook to resolve product data from productId and productType
 * Uses cached data from React Query for better performance
 */
export function useProductData(
  productId: string | undefined,
  productType: ItemType | undefined,
) {
  const queryKey = useMemo(
    () => ["productData", productId, productType],
    [productId, productType],
  );

  const { data: productData, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!productId || !productType) {
        return null;
      }
      return resolveProductData(productId, productType);
    },
    enabled: !!productId && !!productType,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  return { productData, isLoading };
}
