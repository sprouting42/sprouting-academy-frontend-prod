import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { ItemType } from "@/enum/itemType";
import { resolveProductImageUrl } from "@/utils/productImageResolver";

/**
 * Hook to resolve product image URL from productId and productType
 * Uses cached data from React Query for better performance
 */
export function useProductImage(
  productId: string | undefined,
  productType: ItemType | undefined,
) {
  const queryKey = useMemo(
    () => ["productImage", productId, productType],
    [productId, productType],
  );

  const { data: imageUrl, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!productId || !productType) {
        return undefined;
      }
      return resolveProductImageUrl(productId, productType);
    },
    enabled: !!productId && !!productType,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  return { imageUrl, isLoading };
}
