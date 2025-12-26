import { useRouter } from "next/navigation";

import { PagePath } from "@/enum/menu";
import { isAuthenticated } from "@/utils/auth";

import { getSelectedItemIds } from "../utils/cartDrawerHelpers";

export const useCartCheckout = (
  checkedItems: Record<string, boolean>,
  hasInvalidCourseDate: boolean,
  onClose: () => void,
  setShowDateErrors: (show: boolean) => void,
) => {
  const router = useRouter();

  const handleCheckout = () => {
    if (hasInvalidCourseDate) {
      setShowDateErrors(true);
      return;
    }

    const selectedItemIds = getSelectedItemIds(checkedItems);

    if (selectedItemIds.length === 0) {
      return;
    }

    const selectedItemsParam = selectedItemIds.join(",");
    const checkoutUrl = `${PagePath.CHECKOUT}?items=${encodeURIComponent(selectedItemsParam)}`;

    if (isAuthenticated()) {
      router.push(checkoutUrl);
      onClose();
    } else {
      router.push(
        `${PagePath.LOGIN}?redirect=${encodeURIComponent(checkoutUrl)}`,
      );
      onClose();
    }
  };

  return { handleCheckout };
};
