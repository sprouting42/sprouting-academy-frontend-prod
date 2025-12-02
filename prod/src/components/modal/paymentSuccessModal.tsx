"use client";

import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { useRouter } from "next/navigation";

import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { PagePath } from "@/enum";

export interface PaymentConfirmData {
  amount: number;
  userName: string;
  itemName: string;
  orderNumber: string;
  dateTime: string;
}

interface PaymentConfirmProps {
  open: boolean;
  onClose: () => void;
  onBackToHome?: () => void;
  data: PaymentConfirmData;
}

export const PaymentConfirm = ({
  open,
  onClose,
  onBackToHome,
  data,
}: PaymentConfirmProps) => {
  const router = useRouter();
  const { amount, userName, itemName, orderNumber, dateTime } = data;
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("th-TH").format(value);
  };

  const handleBackToHome = () => {
    onClose();
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.push(PagePath.HOME);
    }
  };

  const transactionDetails = [
    { label: "ผู้ชำระเงิน", value: userName },
    { label: "ชื่อรายการ", value: itemName },
    { label: "หมายเลขสั่งซื้อ", value: orderNumber },
    { label: "วันที่-เวลา", value: dateTime },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      closeOnOverlayClick={false}
      lockScroll={true}
      className="max-w-160 w-full"
      contentClassName="border-2 border-foreground/10"
      overlayClassName="bg-black/50"
    >
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center justify-center relative">
          <h2 className="font-medium font-prompt text-2xl text-center text-secondary">
            ชำระเงินสำเร็จ
          </h2>
          <button
            onClick={onClose}
            className="absolute cursor-pointer hover:text-foreground p-1 right-0 text-foreground/70 transition-colors"
            aria-label="Close"
          >
            <XIcon className="h-7 w-7" />
          </button>
        </div>

        <div>
          <div className="flex flex-col gap-4 items-start text-left">
            <span className="font-prompt text-foreground/70 text-lg">
              จำนวนเงินที่ชำระ
            </span>
            <span className="font-prompt font-semibold text-2xl text-foreground">
              {formatAmount(amount)} บาท
            </span>
          </div>
        </div>

        <div className="bg-foreground/10 h-0.5" />

        <div className="flex flex-col gap-6">
          {transactionDetails.map((detail, index) => (
            <div key={index} className="flex items-start justify-between">
              <span className="font-prompt text-foreground/70 text-sm">
                {detail.label}
              </span>
              <span className="font-prompt max-w-[60%] text-foreground text-right text-sm">
                {detail.value}
              </span>
            </div>
          ))}
        </div>

        <div>
          <Button
            text="กลับสู่หน้าหลัก"
            variant="primaryGradientBorder"
            shape="rounded"
            className="w-full"
            onClick={handleBackToHome}
          />
        </div>
      </div>
    </Modal>
  );
};
