"use client";

import { useEffect, useMemo, useState } from "react";

import type { UserInfo } from "@/components/card";
import type { ProductType } from "@/enum/itemType";
import { useGetMe } from "@/hooks/useAuth";
import { useGetCart } from "@/hooks/useCart";

import { CheckoutContent } from "./components/CheckoutContent";
import { CheckoutHeader } from "./components/CheckoutHeader";
import { EmptyState } from "./components/EmptyState";
import { LoadingState } from "./components/LoadingState";
import { PaymentConfirmModal } from "./components/PaymentConfirmModal";
import { useAutoCreateOrder } from "./hooks/useAutoCreateOrder";
import { useCheckoutItems } from "./hooks/useCheckoutItems";
import { useOrderCleanup } from "./hooks/useOrderCleanup";
import { useOrderCreation } from "./hooks/useOrderCreation";
import { useOrderData } from "./hooks/useOrderData";
import { usePaymentHandling } from "./hooks/usePaymentHandling";
import { calculateTotalPrice, formatPrice } from "./utils/checkoutHelpers";

const CheckoutPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Ensure consistent render between server and client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch user and cart data
  const { data: user, isLoading: isUserLoading } = useGetMe();
  const {
    data: cartItems = [],
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCart();

  // Get selected items from URL
  const { selectedCartItems } = useCheckoutItems(cartItems);

  // Order creation
  const { mutation: createOrderMutation, orderCreationAttempted } =
    useOrderCreation(selectedCartItems, setOrderId);

  // Fetch order data
  const { data: orderData } = useOrderData(orderId);

  // Payment handling
  const {
    paymentSuccessData,
    isModalOpen,
    setIsModalOpen,
    handlePaymentSuccess,
    handlePaymentError,
    isPaymentCompleted,
  } = usePaymentHandling(orderId, selectedCartItems, orderData, user?.fullName);

  // Order cleanup on unmount
  useOrderCleanup(orderId, isPaymentCompleted);

  // Auto-create order when cart is ready
  useAutoCreateOrder({
    isCartLoading,
    selectedCartItems,
    orderId,
    createOrderMutation,
    cartError,
    orderCreationAttempted,
  });

  // Summary items for display
  const summaryItems = useMemo(() => {
    if (!selectedCartItems || selectedCartItems.length === 0) {
      return [];
    }
    return selectedCartItems.map((item, index) => ({
      id: item.itemId || `item-${index}`,
      name: item.name || "สินค้า",
      price: item.price || 0,
      type: item.itemType as ProductType,
    }));
  }, [selectedCartItems]);

  // Formatted price
  const formattedPrice = useMemo(() => {
    if (orderData && orderData.totalAmount !== undefined) {
      return formatPrice(orderData.totalAmount);
    }
    if (selectedCartItems && selectedCartItems.length > 0) {
      const total = calculateTotalPrice(selectedCartItems);
      return formatPrice(total);
    }
    return formatPrice(0);
  }, [orderData, selectedCartItems]);

  // Loading state
  const isLoading = !isMounted || isCartLoading || isUserLoading;

  if (isLoading) {
    return <LoadingState />;
  }

  if (
    !isCartLoading &&
    (!selectedCartItems || selectedCartItems.length === 0)
  ) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <CheckoutHeader />
      <CheckoutContent
        user={
          user
            ? {
                fullName: user.fullName,
                phone: user.phone ?? undefined,
                email: user.email,
              }
            : undefined
        }
        userInfo={userInfo}
        onUserInfoChange={setUserInfo}
        summaryItems={summaryItems}
        formattedPrice={formattedPrice}
        orderId={orderId}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        isLoading={isLoading}
      />
      <PaymentConfirmModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        data={paymentSuccessData}
      />
    </div>
  );
};

export default CheckoutPage;
