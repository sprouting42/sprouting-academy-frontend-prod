export const CART_DRAWER_MESSAGES = {
  TITLE: "ตะกร้า",
  EMPTY_CART: "ตะกร้าว่างเปล่า",
  ITEMS_IN_CART: "items in cart",
  SELECTED_FOR_CHECKOUT: "selected for checkout",
  PRICE_BEFORE_DISCOUNT: "ราคาสินค้ารวม (ก่อนส่วนลด)",
  COURSE_PACKAGE_DISCOUNT: "ส่วนลดแพ็กเกจคอร์ส",
  COUPON_DISCOUNT: "ส่วนลดคูปอง",
  FINAL_TOTAL: "ยอดรวมสุทธิที่ต้องชำระ",
  VIEW_ALL_COURSES: "ดูรายละเอียดคอร์สทั้งหมด",
  CHECKOUT: "ชำระเงิน",
  COUPON_LABEL: "คูปองส่วนลด",
  COUPON_PLACEHOLDER: "Enter code",
  APPLY: "Apply",
  DISCOUNT_SUGGESTION_10: "🗸 สุดคุ้ม! เพิ่มอีก 1 คอร์ส รับส่วนลด 600 บาท",
  DISCOUNT_SUGGESTION_20: "🗸 ดีลที่ดีที่สุด! ส่วนลด 3 คอร์ส ถูกใช้แล้ว 600 บาท",
  DISCOUNT_SUGGESTION_0: "🗸 เพิ่มอีก 1 คอร์ส เพื่อรับส่วนลด 200 บาท",
} as const;

export const COUPON_CODES: Record<string, number> = {
  TEST100: 100,
  TEST500: 500,
  TEST1000: 1000,
};

export const DISCOUNT_RULES = {
  THREE_COURSES: { threshold: 3, amount: 600 },
  TWO_COURSES: { threshold: 2, amount: 200 },
} as const;

export const DATE_SELECTOR_MESSAGES = {
  LABEL: "Select Registration Date (Require)",
  PLACEHOLDER: "Choose a start date",
  ERROR: "Please select a date to proceed with checkout",
} as const;
