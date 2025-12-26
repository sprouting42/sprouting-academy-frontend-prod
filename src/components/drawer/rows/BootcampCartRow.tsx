"use client";

import { X } from "@phosphor-icons/react";
import { CalendarBlankIcon } from "@phosphor-icons/react/dist/csr/CalendarBlank";
import Image from "next/image";

import { useProductImage } from "@/hooks/useProductImage";
import type { BootcampCartItem } from "@/store/cartStore";

import { Badge } from "../../common/badge";
import { CheckboxInput } from "../../common/input";

interface BootcampCartRowProps {
  item: BootcampCartItem;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onRemove: (id: string) => void;
  isRemoving: boolean;
}

export const BootcampCartRow = ({
  item,
  checked,
  onCheckChange,
  onRemove,
  isRemoving,
}: BootcampCartRowProps) => {
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
                      🎓
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
                    text="BOOTCAMP"
                    variant="premium"
                    size="xs"
                    shape="rounded"
                    className="bg-badge-bootcamp-bg px-2! py-0.5! rounded-sm shrink-0 text-sm!"
                    textClassName="text-badge-bootcamp-text"
                  />
                </div>
                <p className="font-prompt mt-1 text-foreground/60 text-sm">
                  {item.duration}
                </p>
                {item.startDate && (
                  <div className="flex gap-1 items-center mt-1">
                    <CalendarBlankIcon
                      size={16}
                      weight="duotone"
                      className="text-foreground/60"
                    />
                    <span className="font-prompt text-foreground/60 text-sm">
                      Starts {item.startDate}
                    </span>
                  </div>
                )}
                {item.schedule && (
                  <>
                    <div className="border-foreground/20 border-t my-2" />
                    <p className="font-prompt text-foreground/50 text-sm">
                      Class Schedule
                      <br />
                      {item.schedule}
                    </p>
                  </>
                )}
                {/* Feature badges */}
                {item.features && item.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-badge-bootcamp-feature-bg border border-foreground/10 font-prompt px-2 py-0.5 rounded-full text-badge-bootcamp-feature-text text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
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
