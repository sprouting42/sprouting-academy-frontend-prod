"use client";

import { useCallback, useRef, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { toast } from "sonner";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Label } from "@/components/common/label";
import { Dropdown } from "@/components/dropdown/dropdown";
import { isValidEmail } from "@/utils/validation";

// TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
// import { PropmtPayment } from "./promtPayment";
import { CardPayment } from "./cardPayment";
import { CourseSummary } from "./courseSummary";
import { DirectPayment } from "./directPayment";
import { PaymentCardProps } from "./types";

export const PaymentCard = ({
  cardTitle,
  titleText,
  titleIcon,
  dropdownOptions,
  courses,
  price,
  directPayment,
  // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
  notationText,
  notationClassName,
  paymentMethodLabels,
  orderId,
  userInfo,
  onPaymentSuccess,
  onPaymentError,
}: PaymentCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const cardPaymentSubmitRef = useRef<(() => void) | null>(null);
  const directPaymentSubmitRef = useRef<(() => void) | null>(null);
  // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
  // const promptPaySubmitRef = useRef<(() => void) | null>(null);

  const handlePaymentSuccess = useCallback(
    (
      paymentId: string,
      paymentType: "card" | "bank-transfer" | "promptpay",
    ) => {
      onPaymentSuccess?.(paymentId, paymentType);
    },
    [onPaymentSuccess],
  );

  const handlePaymentError = useCallback(
    (error: string) => {
      onPaymentError?.(error);
    },
    [onPaymentError],
  );

  const validateUserInfo = useCallback((): boolean => {
    if (!userInfo) {
      toast.error("กรุณากรอกข้อมูลผู้สมัครให้ครบถ้วน");
      return false;
    }

    if (!userInfo.fullName?.trim()) {
      toast.error("กรุณากรอกชื่อ-นามสกุล");
      return false;
    }

    if (!userInfo.phone?.trim()) {
      toast.error("กรุณากรอกเบอร์โทรศัพท์");
      return false;
    }

    const phoneRegex = /^[0-9]{9,10}$/;
    const phoneDigits = userInfo.phone.replace(/\D/g, "");
    if (!phoneRegex.test(phoneDigits)) {
      toast.error("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)");
      return false;
    }

    if (!userInfo.email?.trim()) {
      toast.error("กรุณากรอกอีเมล");
      return false;
    }

    if (!isValidEmail(userInfo.email)) {
      toast.error("กรุณากรอกอีเมลให้ถูกต้อง");
      return false;
    }

    return true;
  }, [userInfo]);

  const handleSubmit = useCallback(() => {
    if (!validateUserInfo()) {
      return;
    }

    if (
      selectedValue === paymentMethodLabels.card &&
      cardPaymentSubmitRef.current
    ) {
      cardPaymentSubmitRef.current();
    } else if (
      selectedValue === paymentMethodLabels.directTransfer &&
      directPaymentSubmitRef.current
    ) {
      directPaymentSubmitRef.current();
    }
    // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
    // else if (
    //   selectedValue === paymentMethodLabels.promptPay &&
    //   promptPaySubmitRef.current
    // ) {
    //   promptPaySubmitRef.current();
    // }
  }, [selectedValue, paymentMethodLabels, validateUserInfo]);

  const handleDropdownChange = useCallback((value: string) => {
    setSelectedValue(value);
  }, []);

  const handleDirectPaymentSuccess = useCallback(
    (paymentId: string) => handlePaymentSuccess(paymentId, "bank-transfer"),
    [handlePaymentSuccess],
  );

  const handleCardPaymentSuccess = useCallback(
    (chargeId: string) => handlePaymentSuccess(chargeId, "card"),
    [handlePaymentSuccess],
  );

  // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
  // Implementation needed:
  // - Uncomment handlePromptPaySuccess callback
  // - Uncomment PropmtPayment component rendering
  // - Uncomment promptPaySubmitRef
  // - Add "PromptPay" to dropdownOptions in checkout/page.tsx

  return (
    <Card
      variant="gradientDarkToLight"
      contentClassName="p-4 flex flex-col items-start bg-linear-to-t from-background to-background-light
      rounded-2xl gap-6"
      className="max-w-148 w-full"
      cardContent={
        <>
          <Label text={cardTitle} className="font-medium text-xl" />

          <CourseSummary
            titleText={titleText}
            titleIcon={titleIcon}
            courses={courses}
            price={price}
          />

          <div className="flex flex-col gap-1 items-start w-full">
            <Dropdown
              icon={<FaCreditCard />}
              title="วิธีการชำระเงิน"
              required={false}
              options={dropdownOptions}
              placeholder="เลือกช่องทางการชำระเงิน"
              value={selectedValue}
              onChange={handleDropdownChange}
              className="w-full"
              variant="primary"
            />
          </div>

          {selectedValue === paymentMethodLabels.directTransfer && (
            <DirectPayment
              directPayment={directPayment}
              notationText={notationText}
              notationClassName={notationClassName}
              orderId={orderId}
              onPaymentSuccess={handleDirectPaymentSuccess}
              onPaymentError={handlePaymentError}
              onSubmitRef={directPaymentSubmitRef}
            />
          )}
          {selectedValue === paymentMethodLabels.card && (
            <CardPayment
              orderId={orderId}
              onPaymentSuccess={handleCardPaymentSuccess}
              onPaymentError={handlePaymentError}
              onSubmitRef={cardPaymentSubmitRef}
            />
          )}
          {/* TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready */}
          {/* {selectedValue === paymentMethodLabels.promptPay && (
            <PropmtPayment
              promptPayment={promptPayment}
              notationText={notationText}
              notationClassName={notationClassName}
              orderId={orderId}
              onPaymentSuccess={handlePromptPaySuccess}
              onPaymentError={handlePaymentError}
              onSubmitRef={promptPaySubmitRef}
            />
          )} */}

          {selectedValue !== "" && (
            <div className="[&>div]:w-full w-full">
              <Button
                text="ยืนยันการชำระเงิน"
                variant="primaryGradientBorder"
                size="sm"
                shape="rounded"
                onClick={handleSubmit}
                disabled={
                  !userInfo?.fullName?.trim() ||
                  !userInfo?.phone?.trim() ||
                  !userInfo?.email?.trim()
                }
              />
            </div>
          )}
        </>
      }
    />
  );
};
