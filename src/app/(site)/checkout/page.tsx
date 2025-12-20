"use client";

import { SparkleIcon } from "@phosphor-icons/react/dist/csr/Sparkle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaPenClip } from "react-icons/fa6";
import { toast } from "sonner";

import { isApiErrorResponse, isApiSuccessResponse } from "@/apis/auth";
import { orderApi } from "@/apis/order";
import { notificationApi } from "@/apis/payment";
import { type UserInfo, UserInfoCard } from "@/components/card";
import { PaymentCard } from "@/components/card/paymentCard/paymentCard";
import { Badge } from "@/components/common/badge";
import { PaymentConfirm, type PaymentConfirmData } from "@/components/modal";
import { BANK_INFO } from "@/constants/payment";
import { useGetMe } from "@/hooks/useAuth";
import { cartKeys, useGetCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cartStore";
import { formatDateShort } from "@/utils/dateFormatter";

const CheckoutPage = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const cardsInView = useInView(cardsRef, { once: true });

  const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] =
    useState(false);
  const [paymentSuccessData, setPaymentSuccessData] =
    useState<PaymentConfirmData | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const { data: user } = useGetMe();
  const {
    data: cartItems = [],
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCart();
  const clearCart = useCartStore((state) => state.clearCart);
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (!cartItems || cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      const response = await orderApi.createOrder({
        items: cartItems.map((item) => ({ courseId: item.courseId })),
      });

      if (isApiErrorResponse(response)) {
        throw new Error(response.errorMessage || "Failed to create order");
      }

      if (isApiSuccessResponse(response)) {
        return response.responseContent;
      }

      throw new Error("Failed to create order");
    },
    onSuccess: (order) => {
      setOrderId(order.id);
    },
    onError: (error: Error) => {
      toast.error(error.message || "ไม่สามารถสร้างออเดอร์ได้");
      router.push("/courses");
    },
  });

  const { data: orderData } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const response = await orderApi.getOrderById(orderId);
      if (isApiErrorResponse(response)) {
        throw new Error(response.errorMessage || "Failed to get order");
      }
      if (isApiSuccessResponse(response)) {
        return response.responseContent;
      }
      throw new Error("Failed to get order");
    },
    enabled: !!orderId,
  });

  useEffect(() => {
    if (cartError) {
      toast.error("ไม่สามารถโหลดข้อมูลตะกร้าได้");
      router.push("/courses");
      return;
    }

    if (
      !isCartLoading &&
      cartItems &&
      cartItems.length > 0 &&
      !orderId &&
      !createOrderMutation.isPending
    ) {
      createOrderMutation.mutate();
    } else if (
      !isCartLoading &&
      (!cartItems || cartItems.length === 0) &&
      !orderId
    ) {
      toast.error("ตะกร้าของคุณว่างเปล่า");
      router.push("/courses");
    }
  }, [
    isCartLoading,
    cartItems,
    orderId,
    createOrderMutation,
    cartError,
    router,
  ]);

  const handlePaymentSuccess = useCallback(
    async (
      paymentId: string,
      paymentType: "card" | "bank-transfer" | "promptpay",
    ) => {
      const userName = user?.fullName || "ผู้ใช้";
      const courseNames =
        cartItems?.map((item) => item.courseName).filter(Boolean) || [];
      const allCourseNames =
        courseNames.length > 0 ? courseNames.join(", ") : "คอร์ส";

      if (paymentType === "card") {
        const firstCourseName = courseNames[0] || "คอร์ส";
        const totalAmount = orderData?.totalAmount || 0;
        const courseCount = cartItems?.length || 0;

        const paymentData: PaymentConfirmData = {
          amount: totalAmount,
          userName,
          itemName:
            courseCount > 1
              ? `${firstCourseName} และอีก ${courseCount - 1} คอร์ส`
              : firstCourseName,
          orderNumber: orderId || "",
          dateTime: new Date().toLocaleString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setPaymentSuccessData(paymentData);
        setIsPaymentSuccessModalOpen(true);
      } else {
        toast.success("ส่งสลิปการโอนเรียบร้อยแล้ว กรุณารอการตรวจสอบ");
      }

      const getPaymentTypeLabel = (
        type: "card" | "bank-transfer" | "promptpay",
      ): string => {
        switch (type) {
          case "card":
            return "บัตรเครดิต/เดบิต";
          case "bank-transfer":
            return "โอนเงินผ่านธนาคาร";
          case "promptpay":
            return "PromptPay";
          default:
            return "ไม่ระบุ";
        }
      };

      try {
        await notificationApi.sendDiscordNotification({
          courseName: allCourseNames,
          userName,
          orderId: orderId || "",
          paymentId,
          paymentType: getPaymentTypeLabel(paymentType),
        });
      } catch {
        // Silently fail - notification is not critical
      }

      clearCart();
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
    },
    [orderId, user, cartItems, orderData, clearCart, queryClient],
  );

  const handlePaymentError = useCallback((error: string) => {
    toast.error(error);
  }, []);

  // TODO: [DISCOUNT-001] Integrate with coupon/discount API when available
  // Implementation needed:
  // - Create discountApi.applyCoupon() function in src/apis/discount.ts
  // - Call API with orderId and coupon code
  // - Update order total with discount amount
  // - Handle validation errors (invalid code, expired, etc.)
  // - Update UI to show discount amount and final total

  const courses = useMemo(() => {
    if (!cartItems || cartItems.length === 0) {
      return [];
    }
    return cartItems.map((item) => ({
      course: item.courseName || "คอร์ส",
      startDate: item.date ? formatDateShort(item.date) : "TBD",
      price: item.price
        ? `${item.price.toLocaleString("th-TH")} บาท`
        : undefined,
    }));
  }, [cartItems]);

  const formattedPrice = useMemo(() => {
    if (orderData && orderData.totalAmount !== undefined) {
      return `${orderData.totalAmount.toLocaleString("th-TH")} บาท`;
    }
    if (cartItems && cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
      return `${total.toLocaleString("th-TH")} บาท`;
    }
    return "0 บาท";
  }, [orderData, cartItems]);

  const isLoading =
    isCartLoading || createOrderMutation.isPending || !!cartError;

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="status"
        aria-live="polite"
        aria-label="กำลังโหลดข้อมูล"
      >
        <div className="text-center">
          <div
            className="animate-spin border-b-2 border-primary h-12 mx-auto rounded-full w-12"
            aria-hidden="true"
          />
          <p className="mt-4 text-foreground/70">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (!isCartLoading && (!cartItems || cartItems.length === 0)) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="alert"
        aria-live="polite"
      >
        <div className="text-center">
          <p className="text-foreground/70">ตะกร้าของคุณว่างเปล่า</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-16 items-center justify-end lg:pt-48 pb-16 pt-24 px-4 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 items-center max-w-4xl w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary lg:text-6xl text-4xl text-center text-transparent to-primary"
          >
            สมัครเรียน AI Automation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-normal font-prompt lg:text-xl text-center text-lg"
          >
            กรอกข้อมูลและชำระเงินเพื่อเริ่มต้นการเรียนรู้
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Badge
            variant="transparentSecondary"
            size="sm"
            text="ปลอดภัย 100% การันตีความเป็นส่วนตัว"
            icon={<SparkleIcon size={16} color="#13b499" weight="bold" />}
          />
        </motion.div>
      </motion.div>

      <motion.div
        ref={cardsRef}
        initial="hidden"
        animate={
          !isLoading && cartItems && cartItems.length > 0
            ? "visible"
            : cardsInView
              ? "visible"
              : "hidden"
        }
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex flex-col gap-12 items-center justify-center lg:flex-row lg:gap-8 lg:items-start lg:px-28 px-4 w-full"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
          }}
          className="max-w-148 w-full"
        >
          <UserInfoCard
            initialValues={{
              fullName: user?.fullName,
              phone: user?.phone,
              email: user?.email,
            }}
            onInfoChange={setUserInfo}
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
          }}
          className="max-w-148 w-full"
        >
          <PaymentCard
            cardTitle="ชำระเงิน"
            dropdownOptions={[
              "โอนเงินผ่านธนาคาร",
              "บัตรเครดิต/เดบิต",
              // TODO: [PROMPTPAY-001] Enable PromptPay when backend API is ready
              // "PromptPay",
            ]}
            titleText="สรุปคำสั่งซื้อ"
            titleIcon={<FaPenClip />}
            courses={courses}
            price={formattedPrice}
            directPayment={BANK_INFO.directTransfer}
            promptPayment={BANK_INFO.promptPay}
            notationText="หมายเหตุ: หลังจากโอนเงินแล้ว กรุณาแนบสลิปการโอนและกรอกข้อมูลให้ครบถ้วน ทีมงานจะตรวจสอบและติดต่อกลับภายใน 24 ชั่วโมง"
            notationClassName="text-secondary text-sm"
            paymentMethodLabels={{
              directTransfer: "โอนเงินผ่านธนาคาร",
              card: "บัตรเครดิต/เดบิต",
              promptPay: "PromptPay",
            }}
            // TODO: [DISCOUNT-001] Enable discount feature when API is ready
            // discountTitleText="รหัสส่วนลด"
            // discountPlaceholder="กรอกโค้ดส่วนลด"
            // discountButtonText="ใช้งาน"
            // onApplyDiscount={handleApplyDiscount}
            orderId={orderId || ""}
            userInfo={userInfo || undefined}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </motion.div>
      </motion.div>

      {paymentSuccessData && (
        <PaymentConfirm
          open={isPaymentSuccessModalOpen}
          onClose={() => {
            setIsPaymentSuccessModalOpen(false);
            setPaymentSuccessData(null);
          }}
          data={paymentSuccessData}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
