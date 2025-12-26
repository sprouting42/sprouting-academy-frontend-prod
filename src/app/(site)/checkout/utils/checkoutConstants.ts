export const CHECKOUT_MESSAGES = {
  LOADING: "กำลังโหลดข้อมูล...",
  EMPTY_CART: "ไม่มีสินค้าที่เลือกสำหรับชำระเงิน",
  CART_ERROR: "ไม่สามารถโหลดข้อมูลตะกร้าได้",
  ORDER_ERROR: "ไม่สามารถสร้างออเดอร์ได้",
  NO_ITEMS_SELECTED: "No items selected for checkout",
  PAYMENT_SUCCESS: "ส่งสลิปการโอนเรียบร้อยแล้ว กรุณารอการตรวจสอบ",
} as const;

export const PAYMENT_METHODS = {
  BANK_TRANSFER: "โอนเงินผ่านธนาคาร",
  CARD: "บัตรเครดิต/เดบิต",
  PROMPTPAY: "PromptPay",
  UNKNOWN: "ไม่ระบุ",
} as const;

export const CHECKOUT_HEADER = {
  TITLE: "สมัครเรียน AI Automation",
  SUBTITLE: "กรอกข้อมูลและชำระเงินเพื่อเริ่มต้นการเรียนรู้",
  BADGE_TEXT: "ปลอดภัย 100% การันตีความเป็นส่วนตัว",
} as const;

export const PAYMENT_NOTATION = {
  TEXT: "หมายเหตุ: หลังจากโอนเงินแล้ว กรุณาแนบสลิปการโอนและกรอกข้อมูลให้ครบถ้วน ทีมงานจะตรวจสอบและติดต่อกลับภายใน 24 ชั่วโมง",
} as const;
