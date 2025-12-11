"use client";

import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { useForm } from "@tanstack/react-form";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { HiEnvelope, HiPhone, HiUser } from "react-icons/hi2";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { Modal } from "@/components/common/modal";
import { UserAvatar } from "@/components/common/userAvatar";
import {
  type ProfileEditFormData,
  profileEditSchema,
} from "@/schemas/profile.schema";
import { cn } from "@/utils/cn";

interface ErrorMessageProps {
  message?: string;
  id?: string;
}

const ErrorMessage = ({ message, id }: ErrorMessageProps) => {
  if (!message) return null;
  return (
    <span id={id} className="font-prompt text-red-500 text-sm" role="alert">
      {message}
    </span>
  );
};

const createFieldValidator = <T extends z.ZodType>(schema: T) => {
  return ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };
};

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: {
    avatarUrl?: string | null;
    fullName: string;
    nickname?: string | null;
    email: string;
    phone?: string | null;
  };
  onSubmit?: (
    data: ProfileEditFormData & { avatarFile?: File | null },
  ) => void | Promise<void>;
}

const FIELD_WRAPPER_CLASS =
  "flex flex-col gap-1 md:gap-2 items-start p-0 w-full";
const ICON_PROPS = {
  size: 20,
  style: {
    width: "1.25rem",
    height: "1.25rem",
    color: "var(--foreground)",
  } as const,
};
const INPUT_COMMON_PROPS = {
  variant: "primary" as const,
  className: "w-full",
};

export const EditProfileModal = ({
  open,
  onClose,
  initialData,
  onSubmit,
}: EditProfileModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialData?.avatarUrl || null,
  );
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm({
    defaultValues: {
      fullName: initialData?.fullName || "",
      nickname: "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      avatarUrl: initialData?.avatarUrl || "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        await onSubmit?.({
          ...value,
          avatarFile,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    onSubmitInvalid: ({ value }) => {
      const result = profileEditSchema.safeParse(value);
      if (!result.success) {
        const firstErrorField = result.error.issues[0]?.path[0] as string;

        if (
          firstErrorField &&
          firstErrorField !== "email" &&
          fieldRefs.current[firstErrorField]
        ) {
          setTimeout(() => {
            fieldRefs.current[firstErrorField]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });

            const input =
              fieldRefs.current[firstErrorField]?.querySelector("input");
            setTimeout(() => {
              (input as HTMLInputElement)?.focus();
            }, 400);
          }, 100);
        }
      }
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const handleAvatarChange = useCallback((file: File | null) => {
    if (file) {
      const maxSize = 3 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("ขนาดไฟล์ต้องไม่เกิน 3MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("กรุณาเลือกไฟล์รูปภาพ (JPG หรือ PNG)");
        return;
      }
    }

    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleRemoveAvatar = useCallback(() => {
    setAvatarFile(null);
    setAvatarPreview(null);
    form.setFieldValue("avatarUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [form]);

  const handleChangePhotoClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  useEffect(() => {
    if (open && initialData) {
      form.setFieldValue("fullName", initialData.fullName);
      form.setFieldValue("nickname", initialData.nickname || "");
      form.setFieldValue("phone", initialData.phone || "");
      form.setFieldValue("email", initialData.email);
      form.setFieldValue("avatarUrl", initialData.avatarUrl || "");
      setAvatarPreview(initialData.avatarUrl || null);
      setAvatarFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, initialData, form]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      lockScroll
      closeOnOverlayClick={!isSubmitting}
      className="max-w-[725px]"
      contentClassName="p-0 bg-background-light rounded-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto"
      cardVariant="gradientLightToForeground"
    >
      <div className="flex flex-col items-center relative w-full">
        <Button
          variant="iconOnly"
          size="sm"
          shape="circle"
          icon={
            <XIcon
              size={20}
              className="h-5 md:h-6 md:w-6 text-white w-5"
              weight="bold"
            />
          }
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute bg-primary h-8 md:h-10 md:right-6 md:top-6 md:w-10 right-3 rounded-full top-3 w-8 z-10"
          aria-label="Close"
        />

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="flex flex-col gap-2 items-center lg:gap-6 lg:p-8 md:gap-5 md:p-6 p-3 w-full"
        >
          <div className="flex flex-col gap-2 items-center lg:gap-6 md:gap-5">
            <div className="h-24 md:h-48 md:w-48 w-24">
              <UserAvatar
                size="2xl"
                avatarUrl={avatarPreview}
                className="h-full w-full"
              />
            </div>

            <div className="flex flex-col gap-2 items-center md:flex-row md:gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleAvatarChange(e.target.files?.[0] || null)
                }
                disabled={isSubmitting}
                className="hidden"
                id="avatar-upload"
                aria-label="Change photo"
              />
              <Button
                text="Change photo"
                variant="lightButton"
                size="sm"
                shape="square"
                disabled={isSubmitting}
                type="button"
                onClick={handleChangePhotoClick}
              />
              <Button
                text="Remove photo"
                variant="primary"
                size="sm"
                shape="square"
                onClick={handleRemoveAvatar}
                disabled={isSubmitting || !avatarPreview}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center md:gap-5 w-full">
            <div className="flex flex-col gap-2 items-start md:gap-5 w-full">
              <form.Field
                name="fullName"
                validators={{
                  onChange: createFieldValidator(
                    profileEditSchema.shape.fullName,
                  ),
                  onBlur: createFieldValidator(
                    profileEditSchema.shape.fullName,
                  ),
                }}
              >
                {(field) => (
                  <div
                    ref={(el) => {
                      fieldRefs.current.fullName = el;
                    }}
                    className={FIELD_WRAPPER_CLASS}
                  >
                    <Label
                      text="Name"
                      icon={<HiUser {...ICON_PROPS} />}
                      required
                      htmlFor="fullName"
                    />
                    <Input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      placeholder="Enter your name"
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      {...INPUT_COMMON_PROPS}
                      required
                      disabled={isSubmitting}
                    />
                    <ErrorMessage
                      message={field.state.meta.errors[0]}
                      id="fullName-error"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="nickname">
                {(field) => (
                  <div
                    ref={(el) => {
                      fieldRefs.current.nickname = el;
                    }}
                    className={FIELD_WRAPPER_CLASS}
                  >
                    <Label
                      text="Nickname"
                      icon={<HiUser {...ICON_PROPS} />}
                      htmlFor="nickname"
                    />
                    <Input
                      id="nickname"
                      name="nickname"
                      autoComplete="off"
                      placeholder="Enter nickname (optional)"
                      value={field.state.value || ""}
                      onChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      {...INPUT_COMMON_PROPS}
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="flex flex-col gap-2 items-start md:flex-row md:gap-5 w-full">
              <form.Field
                name="phone"
                validators={{
                  onChange: createFieldValidator(profileEditSchema.shape.phone),
                  onBlur: createFieldValidator(profileEditSchema.shape.phone),
                }}
              >
                {(field) => (
                  <div
                    ref={(el) => {
                      fieldRefs.current.phone = el;
                    }}
                    className={cn(FIELD_WRAPPER_CLASS, "md:flex-1")}
                  >
                    <Label
                      text="Phone"
                      icon={<HiPhone {...ICON_PROPS} />}
                      htmlFor="phone"
                    />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="08x-xxx-xxxx"
                      value={field.state.value || ""}
                      onChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      {...INPUT_COMMON_PROPS}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage
                      message={field.state.meta.errors[0]}
                      id="phone-error"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="email">
                {(field) => (
                  <div
                    ref={(el) => {
                      fieldRefs.current.email = el;
                    }}
                    className={cn(FIELD_WRAPPER_CLASS, "md:flex-1")}
                  >
                    <Label
                      text="Email"
                      icon={<HiEnvelope {...ICON_PROPS} />}
                      htmlFor="email"
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={field.state.value}
                      {...INPUT_COMMON_PROPS}
                      disabled={true}
                      readOnly
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>

          <Button
            type="submit"
            text="SAVE"
            variant="primaryGradientBorder"
            size="sm"
            shape="rounded"
            className="md:w-auto min-w-51.5 w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};
