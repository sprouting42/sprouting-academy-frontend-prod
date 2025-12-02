"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

import { isApiErrorResponse } from "@/apis/auth";
import { LoginCard } from "@/components/card/loginCard";
import { OtpCard } from "@/components/card/otpCard";
import { LoginCardSkeleton } from "@/components/skeleton";
import { Social } from "@/enum";
import { useSignInWithOtp, useVerifyOtp } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/utils/api-error";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailError, setEmailError] = useState("");

  const redirectTo = searchParams.get("redirect") || "/";

  const signInWithOtpMutation = useSignInWithOtp();
  const verifyOtpMutation = useVerifyOtp();

  const handleEmailSubmit = async (submittedEmail: string) => {
    setEmailError("");
    try {
      const response = await signInWithOtpMutation.mutateAsync({
        email: submittedEmail,
      });

      if (isApiErrorResponse(response)) {
        const errorMessage =
          response.errorMessage ||
          response.errorDetails?.message ||
          "เกิดข้อผิดพลาด";
        setEmailError(errorMessage);
        return;
      }

      if (response.responseContent) {
        setEmail(submittedEmail);
        setShowOtp(true);
        setOtp("");
        setOtpError("");
        toast.success("ส่งรหัส OTP สำเร็จ", {
          description: "กรุณาตรวจสอบอีเมลของคุณ",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setEmailError(errorMessage || "เกิดข้อผิดพลาด");
    }
  };

  const handleOtpSubmit = async (submittedOtp: string) => {
    setOtpError("");
    try {
      await verifyOtpMutation.mutateAsync({
        email,
        otp: submittedOtp,
      });
      router.push(redirectTo);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setOtpError(errorMessage);
      setOtp("");
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    if (email) {
      setOtpError("");
      try {
        const response = await signInWithOtpMutation.mutateAsync({
          email,
        });

        if (isApiErrorResponse(response)) {
          const errorMessage =
            response.errorMessage ||
            response.errorDetails?.message ||
            "เกิดข้อผิดพลาด";
          setOtpError(errorMessage);
          throw new Error(errorMessage);
        }

        if (response.responseContent) {
          setOtp("");
          toast.success("ส่งรหัส OTP อีกรอบสำเร็จ", {
            description: "กรุณาตรวจสอบอีเมลของคุณ",
          });
        }
      } catch (error) {
        const errorMessage = await getApiErrorMessage(error);
        setOtpError(errorMessage || "เกิดข้อผิดพลาด");
        throw error;
      }
    }
  };

  const handleSocialLogin = async (
    provider: Social.GOOGLE | Social.FACEBOOK | Social.APPLE,
  ) => {
    toast.info("ฟีเจอร์นี้ยังไม่พร้อมใช้งาน", {
      description: `การเข้าสู่ระบบด้วย ${provider} กำลังอยู่ในระหว่างการพัฒนา`,
    });
  };

  return (
    <AnimatePresence mode="wait">
      {showOtp ? (
        <motion.div
          key="otp"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-160 mx-auto w-full"
        >
          <OtpCard
            otpValue={otp}
            setOtpValue={setOtp}
            onBack={() => {
              setShowOtp(false);
              setOtp("");
              setOtpError("");
            }}
            onResendOtp={handleResendOtp}
            onSubmit={handleOtpSubmit}
            userEmail={email}
            error={otpError}
            onErrorClear={() => setOtpError("")}
          />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="max-w-160 mx-auto w-full"
        >
          <LoginCard
            onSubmit={handleEmailSubmit}
            error={emailError}
            onErrorClear={() => setEmailError("")}
            onBack={() => router.back()}
            socialButtons={[
              {
                provider: Social.GOOGLE,
                onClick: () => handleSocialLogin(Social.GOOGLE),
              },
              {
                provider: Social.FACEBOOK,
                onClick: () => handleSocialLogin(Social.FACEBOOK),
              },
              {
                provider: Social.APPLE,
                onClick: () => handleSocialLogin(Social.APPLE),
              },
            ]}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginCardSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}
