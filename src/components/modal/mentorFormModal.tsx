"use client";

import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

import { submitContactForm } from "@/apis/contact";
import { Button } from "@/components/common/button";
import { Input, Textarea } from "@/components/common/input";
import { Modal } from "@/components/common/modal";
import { isValidEmail } from "@/utils/validation";

interface MentorFormModalProps {
  open?: boolean;
  onClose?: () => void;
}

export const MentorFormModal = ({
  open = false,
  onClose,
}: MentorFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        await submitContactForm({
          name: value.name,
          email: value.email,
          message: value.message || "",
        });
        toast.success("ส่งข้อความสำเร็จ เราจะติดต่อกลับเร็วๆ นี้");
        form.reset();
        onClose?.();
      } catch (error) {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        console.error("Contact form error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      onClose?.();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="lg"
      lockScroll
      closeOnOverlayClick={!isSubmitting}
      className="max-w-[700px]"
      contentClassName="rounded-2xl bg-background-light px-4 py-6"
      cardVariant="gradientLightToDark"
    >
      <div className="flex flex-col gap-6 relative w-full">
        <Button
          variant="iconOnly"
          size="sm"
          shape="circle"
          icon={
            <XIcon
              size={20}
              className="h-5 md:h-6 md:w-6 text-foreground/50 w-5"
              weight="bold"
            />
          }
          onClick={handleClose}
          disabled={isSubmitting}
          className="-right-2 -top-2 absolute h-8 md:-right-2 md:-top-4 md:h-10 md:w-10 rounded-full w-8 z-10"
          aria-label="Close"
        />

        <div className="flex flex-col mt-2 pr-10">
          <p className="font-prompt leading-relaxed md:text-base text-foreground text-sm">
            ฝากคำถามเกี่ยวกับ Bootcamp ไม่ว่าจะเป็นเนื้อหา
            รูปแบบการเรียนหรือความเหมาะสมกับเป้าหมายของคุณ
            เมนเทอร์จะช่วยแนะนำให้ตรงจุด
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-6 w-full"
        >
          <div className="flex flex-col gap-1 w-full">
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "กรุณากรอกชื่อของคุณ";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    placeholder="ชื่อของคุณ*"
                    required
                    disabled={isSubmitting}
                    className="w-full"
                    inputClassName="pl-6 font-prompt text-sm md:text-base"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="font-prompt text-red-500 text-sm">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "กรุณากรอกอีเมลของคุณ";
                  }
                  if (!isValidEmail(value)) {
                    return "รูปแบบอีเมลไม่ถูกต้อง";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    type="email"
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    placeholder="อีเมลของคุณ*"
                    required
                    disabled={isSubmitting}
                    className="w-full"
                    inputClassName="pl-6 font-prompt text-sm md:text-base"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="font-prompt text-red-500 text-sm">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <form.Field name="message">
              {(field) => (
                <div className="flex flex-col gap-1 w-full">
                  <Textarea
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    placeholder="ข้อความ"
                    rows={5}
                    disabled={isSubmitting}
                    className="w-full"
                    textareaClassName="font-prompt text-sm md:text-base "
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex justify-end pt-2 w-full">
            <Button
              type="submit"
              text="ส่งข้อความ"
              variant="primaryGradientBorder"
              size="sm"
              shape="rounded"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="w-full"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
