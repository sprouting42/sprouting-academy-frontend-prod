"use client";

import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Label } from "@/components/common/label";
import { Dropdown } from "@/components/dropdown/dropdown";

import { CardPayment } from "./cardPayment";
import { CourseSummary } from "./courseSummary";
import { DirectPayment } from "./directPayment";
import { PropmtPayment } from "./promtPayment";
import { PaymentCardProps } from "./types";

export const PaymentCard = ({
  cardTitle,
  titleText,
  titleIcon,
  dropdownOptions,
  courses,
  price,
  directPayment,
  promptPayment,
  notationText,
  notationClassName,
  paymentMethodLabels,
}: PaymentCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <Card
      variant="gradientDarkToLight"
      contentClassName="px-2 py-4 w-[592px] flex flex-col bg-linear-to-t from-background to-background-light
      rounded-2xl gap-6"
      className="mt-3 w-fit"
      cardContent={
        <>
          <Label text={cardTitle} className="font-medium text-[1.375rem]" />

          <CourseSummary
            titleText={titleText}
            titleIcon={titleIcon}
            courses={courses}
            price={price}
          />

          <Dropdown
            icon={<FaCreditCard />}
            title="วิธีการชำระเงิน"
            required={false}
            options={dropdownOptions}
            placeholder="เลือกช่องทางการชำระเงิน"
            value={selectedValue}
            onChange={(value: string) => setSelectedValue(value)}
            className="flex flex-col gap-2 rounded-3xl"
            variant="primary"
          />

          {selectedValue === paymentMethodLabels.directTransfer && (
            <DirectPayment
              directPayment={directPayment}
              notationText={notationText}
              notationClassName={notationClassName}
            />
          )}
          {selectedValue === paymentMethodLabels.card && (
            <CardPayment
              notationText={notationText}
              notationClassName={notationClassName}
            />
          )}
          {selectedValue === paymentMethodLabels.promptPay && (
            <PropmtPayment
              promptPayment={promptPayment}
              notationText={notationText}
              notationClassName={notationClassName}
            />
          )}

          {selectedValue !== "" && (
            <div className="[&>div]:w-full w-full">
              <Button
                text="ยืนยันการชำระเงิน"
                variant="primaryGradientBorder"
                size="sm"
                shape="rounded"
              />
            </div>
          )}
        </>
      }
    />
  );
};
