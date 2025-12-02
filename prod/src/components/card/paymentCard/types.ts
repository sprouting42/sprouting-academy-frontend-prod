import { ReactNode } from "react";

import type { UserInfo } from "@/components/card/userInfoCard";

type MutableRef<T> = {
  current: T;
};

export interface CourseItem {
  course: string;
  startDate: string;
  price?: string;
}

export interface BankInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface PromptPaymentInfo {
  qrImage: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface PaymentMethodLabels {
  directTransfer: string;
  card: string;
  promptPay: string;
}

export interface CourseSummaryProps {
  titleText: string;
  titleIcon?: ReactNode;
  courses: CourseItem[];
  price: string;
}

export interface DirectPaymentProps {
  directPayment: BankInfo;
  notationText: string;
  notationClassName: string;
  orderId: string;
  onPaymentSuccess?: (paymentId: string) => void;
  onPaymentError?: (error: string) => void;
  onSubmitRef?: MutableRef<(() => void) | null>;
}

export interface CardPaymentProps {
  orderId: string;
  onPaymentSuccess?: (chargeId: string) => void;
  onPaymentError?: (error: string) => void;
  onSubmitRef?: MutableRef<(() => void) | null>;
}

export interface PromptPaymentProps {
  promptPayment: PromptPaymentInfo;
  notationText: string;
  notationClassName: string;
  orderId?: string;
  // TODO: [PROMPTPAY-001] Enable when backend API is ready
  onPaymentSuccess?: (paymentId: string) => void;
  onPaymentError?: (error: string) => void;
  onSubmitRef?: MutableRef<(() => void) | null>;
}

export interface DiscountPartProps {
  value: string;
  onChange: (value: string) => void;
  onApply?: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  discountTitleText?: string;
}

export interface NotationProps {
  notationText: string;
  notationClassName: string;
}

export interface PaymentCardProps {
  cardTitle: string;
  dropdownOptions: string[];
  titleText: string;
  titleIcon: ReactNode;
  courses: CourseItem[];
  price: string;
  directPayment: BankInfo;
  // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
  promptPayment?: PromptPaymentInfo;
  notationText: string;
  notationClassName: string;
  paymentMethodLabels: PaymentMethodLabels;
  discountTitleText?: string;
  discountPlaceholder?: string;
  discountButtonText?: string;
  onApplyDiscount?: (code: string) => void;
  orderId: string;
  userInfo?: UserInfo;
  onPaymentSuccess?: (
    paymentId: string,
    paymentType: "card" | "bank-transfer" | "promptpay",
  ) => void;
  onPaymentError?: (error: string) => void;
}
