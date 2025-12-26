import { PRODUCT_CONFIG } from "@/constants/productConfig";
import { ItemType } from "@/enum/itemType";
import type {
  BootcampCartItem,
  CartItem,
  CourseCartItem,
  EbookCartItem,
} from "@/store/cartStore";

import { SectionHeader } from "../cartDrawerContent";
import { BootcampCartRow } from "../rows/BootcampCartRow";
import { CourseCartRow } from "../rows/CourseCartRow";
import { EbookCartRow } from "../rows/EbookCartRow";

interface CartItemSectionProps {
  type: ItemType;
  items: CartItem[];
  checkedItems: Record<string, boolean>;
  onCheckChange: (itemId: string, checked: boolean) => void;
  onRemove: (id: string) => void;
  onDateChange?: (id: string, date: string) => void;
  isRemoving: boolean;
  showDateError?: boolean;
}

export const CartItemSection = ({
  type,
  items,
  checkedItems,
  onCheckChange,
  onRemove,
  onDateChange,
  isRemoving,
  showDateError,
}: CartItemSectionProps) => {
  if (items.length === 0) return null;

  const config =
    type === ItemType.COURSE
      ? PRODUCT_CONFIG.course
      : type === ItemType.EBOOK
        ? PRODUCT_CONFIG.ebook
        : PRODUCT_CONFIG.bootcamp;

  return (
    <section>
      <SectionHeader
        icon={config.iconLarge}
        title={config.labelThai}
        count={items.length}
      />
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          if (type === ItemType.COURSE) {
            return (
              <CourseCartRow
                key={item.id}
                item={item as CourseCartItem}
                checked={checkedItems[item.id] || false}
                onCheckChange={(checked) => onCheckChange(item.id, checked)}
                onRemove={onRemove}
                onDateChange={onDateChange!}
                isRemoving={isRemoving}
                showDateError={showDateError || false}
              />
            );
          }
          if (type === ItemType.EBOOK) {
            return (
              <EbookCartRow
                key={item.id}
                item={item as EbookCartItem}
                checked={checkedItems[item.id] || false}
                onCheckChange={(checked) => onCheckChange(item.id, checked)}
                onRemove={onRemove}
                isRemoving={isRemoving}
              />
            );
          }
          return (
            <BootcampCartRow
              key={item.id}
              item={item as BootcampCartItem}
              checked={checkedItems[item.id] || false}
              onCheckChange={(checked) => onCheckChange(item.id, checked)}
              onRemove={onRemove}
              isRemoving={isRemoving}
            />
          );
        })}
      </div>
    </section>
  );
};
