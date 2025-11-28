import { BankIcon } from "@phosphor-icons/react/dist/csr/Bank";
import { FileArrowUpIcon } from "@phosphor-icons/react/dist/csr/FileArrowUp";
import Image from "next/image";

import { Card } from "@/components/common/card";
import { FileInput } from "@/components/common/input";
import { Label } from "@/components/common/label";

import { Notation } from "./notation";
import { PromptPaymentProps } from "./types";

export const PropmtPayment = ({
  promptPayment,
  notationText,
  notationClassName,
}: PromptPaymentProps) => {
  const { qrImage, bankName, accountNumber, accountName } = promptPayment;

  return (
    <div className="flex flex-col gap-4">
      <Label text="โอนเงินผ่าน PromptPay" icon={<BankIcon />} />
      <Card
        variant="gradientDarkToLight"
        className="p-0.5 rounded-2xl"
        contentClassName="rounded-2xl bg-background px-6 py-5"
        cardContent={
          <>
            <div className="flex flex-col gap-4 items-center">
              <div className="mb-4">
                <Image
                  src={qrImage}
                  alt="PromptPay QR Code"
                  width={166}
                  height={166}
                  className="h-44 object-contain w-44"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span>ธนาคาร:</span>
                <span>{bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>เลขบัญชี:</span>
                <span>{accountNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ชื่อบัญชี:</span>
                <span>{accountName}</span>
              </div>
            </div>
          </>
        }
      />
      <div className="flex flex-col gap-4">
        <h1 className="flex gap-2 items-center">
          <FileArrowUpIcon size={18} />
          แนบสลิปการโอน
        </h1>
        <FileInput
          className="p-0.5! w-full"
          inputClassName=""
          accept="image/*"
          onChange={(file) => console.log(file)}
        />
      </div>
      <Notation
        notationText={notationText}
        notationClassName={notationClassName}
      />
    </div>
  );
};
