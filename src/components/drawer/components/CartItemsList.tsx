import { ItemType } from "@/enum/itemType";
import type { CartItem } from "@/store/cartStore";

import { CartItemSection } from "./CartItemSection";

interface CartItemsListProps {
  courses: CartItem[];
  ebooks: CartItem[];
  bootcamps: CartItem[];
  checkedItems: Record<string, boolean>;
  onCheckChange: (itemId: string, checked: boolean) => void;
  onRemove: (id: string) => void;
  onDateChange: (id: string, date: string) => void;
  isRemoving: boolean;
  showDateError: boolean;
}

export const CartItemsList = ({
  courses,
  ebooks,
  bootcamps,
  checkedItems,
  onCheckChange,
  onRemove,
  onDateChange,
  isRemoving,
  showDateError,
}: CartItemsListProps) => {
  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto pb-4">
      <CartItemSection
        type={ItemType.COURSE}
        items={courses}
        checkedItems={checkedItems}
        onCheckChange={onCheckChange}
        onRemove={onRemove}
        onDateChange={onDateChange}
        isRemoving={isRemoving}
        showDateError={showDateError}
      />
      <CartItemSection
        type={ItemType.EBOOK}
        items={ebooks}
        checkedItems={checkedItems}
        onCheckChange={onCheckChange}
        onRemove={onRemove}
        isRemoving={isRemoving}
      />
      <CartItemSection
        type={ItemType.BOOTCAMP}
        items={bootcamps}
        checkedItems={checkedItems}
        onCheckChange={onCheckChange}
        onRemove={onRemove}
        isRemoving={isRemoving}
      />
    </div>
  );
};
