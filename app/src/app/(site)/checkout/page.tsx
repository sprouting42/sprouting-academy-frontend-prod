"use client";

import { SparkleIcon } from "@phosphor-icons/react/dist/csr/Sparkle";
import { FaBook } from "react-icons/fa6";

import { UserInfoCard } from "@/components/card";
import { PaymentCard } from "@/components/card/paymentCard/paymentCard";
import { Badge } from "@/components/common/badge";

const CheckoutPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary mt-56 px-28 text-[4rem] text-transparent to-primary">
          สมัครเรียน AI Automation
        </h1>
        <p className="font-normal font-prompt mt-4 text-[1.375rem]">
          กรอกข้อมูลและชำระเงินเพื่อเริ่มต้นการเรียนรู้
        </p>
        <Badge
          variant="transparentSecondary"
          size="sm"
          className="mt-8"
          text="ปลอดภัย 100% การันตีความเป็นส่วนตัว"
          icon={<SparkleIcon size={16} color="#13b499" weight="bold" />}
        />
      </div>

      <div className="flex flex-row gap-8 mt-16 px-28">
        <div className="w-1/2">
          <UserInfoCard />
        </div>

        <div className="mb-50.5 w-1/2">
          <PaymentCard
            cardTitle="ชำระเงิน"
            dropdownOptions={[
              "โอนเงินผ่านธนาคาร",
              "บัตรเครดิต/เดบิต",
              "พร้อมเพย์",
            ]}
            titleText="รายละเอียดคอร์ส"
            titleIcon={<FaBook />}
            courses={[
              { course: "React Fundamentals", startDate: "2025-01-15" },
            ]}
            price="3,500 บาท"
            directPayment={{
              bankName: "ธนาคารกสิกรไทย",
              accountNumber: "123-4-56789-0",
              accountName: "บริษัท XXX จำกัด",
            }}
            promptPayment={{
              qrImage: "/images/qr-code.png",
              bankName: "ธนาคารกสิกรไทย",
              accountNumber: "0812345678",
              accountName: "บริษัท XXX จำกัด",
            }}
            notationText="กรุณาตรวจสอบข้อมูลก่อนชำระเงิน"
            notationClassName="text-gray-600 text-sm"
            paymentMethodLabels={{
              directTransfer: "โอนเงินผ่านธนาคาร",
              card: "บัตรเครดิต/เดบิต",
              promptPay: "พร้อมเพย์",
            }}
            discountTitleText="รหัสส่วนลด"
            discountPlaceholder="กรอกโค้ดส่วนลด"
            discountButtonText="ใช้งาน"
            onApplyDiscount={(code) => {
              if (process.env.NODE_ENV === "development") {
                console.log("Coupon:", code);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
