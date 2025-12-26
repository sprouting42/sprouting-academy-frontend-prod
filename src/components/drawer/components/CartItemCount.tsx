import { CART_DRAWER_MESSAGES } from "../utils/cartDrawerConstants";

interface CartItemCountProps {
  totalItems: number;
  selectedItems: number;
}

export const CartItemCount = ({
  totalItems,
  selectedItems,
}: CartItemCountProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="bg-foreground/5 border border-foreground/10 font-prompt max-w-78 mb-4 px-4 py-2 rounded-lg text-sm">
      <span className="text-foreground/80">
        {totalItems} {CART_DRAWER_MESSAGES.ITEMS_IN_CART}
      </span>
      <span className="font-semibold mx-2 text-foreground">
        {selectedItems}
      </span>
      <span className="text-foreground/80">
        {CART_DRAWER_MESSAGES.SELECTED_FOR_CHECKOUT}
      </span>
    </div>
  );
};
