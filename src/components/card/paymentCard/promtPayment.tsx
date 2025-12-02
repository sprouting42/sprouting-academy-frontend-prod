import { BankIcon } from "@phosphor-icons/react/dist/csr/Bank";
import { FileArrowUpIcon } from "@phosphor-icons/react/dist/csr/FileArrowUp";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// TODO: [PROMPTPAY-001] Enable when backend API is ready
// import { isApiErrorResponse } from "@/apis/auth";
// import { paymentApi } from "@/apis/payment";
import { Card } from "@/components/common/card";
import { FileInput } from "@/components/common/input";
import { Label } from "@/components/common/label";

import { Notation } from "./notation";
import { PromptPaymentProps } from "./types";

export const PropmtPayment = ({
  promptPayment,
  notationText,
  notationClassName,
  orderId,
  // TODO: [PROMPTPAY-001] Enable when backend API is ready
  // Implementation needed:
  // - Use onPaymentSuccess prop
  // - Implement paymentApi.createPromptPayPayment() in src/apis/payment.ts
  // - Replace setTimeout error with actual API call
  // - Handle success/error responses
  onPaymentError,
  onSubmitRef,
}: PromptPaymentProps) => {
  const { qrImage, bankName, accountNumber, accountName } = promptPayment;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, หรือ WebP)");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("ขนาดไฟล์ต้องไม่เกิน 5MB");
        return;
      }

      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedFile) {
      toast.error("กรุณาแนบสลิปการโอน");
      onPaymentError?.("กรุณาแนบสลิปการโอน");
      return;
    }

    if (!orderId) {
      toast.error("ไม่พบ Order ID");
      onPaymentError?.("ไม่พบ Order ID");
      return;
    }

    setIsLoading(true);

    // TODO: [PROMPTPAY-001] Integrate with PromptPay payment API when backend API is available
    // When API is ready, replace the setTimeout code below with:
    /*
    try {
      const response = await paymentApi.createPromptPayPayment({
        orderId,
        file: selectedFile,
      });

      if (isApiErrorResponse(response)) {
        const errorMsg = response.errorMessage || "Payment submission failed";
        onPaymentError?.(errorMsg);
        toast.error(errorMsg);
      } else if (response.isSuccessful) {
        toast.success("ส่งสลิปการโอนเรียบร้อยแล้ว กรุณารอการตรวจสอบ");
        onPaymentSuccess?.(response.responseContent.id);
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Payment submission failed";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
    */
    setTimeout(() => {
      toast.error("PromptPay payment API ยังไม่พร้อมใช้งาน");
      onPaymentError?.("PromptPay payment API ยังไม่พร้อมใช้งาน");
      setIsLoading(false);
    }, 500);
  }, [selectedFile, orderId, onPaymentError]);

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
    <div className="flex flex-col gap-4">
      <Label text="โอนเงินผ่าน PromptPay" icon={<BankIcon />} />
      <Card
        variant="gradientDarkToLight"
        className="p-0.5 rounded-2xl"
        contentClassName="rounded-2xl bg-background px-6 py-5"
        cardContent={
          <>
            <div className="flex flex-col gap-4 items-center">
              <div className="mb-4">
                <Image
                  src={qrImage}
                  alt="PromptPay QR Code"
                  width={166}
                  height={166}
                  className="h-44 object-contain w-44"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span>ธนาคาร:</span>
                <span>{bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>เลขบัญชี:</span>
                <span>{accountNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ชื่อบัญชี:</span>
                <span>{accountName}</span>
              </div>
            </div>
          </>
        }
      />
      <div className="flex flex-col gap-4">
        <h1 className="flex gap-2 items-center">
          <FileArrowUpIcon size={18} />
          แนบสลิปการโอน
        </h1>
        <FileInput
          className="p-0.5! w-full"
          inputClassName=""
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
          aria-label="อัปโหลดสลิปการโอนเงิน PromptPay"
          aria-required="true"
        />
        {selectedFile && (
          <div className="text-foreground/70 text-sm">
            ไฟล์ที่เลือก: {selectedFile.name} (
            {(selectedFile.size / 1024).toFixed(2)} KB)
          </div>
        )}
      </div>
      <Notation
        notationText={notationText}
        notationClassName={notationClassName}
      />
    </div>
  );
};
