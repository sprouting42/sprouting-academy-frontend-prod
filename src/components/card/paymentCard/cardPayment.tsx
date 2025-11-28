import { CalendarIcon } from "@phosphor-icons/react/dist/csr/Calendar";
import { CiCreditCard1, CiCreditCard2 } from "react-icons/ci";

import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";

import { CardPaymentProps } from "./types";

export const CardPayment = ({}: CardPaymentProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Label text="บัตรเครดิต / เดบิต" icon={<CiCreditCard2 fontSize={18} />} />
      <div className="flex flex-col gap-4 rounded-3xl">
        <div className="flex flex-col gap-2">
          <Label text="หมายเลขบัตร" icon={<CiCreditCard2 fontSize={18} />} />

          <Input
            placeholder="XXXX XXXX XXXX XXXX"
            className="!p-0.5 rounded-3xl"
            inputClassName="rounded-3xl"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Label text="วันหมดอายุ" icon={<CalendarIcon size={18} />} />
            <Input
              placeholder="MM / YY"
              className="!p-0.5 rounded-3xl"
              inputClassName="rounded-3xl "
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label text="รหัสหลังบัตร" icon={<CiCreditCard1 fontSize={18} />} />
            <Input
              placeholder="123 / 1234"
              className="!p-0.5 rounded-3xl"
              inputClassName="rounded-3xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label text="ชื่อผู้ถือบัตร" icon={<CiCreditCard1 fontSize={18} />} />
          <Input
            placeholder="ชื่อ-นามสกุลผู้ถือบัตร"
            className="!p-0.5 rounded-3xl"
            inputClassName="rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};
