import { ShoppingCartIcon } from "@phosphor-icons/react/dist/csr/ShoppingCart";

import { CART_DRAWER_MESSAGES } from "../utils/cartDrawerConstants";

export const CartHeader = () => {
  return (
    <div className="flex gap-3 items-center pb-4">
      <ShoppingCartIcon size={48} weight="duotone" className="text-secondary" />
      <h1 className="font-bold font-prompt text-secondary text-xl">
        {CART_DRAWER_MESSAGES.TITLE}
      </h1>
    </div>
  );
};
