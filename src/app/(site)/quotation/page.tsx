"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { QuotationForm } from "@/components/card/quotationCard/quotationForm";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { useCourses } from "@/hooks/useCourses";
import { useModal } from "@/hooks/useModal";
import type { QuotationFormData } from "@/schemas/quotation.schema";

export default function QuotationPage() {
  const { openModal, openModalButton, closeModalButton } = useModal();
  const phoneNumber = "[เบอร์โทรศัพท์]";
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true });
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();

  const handleQuotationSubmit = async (data: QuotationFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (process.env.NODE_ENV === "development") {
        console.log("Submitting quotation data:", data);
      }

      openModalButton();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error submitting quotation:", error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 30 }}
        animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="lg:py-24 max-w-304 mx-auto py-10"
      >
        <QuotationForm
          onSubmit={handleQuotationSubmit}
          courses={courses}
          isLoadingCourses={isLoadingCourses}
        />
      </motion.div>

      <Modal
        className="lg:min-w-160"
        open={openModal}
        onClose={closeModalButton}
        title="ขอบคุณที่ให้ความสนใจ!"
        position="center"
        size="md"
        showCloseButton={false}
        contentClassName="gap-4 p-4"
        description={
          <div className="flex flex-col gap-2 w-full">
            <p className="font-normal font-prompt leading-7 lg:leading-relaxed lg:text-xl text-foreground text-lg w-full">
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
