"use client";
import React, { useCallback } from "react";
import { FaUser } from "react-icons/fa";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { Social } from "@/enum";
import { cn } from "@/utils/cn";

interface SocialLoginButton {
  provider: Social.GOOGLE | Social.FACEBOOK | Social.APPLE;
  onClick?: () => void;
}

interface LoginCardProps {
  title?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitButtonText?: string;
  dividerText?: string;
  socialButtons?: SocialLoginButton[];
  onSubmit?: (email: string) => void;
  className?: string;
}

const SOCIAL_ICON: Record<
  Social.GOOGLE | Social.FACEBOOK | Social.APPLE,
  React.ReactNode
> = {
  [Social.GOOGLE]: <FcGoogle size={24} className="h-5 lg:h-6 lg:w-6 w-5" />,
  [Social.FACEBOOK]: (
    <FaFacebook
      size={24}
      style={{ color: "#1877F2" }}
      className="h-5 lg:h-6 lg:w-6 w-5"
    />
  ),
  [Social.APPLE]: (
    <FaApple
      size={24}
      style={{ color: "#E5E8E8" }}
      className="h-5 lg:h-6 lg:w-6 w-5"
    />
  ),
};

export const LoginCard = ({
  title = "เข้าสู่ระบบ",
  emailLabel = "อีเมล",
  emailPlaceholder = "name@example.com",
  submitButtonText = "ส่งรหัส OTP",
  dividerText = "หรือเข้าสู่ระบบด้วย",
  socialButtons = [
    { provider: Social.GOOGLE },
    { provider: Social.FACEBOOK },
    { provider: Social.APPLE },
  ],
  onSubmit,
  className,
}: LoginCardProps) => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = React.useState(false);

  const isValidEmail = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (hasAttemptedSubmit || emailError) {
      if (value.trim() && !isValidEmail(value)) {
        setEmailError("กรุณากรอกอีเมลให้ถูกต้อง");
      } else {
        setEmailError("");
      }
    }
  };

  const handleBlur = () => {
    if (email.trim() && !isValidEmail(email)) {
      setEmailError("กรุณากรอกอีเมลให้ถูกต้อง");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!email.trim()) {
      setEmailError("กรุณากรอกอีเมล");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }

    setEmailError("");
    setIsSubmitting(true);
    try {
      await onSubmit?.(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      variant="gradientDarkToLight"
      className={cn("h-auto overflow-hidden w-full max-w-[640px]", className)}
      cardContent={
        <div className="bg-linear-to-b flex flex-col from-background-light h-full justify-between p-4 rounded-2xl to-background w-full">
          <form
            className="flex flex-col gap-4 h-full justify-between lg:gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="font-medium font-prompt leading-6 lg:leading-8.25 lg:text-[22px] mx-auto text-foreground text-lg">
                {title}
              </h1>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-start">
                <FaUser
                  size={20}
                  className="h-5 lg:h-6 lg:w-6 text-foreground w-5"
                />
                <Label
                  text={emailLabel}
                  htmlFor="email-input"
                  className="font-normal font-prompt leading-5 lg:leading-6 lg:text-base text-foreground text-sm"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center rounded-full">
                  <Input
                    id="email-input"
                    name="email"
                    type="email"
                    placeholder={emailPlaceholder}
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="w-full"
                    variant="primary"
                    inputClassName="bg-background-light"
                    required={true}
                    autoComplete="email"
                  />
                </div>
                {emailError && (
                  <p className="font-normal font-prompt leading-4 px-4 text-red-500 text-xs">
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              text={submitButtonText}
              variant="primaryGradientBorder"
              size="md"
              shape="rounded"
              disabled={!email.trim() || !isValidEmail(email) || isSubmitting}
              loading={isSubmitting}
            />

            <div className="flex gap-2 items-center lg:gap-4 w-full">
              <div className="bg-foreground/25 flex-1 h-px" />
              <span className="font-normal font-prompt leading-5 lg:leading-6 lg:text-base text-foreground/50 text-sm">
                {dividerText}
              </span>
              <div className="bg-foreground/25 flex-1 h-px" />
            </div>

            <div className="flex gap-2 items-start lg:gap-4 w-full">
              {socialButtons.map((button) => (
                <div key={button.provider} className="[&>div]:w-full flex-1">
                  <Button
                    type="button"
                    onClick={button.onClick}
                    variant="tertiaryGradientBorder"
                    size="sm"
                    shape="rounded"
                    icon={SOCIAL_ICON[button.provider]}
                  />
                </div>
              ))}
            </div>
          </form>
        </div>
      }
    />
  );
};
