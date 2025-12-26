"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";

import { useProductImage } from "@/hooks/useProductImage";
import type { EbookCartItem } from "@/store/cartStore";

import { Badge } from "../../common/badge";
import { CheckboxInput } from "../../common/input";

interface EbookCartRowProps {
  item: EbookCartItem;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onRemove: (id: string) => void;
  isRemoving: boolean;
}

export const EbookCartRow = ({
  item,
  checked,
  onCheckChange,
  onRemove,
  isRemoving,
}: EbookCartRowProps) => {
  const { imageUrl } = useProductImage(item.itemId, item.itemType);

  return (
    <div className="bg-cart-background border border-foreground/10 p-4 rounded-xl">
      <div className="flex gap-3 items-start">
        <CheckboxInput
          checked={checked}
          onChange={onCheckChange}
          checkboxClassName="shrink-0 mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex gap-3 items-start justify-between">
            <div className="flex flex-1 gap-3 min-w-0">
              {/* Product Image */}
              <div className="bg-foreground/10 h-20 overflow-hidden relative rounded-lg shrink-0 w-28">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-full"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-prompt text-foreground/30 text-sm">
                      📚
                    </span>
                  </div>
                )}
              </div>
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 items-start">
                  <h3 className="font-medium font-prompt line-clamp-2 text-foreground text-xl">
                    {item.name}
                  </h3>
                  <Badge
                    text="EBOOK"
                    variant="secondary"
                    size="xs"
                    shape="rounded"
                    className="bg-badge-ebook-bg px-2! py-0.5! rounded-sm shrink-0 text-sm!"
                    textClassName="text-badge-ebook-text"
                  />
                </div>
                <p className="font-prompt mt-1 text-foreground/60 text-sm">
                  {item.pageCount || 342} pages • Instant digital download •
                  Access on all devices
                </p>
              </div>
            </div>
            {/* Price & Remove */}
            <div className="flex gap-2 items-center shrink-0">
              <span className="font-prompt font-semibold text-foreground">
                {item.price.toLocaleString()} บาท
              </span>
              <button
                onClick={() => onRemove(item.id)}
                disabled={isRemoving}
                className="hover:text-error p-1 text-foreground/40 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
