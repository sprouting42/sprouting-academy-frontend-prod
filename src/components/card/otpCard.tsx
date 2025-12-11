"use client";
import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { PiCircleBold } from "react-icons/pi";

import { Button } from "@/components/common";
import { Card } from "@/components/common/card";
import { OtpInput } from "@/components/common/input";
import { cn } from "@/utils/cn";

const COUNTDOWN = 60;

interface OtpCardProps {
  className?: string;
  otpValue: string;
  setOtpValue: (value: string) => void;
  onBack?: () => void;
  onResendOtp?: () => void;
  onSubmit?: (otp: string) => void;
  userEmail?: string;
  error?: string;
  onErrorClear?: () => void;
}

export const OtpCard = ({
  className,
  otpValue,
  setOtpValue,
  onBack,
  onResendOtp,
  onSubmit,
  userEmail = "[อีเมลผู้ใช้]",
  error,
  onErrorClear,
}: OtpCardProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN);

  const validateOtp = useCallback((otpValue: string): boolean => {
    return /^\d{6}$/.test(otpValue);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      onResendOtp?.();
      setCountdown(COUNTDOWN);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!validateOtp(otpValue)) {
        return;
      }
      setIsSubmitting(true);
      try {
        onSubmit?.(otpValue);
      } finally {
        setIsSubmitting(false);
      }
    },
    [otpValue, onSubmit, validateOtp],
  );

  const getResendButtonText = () => {
    if (isResending) return "กำลังส่ง...";
    if (countdown > 0) return `ส่ง OTP อีกรอบ (${countdown} วินาที)`;
    return "ส่ง OTP อีกรอบ";
  };

  return (
    <Card
      variant="gradientDarkToLight"
      className={cn("h-auto overflow-hidden w-full max-w-160", className)}
      cardContent={
        <div className="bg-linear-to-b flex flex-col from-background-light h-full justify-between p-4 rounded-2xl to-background w-full">
          <form
            className="flex flex-col gap-4 h-full justify-between lg:gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-between lg:flex-row w-full">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="textButton"
                  size="sm"
                  text="ย้อนกลับ"
                  icon={<BiSolidLeftArrow size={16} className="h-4 w-4" />}
                  className="items-start justify-start lg:items-center lg:w-auto w-full z-10"
                />
                <h1 className="flex-1 font-medium font-prompt leading-6 lg:leading-relaxed lg:text-xl text-center text-foreground text-lg">
                  ยืนยันรหัส OTP
                </h1>
                <div className="w-25" />
              </div>
              <p className="font-normal font-prompt leading-5 lg:leading-6 lg:text-base text-foreground text-sm">
                เราได้ส่งรหัส 6 หลักไปยัง {userEmail}
              </p>
              <OtpInput
                length={6}
                className="w-full"
                placeholder={<PiCircleBold />}
                value={otpValue}
                onChange={(value) => {
                  setOtpValue(value);
                  if (error && onErrorClear) {
                    onErrorClear();
                  }
                }}
                disabled={isSubmitting}
              />
              {error && (
                <p className="font-normal font-prompt leading-4 px-4 text-center text-red-500 text-xs w-full">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleResendOtp}
              variant="textButton"
              size="sm"
              text={getResendButtonText()}
              disabled={isResending || countdown > 0}
              loading={isResending}
              className="flex items-center justify-center"
            />

            <Button
              type="submit"
              text="ยืนยันรหัส OTP"
              variant="primaryGradientBorder"
              size="md"
              shape="rounded"
              disabled={otpValue.length !== 6 || isSubmitting}
              loading={isSubmitting}
            />
          </form>
        </div>
      }
    />
  );
};
