import type { CreateOrderRequest } from "@/apis/order";
import type { ProductType } from "@/enum/itemType";
import type { CartItem } from "@/store/cartStore";

import { PAYMENT_METHODS } from "./checkoutConstants";

export const buildOrderPayload = (items: CartItem[]): CreateOrderRequest => {
  return {
    items: items.filter(validateCartItem).map((item) => ({
      productId: item.itemId,
      productType: item.itemType as ProductType,
    })),
    // TODO: เพิ่ม couponId เมื่อ coupon system พร้อม
    // couponId: appliedCouponId,
  };
};

export const validateCartItem = (item: CartItem): boolean => {
  if (!item.itemId || item.itemId.trim() === "") {
    console.error("[Checkout] Invalid itemId:", item, "Skipping this item");
    return false;
  }
  return true;
};

export const formatPaymentTypeLabel = (
  type: "card" | "bank-transfer" | "promptpay",
): string => {
  switch (type) {
    case "card":
      return PAYMENT_METHODS.CARD;
    case "bank-transfer":
      return PAYMENT_METHODS.BANK_TRANSFER;
    case "promptpay":
      return PAYMENT_METHODS.PROMPTPAY;
    default:
      return PAYMENT_METHODS.UNKNOWN;
  }
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price || 0), 0);
};

export const formatPrice = (amount: number): string => {
  return `${amount.toLocaleString("th-TH")} บาท`;
};

export const formatItemName = (
  itemNames: string[],
  itemCount: number,
): string => {
  if (itemCount === 0) return "สินค้า";
  if (itemCount === 1) return itemNames[0] || "สินค้า";
  const firstItemName = itemNames[0] || "สินค้า";
  return `${firstItemName} และอีก ${itemCount - 1} รายการ`;
};
