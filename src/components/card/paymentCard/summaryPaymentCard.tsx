"use client";

import { ReactNode, useMemo } from "react";

import { Card } from "@/components/common/card";
import { Label } from "@/components/common/label";
import {
  formatPrice,
  PRODUCT_CONFIG,
  PRODUCT_TYPE_ORDER,
} from "@/constants/productConfig";
import { type ProductType } from "@/enum/itemType";
import { cn } from "@/utils/cn";

export type { ProductType } from "@/enum/itemType";

export interface SummaryItem {
  id: string;
  name: string;
  price: number;
  type: ProductType;
}

export interface SummaryPaymentCardProps {
  titleText?: string;
  titleIcon?: ReactNode;
  items: SummaryItem[];
  className?: string;
}

interface ProductSection {
  type: ProductType;
  label: string;
  icon: React.ReactNode;
  iconBgClass: string;
  items: SummaryItem[];
}

export const SummaryPaymentCard = ({
  titleText,
  titleIcon,
  items,
  className,
}: SummaryPaymentCardProps) => {
  const { sections, totalPrice } = useMemo(() => {
    const grouped: Record<ProductType, SummaryItem[]> = {
      course: [],
      ebook: [],
      bootcamp: [],
    };

    items.forEach((item) => {
      if (grouped[item.type]) {
        grouped[item.type].push(item);
      }
    });

    const productSections: ProductSection[] = PRODUCT_TYPE_ORDER.filter(
      (type) => grouped[type].length > 0,
    ).map((type) => {
      const config = PRODUCT_CONFIG[type];
      return {
        type,
        label: config.labelThai,
        icon: config.icon,
        iconBgClass: config.iconBgClass,
        items: grouped[type],
      };
    });

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return { sections: productSections, totalPrice: total };
  }, [items]);

  if (items.length === 0) {
    return (
      <div className={cn("flex flex-col gap-4 w-full", className)}>
        <Label text={titleText || ""} icon={titleIcon} />
        <Card
          variant="gradientDarkToLight"
          contentClassName="flex flex-col gap-4 h-full p-6 rounded-2xl text-base bg-background"
          cardContent={
            <p className="text-center text-foreground/50">ไม่มีรายการสินค้า</p>
          }
        />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <Label text={titleText || ""} icon={titleIcon} />

      <Card
        variant="gradientLightToForeground"
        contentClassName="flex flex-col justify-center items-start gap-5 h-full p-6 rounded-2xl text-base bg-background-light"
        cardContent={
          <>
            <div className="flex flex-col gap-5 w-full" role="list">
              {sections.map((section) => (
                <div key={section.type} className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-md",
                        section.iconBgClass,
                      )}
                    >
                      {section.icon}
                    </div>
                    <span className="font-medium font-prompt text-foreground text-sm">
                      {section.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 pl-8">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={`${section.type}-${item.id || `item-${itemIndex}`}-${itemIndex}`}
                        role="listitem"
                        className="flex items-center justify-between w-full"
                      >
                        <span className="font-prompt line-clamp-2 pr-4 text-foreground text-sm">
                          {item.name}
                        </span>
                        <span className="font-prompt text-foreground text-sm whitespace-nowrap">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-foreground/20 h-px w-full" />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between w-full">
              <span className="font-prompt font-semibold text-2xl text-secondary">
                ราคารวม:
              </span>
              <span className="font-prompt font-semibold text-2xl text-secondary">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </>
        }
      />
    </div>
  );
};
