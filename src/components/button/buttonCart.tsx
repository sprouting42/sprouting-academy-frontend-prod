import Image from "next/image";
import { useState } from "react";

import { Button } from "../common";
import { CartDrawer } from "../drawer/cartDrawer";

export const ButtonCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <Button
        variant="iconOnly"
        size="lg"
        shape="square"
        className="h-8 lg:h-12 lg:w-12 w-8"
        icon={
          <Image
            src="/icons/shopping.svg"
            alt="Shopping cart"
            width={48}
            height={48}
            className="h-8 lg:h-12 lg:w-12 object-contain w-8"
          />
        }
        aria-label="Shopping cart"
        onClick={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        className="h-full md:p-8 md:w-175 p-4 sm:p-6 sm:w-150 w-full xl:w-238.25"
      />
    </>
  );
};
