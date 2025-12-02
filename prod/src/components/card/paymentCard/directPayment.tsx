"use client";

import { BankIcon } from "@phosphor-icons/react/dist/csr/Bank";
import { FileArrowUpIcon } from "@phosphor-icons/react/dist/csr/FileArrowUp";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { isApiErrorResponse, isApiSuccessResponse } from "@/apis/auth";
import { paymentApi } from "@/apis/payment";
import { Card } from "@/components/common/card";
import { FileInput } from "@/components/common/input";

import { Notation } from "./notation";
import { DirectPaymentProps } from "./types";

export const DirectPayment = ({
  directPayment,
  notationText,
  notationClassName,
  orderId,
  onPaymentSuccess,
  onPaymentError,
  onSubmitRef,
}: DirectPaymentProps) => {
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
    if (!orderId) {
      const errorMsg = "ไม่พบ Order ID";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!selectedFile) {
      const errorMsg = "กรุณาแนบสลิปการโอน";
      onPaymentError?.(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);

    try {
      const response = await paymentApi.createBankTransfer({
        orderId,
        file: selectedFile,
      });

      if (isApiErrorResponse(response)) {
        const errorMsg = response.errorMessage || "Payment submission failed";
        onPaymentError?.(errorMsg);
        toast.error(errorMsg);
      } else if (isApiSuccessResponse(response)) {
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
  }, [selectedFile, orderId, onPaymentError, onPaymentSuccess]);

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
      <h1 className="flex gap-2 items-center">
        <BankIcon size={18} />
        โอนผ่านบัญชีธนาคาร
      </h1>
      <Card
        variant="gradientDarkToLight"
        className="p-0.5 rounded-2xl"
        contentClassName="rounded-2xl bg-background px-6 py-5"
        cardContent={
          <div className="flex flex-col gap-4 text-base">
            <div className="flex items-center justify-between">
              <span>ธนาคาร:</span>
              <span>{directPayment.bankName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>เลขบัญชี:</span>
              <span>{directPayment.accountNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ชื่อบัญชี:</span>
              <span>{directPayment.accountName}</span>
            </div>
          </div>
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
          aria-label="อัปโหลดสลิปการโอนเงิน"
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
