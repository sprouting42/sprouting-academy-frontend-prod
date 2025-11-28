import { ReactNode } from "react";

export interface CourseItem {
  course: string;
  startDate: string;
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
}

export interface CardPaymentProps {
  notationText: string;
  notationClassName: string;
}

export interface PromptPaymentProps {
  promptPayment: PromptPaymentInfo;
  notationText: string;
  notationClassName: string;
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
  promptPayment: PromptPaymentInfo;
  notationText: string;
  notationClassName: string;
  paymentMethodLabels: PaymentMethodLabels;
  discountTitleText?: string;
  discountPlaceholder?: string;
  discountButtonText?: string;
  onApplyDiscount?: (code: string) => void;
}
