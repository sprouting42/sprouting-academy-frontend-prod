"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { cartKeys, useGetCart, useRemoveItemFromCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cartStore";

import { Drawer } from "../common/drawer";
import { CartActions } from "./components/CartActions";
import { CartEmptyState } from "./components/CartEmptyState";
import { CartHeader } from "./components/CartHeader";
import { CartItemCount } from "./components/CartItemCount";
import { CartItemsList } from "./components/CartItemsList";
import { CartSummary } from "./components/CartSummary";
import { useCartCheckout } from "./hooks/useCartCheckout";
import { useCartGrouping } from "./hooks/useCartGrouping";
import {
  useCartPricing,
  useCourseDateValidation,
} from "./hooks/useCartPricing";
import { useCartSelection } from "./hooks/useCartSelection";
import { useCoupon } from "./hooks/useCoupon";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CartDrawer = ({ isOpen, onClose, className }: CartDrawerProps) => {
  const queryClient = useQueryClient();
  const [showDateErrors, setShowDateErrors] = useState(false);

  const { data: cartData = [] } = useGetCart();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveItemFromCart();
  const updateItemDate = useCartStore((state) => state.updateItemDate);

  const { checkedItems, handleCheckChange, clearSelection, getSelectedCount } =
    useCartSelection();
  const { courses, ebooks, bootcamps } = useCartGrouping(cartData);
  const {
    couponCode,
    couponDiscount,
    setCouponCode,
    applyCoupon,
    clearCoupon,
  } = useCoupon();
  const { totalPrice, discountPercent, discountAmount, finalPrice } =
    useCartPricing(cartData, checkedItems, courses, couponDiscount);
  const { hasInvalidCourseDate } = useCourseDateValidation(
    courses,
    checkedItems,
  );
  const { handleCheckout } = useCartCheckout(
    checkedItems,
    hasInvalidCourseDate,
    onClose,
    setShowDateErrors,
  );

  const handleDateChange = (itemId: string, newDate: string) => {
    updateItemDate(itemId, newDate);
    queryClient.invalidateQueries({ queryKey: cartKeys.all });
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };

  const handleClose = () => {
    clearSelection();
    clearCoupon();
    setShowDateErrors(false);
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      className={className}
      content={
        <div className="box-border flex flex-col h-full overflow-x-hidden overflow-y-auto">
          <CartHeader />
          <CartItemCount
            totalItems={cartData.length}
            selectedItems={getSelectedCount()}
          />

          <CartItemsList
            courses={courses}
            ebooks={ebooks}
            bootcamps={bootcamps}
            checkedItems={checkedItems}
            onCheckChange={handleCheckChange}
            onRemove={removeItem}
            onDateChange={handleDateChange}
            isRemoving={isRemoving}
            showDateError={showDateErrors}
          />

          {cartData.length === 0 && <CartEmptyState />}

          {cartData.length > 0 && (
            <CartSummary
              totalPrice={totalPrice}
              discountPercent={discountPercent}
              discountAmount={discountAmount}
              couponDiscount={couponDiscount}
              courses={courses}
              checkedItems={checkedItems}
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              finalPrice={finalPrice}
            />
          )}

          <CartActions
            onCheckout={handleCheckout}
            disabled={getSelectedCount() === 0}
          />
        </div>
      }
    />
  );
};
