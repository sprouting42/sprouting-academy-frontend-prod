"use client";

import React from "react";

import {
  QuotationForm,
  type QuotationFormData,
} from "@/components/card/quotationForm";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { useModal } from "@/hooks/useModal";

export default function QuotationPage() {
  const { openModal, openModalButton, closeModalButton } = useModal();
  const phoneNumber = "[เบอร์โทรศัพท์]";

  const handleQuotationSubmit = async (data: QuotationFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Submitting quotation data:", data);

      openModalButton();
    } catch (error) {
      console.error("Error submitting quotation:", error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="lg:py-24 max-w-[1216px] mx-auto py-10">
        <QuotationForm onSubmit={handleQuotationSubmit} />
      </div>

      <Modal
        className="lg:min-w-[640px]"
        open={openModal}
        onClose={closeModalButton}
        title="ขอบคุณที่ให้ความสนใจ!"
        position="center"
        size="md"
        showCloseButton={false}
        contentClassName="gap-4 p-4"
        description={
          <div className="flex flex-col gap-2 w-full">
            <p className="font-normal font-prompt leading-7 lg:leading-8.25 lg:text-[22px] text-foreground text-lg w-full">
              เราได้รับคำขอใบเสนอราคาของคุณเรียบร้อยแล้ว
            </p>
            <p className="font-normal font-prompt leading-5 lg:leading-6 lg:text-base text-foreground/50 text-sm w-full">
              หากมีข้อสงสัยเร่งด่วน กรุณาติดต่อเราทางโทรศัพท์ได้ที่{" "}
              <span className="font-semibold text-foreground">
                {phoneNumber}
              </span>
            </p>
          </div>
        }
        buttons={
          <Button
            text="ปิด"
            variant="primaryGradientBorder"
            size="md"
            shape="rounded"
            className="h-12 w-full"
            onClick={closeModalButton}
          />
        }
      />
    </div>
  );
}
