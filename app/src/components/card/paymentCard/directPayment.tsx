import { BankIcon } from "@phosphor-icons/react/dist/csr/Bank";
import { FileArrowUpIcon } from "@phosphor-icons/react/dist/csr/FileArrowUp";

import { Card } from "@/components/common/card";
import { FileInput } from "@/components/common/input";

import { Notation } from "./notation";
import { DirectPaymentProps } from "./types";

export const DirectPayment = ({
  directPayment,
  notationText,
  notationClassName,
}: DirectPaymentProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="flex gap-2 items-center">
        <BankIcon size={18} />
        โอนผ่านบัญชีธนาคาร
      </h1>
      <Card
        variant="gradientDarkToLight"
        className="p-0.5 rounded-2xl"
        contentClassName="rounded-2xl bg-background px-6 py-5"
        cardContent={
          <div className="flex flex-col gap-4 text-base">
            <div className="flex items-center justify-between">
              <span>ธนาคาร:</span>
              <span>{directPayment.bankName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>เลขบัญชี:</span>
              <span>{directPayment.accountNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ชื่อบัญชี:</span>
              <span>{directPayment.accountName}</span>
            </div>
          </div>
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
