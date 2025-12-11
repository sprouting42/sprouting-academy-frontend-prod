"use client";

import { CalendarIcon } from "@phosphor-icons/react/dist/csr/Calendar";
import { useMutation } from "@tanstack/react-query";
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
  const omisePublicKey = process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY || "";

  const createChargeMutation = useMutation({
    mutationFn: async (tokenId: string) => {
      return paymentApi.createCharge({ orderId, token: tokenId });
    },
    onSuccess: (resp) => {
      if (isApiErrorResponse(resp)) {
        const msg = resp.errorMessage || "Payment failed";
        onPaymentError?.(msg);
        toast.error(msg);
        return;
      }
      if (isApiSuccessResponse(resp)) {
        const chargeId = resp.responseContent.omiseChargeId;
        toast.success("Payment successful!");
        onPaymentSuccess?.(chargeId);
      }
    },
    onError: (error) => {
      const msg = error instanceof Error ? error.message : "Payment failed";
      onPaymentError?.(msg);
      toast.error(msg);
    },
  });

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

  const showError = useCallback(
    (message: string) => {
      onPaymentError?.(message);
      toast.error(message);
    },
    [onPaymentError],
  );

  const validateInputs = useCallback(
    (
      cardNumberDigits: string,
      monthNum: number,
      yearNum: number,
    ): string | null => {
      if (!orderId) return "ไม่พบ Order ID";
      if (!validateCardNumber(cardNumberDigits))
        return "กรุณากรอกหมายเลขบัตรให้ถูกต้อง";
      if (!cardName.trim()) return "กรุณากรอกชื่อผู้ถือบัตร";
      if (!expirationMonth || !expirationYear) return "กรุณากรอกวันหมดอายุ";
      if (monthNum < 1 || monthNum > 12) return "เดือนไม่ถูกต้อง (1-12)";
      if (!validateExpirationDate(monthNum, yearNum))
        return "วันหมดอายุบัตรไม่ถูกต้องหรือหมดอายุแล้ว";
      if (securityCode.length < 3 || securityCode.length > 4)
        return "กรุณากรอกรหัสหลังบัตรให้ถูกต้อง";
      if (!omisePublicKey) return "Payment system not initialized";
      if (!window.Omise) return "Omise.js not loaded";
      return null;
    },
    [
      orderId,
      cardName,
      expirationMonth,
      expirationYear,
      securityCode,
      omisePublicKey,
      validateCardNumber,
      validateExpirationDate,
    ],
  );

  const handleOmiseTokenCallback = useCallback(
    (statusCode: number, response: OmiseTokenResponse | OmiseError) => {
      if (statusCode !== 200 || response.object === "error") {
        const error = response as OmiseError;
        showError(error.message || "Failed to create payment token");
        createChargeMutation.reset();
        return;
      }

      const tokenResponse = response as OmiseTokenResponse;
      createChargeMutation.mutate(tokenResponse.id);
    },
    [createChargeMutation, showError],
  );

  const handleSubmit = useCallback(async () => {
    const cardNumberDigits = cardNumber.replace(/\s/g, "");
    const monthNum = parseInt(expirationMonth, 10);
    const yearNum = parseInt(`20${expirationYear}`, 10);

    const validationError = validateInputs(cardNumberDigits, monthNum, yearNum);
    if (validationError) {
      showError(validationError);
      return;
    }

    if (createChargeMutation.isPending) {
      return;
    }

    try {
      window.Omise!.setPublicKey(omisePublicKey);
      window.Omise!.createToken(
        "card",
        {
          name: cardName.trim(),
          number: cardNumberDigits,
          expiration_month: expirationMonth,
          expiration_year: expirationYear,
          security_code: securityCode,
        },
        handleOmiseTokenCallback,
      );
    } catch (error) {
      showError(error instanceof Error ? error.message : "Payment failed");
      createChargeMutation.reset();
    }
  }, [
    cardNumber,
    cardName,
    expirationMonth,
    expirationYear,
    securityCode,
    omisePublicKey,
    validateInputs,
    handleOmiseTokenCallback,
    showError,
    createChargeMutation,
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
            disabled={createChargeMutation.isPending}
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
              disabled={createChargeMutation.isPending}
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
              disabled={createChargeMutation.isPending}
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
            disabled={createChargeMutation.isPending}
            aria-label="ชื่อผู้ถือบัตร"
            aria-required="true"
          />
        </div>
      </div>
    </div>
  );
};
