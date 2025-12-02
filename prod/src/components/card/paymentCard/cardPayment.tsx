"use client";

import { CalendarIcon } from "@phosphor-icons/react/dist/csr/Calendar";
import { useCallback, useEffect, useState } from "react";
import { CiCreditCard1, CiCreditCard2 } from "react-icons/ci";
import { toast } from "sonner";

import { isApiErrorResponse, isApiSuccessResponse } from "@/apis/auth";
import { paymentApi } from "@/apis/payment";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";

import { CardPaymentProps } from "./types";

export const CardPayment = ({
  orderId,
  onPaymentSuccess,
  onPaymentError,
  onSubmitRef,
}: CardPaymentProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // TODO: [OMISE-001] Implement Omise.js client-side tokenization when backend supports token parameter
  // Current: Sending raw card details to backend (server-side tokenization)
  // Future: Use Omise.js to create token in browser, send only token to backend

  const formatCardNumber = useCallback((value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }, []);

  const handleCardNumberChange = useCallback(
    (value: string) => {
      const formatted = formatCardNumber(value);
      setCardNumber(formatted);
    },
    [formatCardNumber],
  );

  const validateExpirationDate = useCallback(
    (month: number, year: number): boolean => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      if (year < currentYear) return false;
      if (year === currentYear && month < currentMonth) return false;
      return true;
    },
    [],
  );

  const validateCardNumber = useCallback((cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }, []);

  const handleExpirationChange = useCallback((value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) {
      setExpirationMonth(digits);
    } else {
      setExpirationMonth(digits.slice(0, 2));
      setExpirationYear(digits.slice(2, 4));
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!orderId) {
      const errorMsg = "ไม่พบ Order ID";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const cardNumberDigits = cardNumber.replace(/\s/g, "");
    if (!validateCardNumber(cardNumberDigits)) {
      const errorMsg = "กรุณากรอกหมายเลขบัตรให้ถูกต้อง";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!cardName.trim()) {
      const errorMsg = "กรุณากรอกชื่อผู้ถือบัตร";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!expirationMonth || !expirationYear) {
      const errorMsg = "กรุณากรอกวันหมดอายุ";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    const monthNum = parseInt(expirationMonth, 10);
    const yearNum = parseInt(`20${expirationYear}`, 10);

    if (monthNum < 1 || monthNum > 12) {
      const errorMsg = "เดือนไม่ถูกต้อง (1-12)";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!validateExpirationDate(monthNum, yearNum)) {
      const errorMsg = "วันหมดอายุบัตรไม่ถูกต้องหรือหมดอายุแล้ว";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (securityCode.length < 3 || securityCode.length > 4) {
      const errorMsg = "กรุณากรอกรหัสหลังบัตรให้ถูกต้อง";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: [OMISE-001] Replace with Omise.js client-side tokenization when backend API supports token parameter
      // Steps:
      // 1. Install omise package: npm install omise
      // 2. Get Omise public key from backend API (or env variable)
      // 3. Use Omise.createToken() to create token from card details
      // 4. Send only token to backend instead of raw card details
      // This improves security by ensuring card details never pass through our backend
      const chargeResponse = await paymentApi.createCharge({
        orderId,
        cardNumber: cardNumberDigits,
        cardName: cardName.trim(),
        expirationMonth: monthNum,
        expirationYear: yearNum,
        securityCode,
      });

      if (isApiErrorResponse(chargeResponse)) {
        const errorMsg = chargeResponse.errorMessage || "Payment failed";
        onPaymentError?.(errorMsg);
        toast.error(errorMsg);
      } else if (isApiSuccessResponse(chargeResponse)) {
        toast.success("Payment successful!");
        onPaymentSuccess?.(chargeResponse.responseContent.omiseChargeId);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Payment failed";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [
    cardNumber,
    cardName,
    expirationMonth,
    expirationYear,
    securityCode,
    orderId,
    onPaymentError,
    onPaymentSuccess,
    validateCardNumber,
    validateExpirationDate,
  ]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = handleSubmit;
    }
    return () => {
      if (onSubmitRef) {
        onSubmitRef.current = null;
      }
    };
  }, [onSubmitRef, handleSubmit]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Label text="บัตรเครดิต / เดบิต" icon={<CiCreditCard2 fontSize={18} />} />
      <div className="flex flex-col gap-4 rounded-3xl">
        <div className="flex flex-col gap-2">
          <Label text="หมายเลขบัตร" icon={<CiCreditCard2 fontSize={18} />} />
          <Input
            placeholder="XXXX XXXX XXXX XXXX"
            className="p-0.5! rounded-3xl"
            inputClassName="rounded-3xl"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            disabled={isLoading}
            aria-label="หมายเลขบัตรเครดิต"
            aria-required="true"
            aria-invalid={
              cardNumber.length > 0 &&
              !validateCardNumber(cardNumber.replace(/\s/g, ""))
            }
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Label text="วันหมดอายุ" icon={<CalendarIcon size={18} />} />
            <Input
              placeholder="MM / YY"
              className="p-0.5! rounded-3xl"
              inputClassName="rounded-3xl"
              value={
                expirationMonth && expirationYear
                  ? `${expirationMonth}/${expirationYear}`
                  : expirationMonth
              }
              onChange={handleExpirationChange}
              maxLength={5}
              disabled={isLoading}
              aria-label="วันหมดอายุบัตร"
              aria-required="true"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="รหัสหลังบัตร" icon={<CiCreditCard1 fontSize={18} />} />
            <Input
              placeholder="123 / 1234"
              className="p-0.5! rounded-3xl"
              inputClassName="rounded-3xl"
              value={securityCode}
              onChange={setSecurityCode}
              maxLength={4}
              type="password"
              disabled={isLoading}
              aria-label="รหัสความปลอดภัยหลังบัตร"
              aria-required="true"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label text="ชื่อผู้ถือบัตร" icon={<CiCreditCard1 fontSize={18} />} />
          <Input
            placeholder="ชื่อ-นามสกุลผู้ถือบัตร"
            className="p-0.5! rounded-3xl"
            inputClassName="rounded-3xl"
            value={cardName}
            onChange={setCardName}
            disabled={isLoading}
            aria-label="ชื่อผู้ถือบัตร"
            aria-required="true"
          />
        </div>
      </div>
    </div>
  );
};
