"use client";
import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/common";
import { Card } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { Social } from "@/enum";
import { cn } from "@/utils/cn";
import { isValidEmail } from "@/utils/validation";

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
  onBack?: () => void;
  socialButtons?: SocialLoginButton[];
  onSubmit?: (email: string) => void;
  className?: string;
  error?: string;
  onErrorClear?: () => void;
}

const SOCIAL_ICON: Record<
  Social.GOOGLE | Social.FACEBOOK | Social.APPLE,
  ReactNode
> = {
  [Social.GOOGLE]: <FcGoogle size={24} className="h-5 lg:h-6 lg:w-6 w-5" />,
  [Social.FACEBOOK]: (
    <FaFacebook
      size={24}
      className="h-5 lg:h-6 lg:w-6 w-5"
      style={{ color: "#1877F2" }}
    />
  ),
  [Social.APPLE]: <FaApple size={24} className="h-5 lg:h-6 lg:w-6 w-5" />,
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
  error,
  onErrorClear,
  onBack,
}: LoginCardProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (error && onErrorClear) {
      const timer = setTimeout(() => {
        onErrorClear();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, onErrorClear]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (error && onErrorClear) {
        onErrorClear();
      }
      if (hasAttemptedSubmit || emailError) {
        if (value.trim() && !isValidEmail(value)) {
          setEmailError("กรุณากรอกอีเมลให้ถูกต้อง");
        } else {
          setEmailError("");
        }
      }
    },
    [emailError, error, hasAttemptedSubmit, onErrorClear],
  );

  const handleBlur = () => {
    if (email.trim() && !isValidEmail(email)) {
      setEmailError("กรุณากรอกอีเมลให้ถูกต้อง");
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
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
        onSubmit?.(email);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, onSubmit],
  );

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
            <div className="flex flex-col items-center justify-between lg:flex-row w-full">
              {onBack && (
                <Button
                  type="button"
                  onClick={onBack}
                  variant="textButton"
                  size="sm"
                  text="ย้อนกลับ"
                  icon={<BiSolidLeftArrow size={16} className="h-4 w-4" />}
                  className="items-start justify-start lg:items-center lg:w-auto w-full z-10"
                />
              )}
              <h1
                className={cn(
                  "font-medium font-prompt leading-6 lg:leading-relaxed lg:text-xl text-center text-foreground text-lg",
                  onBack ? "flex-1" : "mx-auto",
                )}
              >
                {title}
              </h1>
              {onBack && <div className="w-25" />}
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
                {(emailError || error) && (
                  <p className="font-normal font-prompt leading-4 px-4 text-center text-red-500 text-xs">
                    {error || emailError}
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
