"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

import { LoginCard } from "@/components/card/loginCard";
import { OtpCard } from "@/components/card/otpCard";
import { LoginCardSkeleton } from "@/components/skeleton";
import { Social } from "@/enum";

const MOCK_OTP = process.env.NEXT_PUBLIC_MOCK_OTP || "123456";
const IS_DEV = process.env.NODE_ENV === "development";

const mockSendOtp = async (email: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (IS_DEV) {
    console.log(`[Mock] OTP sent to ${email}: ${MOCK_OTP}`);
  }
};

const mockVerifyOtp = async (email: string, otp: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const isValid = otp === MOCK_OTP;
  if (IS_DEV && isValid) {
    console.log(`[Mock] OTP verified successfully for ${email}`);
  }
  return isValid;
};

const mockSocialLogin = async (
  provider: Social.GOOGLE | Social.FACEBOOK | Social.APPLE,
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (IS_DEV) {
    console.log(`[Mock] Social login with ${provider} successful`);
  }
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const redirectTo = searchParams.get("redirect") || "/";

  const handleEmailSubmit = async (submittedEmail: string) => {
    try {
      await mockSendOtp(submittedEmail);
      setEmail(submittedEmail);
      setShowOtp(true);
      setOtp("");
      setOtpError("");
      toast.success("ส่งรหัส OTP สำเร็จ", {
        description: "กรุณาตรวจสอบอีเมลของคุณ",
      });
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด", {
        description: "ไม่สามารถส่งรหัส OTP ได้ กรุณาลองอีกครั้ง",
      });
      if (IS_DEV) {
        console.error("Failed to send OTP:", error);
      }
    }
  };

  const handleOtpSubmit = async (submittedOtp: string) => {
    setOtpError("");
    try {
      const isValid = await mockVerifyOtp(email, submittedOtp);
      if (isValid) {
        toast.success("เข้าสู่ระบบสำเร็จ", {
          description: "กำลังนำคุณไปยังหน้าที่ต้องการ",
        });
        router.push(redirectTo);
      } else {
        setOtpError("รหัส OTP ไม่ถูกต้อง กรุณาลองอีกครั้ง");
        setOtp("");
        toast.error("รหัส OTP ไม่ถูกต้อง", {
          description: "กรุณาตรวจสอบและลองอีกครั้ง",
        });
      }
    } catch (error) {
      setOtp("");
      toast.error("เกิดข้อผิดพลาด", {
        description: "ไม่สามารถยืนยันรหัส OTP ได้ กรุณาลองอีกครั้ง",
      });
      if (IS_DEV) {
        console.error("Failed to verify OTP:", error);
      }
    }
  };

  const handleResendOtp = async () => {
    if (email) {
      setOtpError("");
      try {
        await mockSendOtp(email);
        setOtp("");
        toast.success("ส่งรหัส OTP อีกรอบสำเร็จ", {
          description: "กรุณาตรวจสอบอีเมลของคุณ",
        });
      } catch (error) {
        toast.error("เกิดข้อผิดพลาด", {
          description: "ไม่สามารถส่งรหัส OTP อีกรอบได้ กรุณาลองอีกครั้ง",
        });
        if (IS_DEV) {
          console.error("Failed to resend OTP:", error);
        }
      }
    }
  };

  const handleSocialLogin = async (
    provider: Social.GOOGLE | Social.FACEBOOK | Social.APPLE,
  ) => {
    try {
      await mockSocialLogin(provider);
      toast.success("เข้าสู่ระบบสำเร็จ", {
        description: `เข้าสู่ระบบด้วย ${provider} สำเร็จ`,
      });
      router.push(redirectTo);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด", {
        description:
          "ไม่สามารถเข้าสู่ระบบด้วย Social Login ได้ กรุณาลองอีกครั้ง",
      });
      if (IS_DEV) {
        console.error("Failed to login with social:", error);
      }
    }
  };

  if (showOtp) {
    return (
      <div className="flex items-center justify-center py-48">
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
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-48">
      <LoginCard
        onSubmit={handleEmailSubmit}
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
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginCardSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}
