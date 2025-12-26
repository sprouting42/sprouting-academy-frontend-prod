import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaPenClip } from "react-icons/fa6";

import type { UserInfo } from "@/components/card";
import { UserInfoCard } from "@/components/card";
import { PaymentCard } from "@/components/card/paymentCard/paymentCard";
import { BANK_INFO } from "@/constants/payment";
import type { ProductType } from "@/enum/itemType";

import { PAYMENT_METHODS, PAYMENT_NOTATION } from "../utils/checkoutConstants";

interface CheckoutContentProps {
  user:
    | {
        fullName?: string;
        phone?: string;
        email?: string;
      }
    | undefined;
  userInfo: UserInfo | null;
  onUserInfoChange: (info: UserInfo | null) => void;
  summaryItems: Array<{
    id: string;
    name: string;
    price: number;
    type: ProductType;
  }>;
  formattedPrice: string;
  orderId: string | null;
  onPaymentSuccess: (
    paymentId: string,
    paymentType: "card" | "bank-transfer" | "promptpay",
  ) => void;
  onPaymentError: (error: string) => void;
  isLoading: boolean;
}

export const CheckoutContent = ({
  user,
  userInfo,
  onUserInfoChange,
  summaryItems,
  formattedPrice,
  orderId,
  onPaymentSuccess,
  onPaymentError,
  isLoading,
}: CheckoutContentProps) => {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true });

  return (
    <motion.div
      ref={cardsRef}
      initial="hidden"
      animate={
        !isLoading && summaryItems && summaryItems.length > 0
          ? "visible"
          : cardsInView
            ? "visible"
            : "hidden"
      }
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      className="flex flex-col gap-12 items-center justify-center lg:flex-row lg:gap-8 lg:items-start lg:px-28 px-4 w-full"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        }}
        className="max-w-148 w-full"
      >
        <UserInfoCard
          initialValues={{
            fullName: user?.fullName,
            phone: user?.phone,
            email: user?.email,
          }}
          onInfoChange={onUserInfoChange}
        />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
        }}
        className="max-w-148 w-full"
      >
        <PaymentCard
          cardTitle="ชำระเงิน"
          dropdownOptions={[
            PAYMENT_METHODS.BANK_TRANSFER,
            // TODO: [OMISE-001] Enable credit card payment when backend API is ready
            // PAYMENT_METHODS.CARD,
            // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
            // PAYMENT_METHODS.PROMPTPAY,
          ]}
          titleText="สรุปคำสั่งซื้อ"
          titleIcon={<FaPenClip />}
          summaryItems={summaryItems}
          price={formattedPrice}
          directPayment={BANK_INFO.directTransfer}
          promptPayment={BANK_INFO.promptPay}
          notationText={PAYMENT_NOTATION.TEXT}
          notationClassName="text-secondary text-sm"
          paymentMethodLabels={{
            directTransfer: PAYMENT_METHODS.BANK_TRANSFER,
            // TODO: [OMISE-001] Enable credit card payment when backend API is ready
            card: PAYMENT_METHODS.CARD,
            // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
            promptPay: PAYMENT_METHODS.PROMPTPAY,
          }}
          // TODO: [DISCOUNT-001] Enable discount feature when API is ready
          // discountTitleText="รหัสส่วนลด"
          // discountPlaceholder="กรอกโค้ดส่วนลด"
          // discountButtonText="ใช้งาน"
          // onApplyDiscount={handleApplyDiscount}
          orderId={orderId || ""}
          userInfo={userInfo || undefined}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
        />
      </motion.div>
    </motion.div>
  );
};
