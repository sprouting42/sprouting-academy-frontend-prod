import { RiCoupon2Line } from "react-icons/ri";

import { Acordion } from "@/components/common/acordion";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Input } from "@/components/common/input";

import { DiscountPartProps } from "./types";

export const DiscountPart = ({
  value,
  onChange,
  onApply,
  discountTitleText,
  placeholder,
  buttonText,
}: DiscountPartProps) => {
  const handleApplyClick = () => {
    if (onApply) {
      onApply(value);
    }
  };

  return (
    <Acordion
      titleText={discountTitleText}
      icon={<RiCoupon2Line />}
      body={
        <Card
          variant="gradientDarkToLight"
          className="px-0.4 py-0.5 rounded-full"
          contentClassName="rounded-full bg-background p-3"
          cardContent={
            <div className="relative w-full">
              <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-background! focus-within:from-transparent! focus-within:to-transparent! from-transparent! hover:from-transparent! hover:to-transparent! p-0! to-transparent! w-full"
                inputClassName="pr-28"
              />
              <div className="-translate-y-1/2 absolute right-0 top-1/2">
                <Button
                  text={buttonText}
                  variant="primary"
                  size="sm"
                  shape="rounded"
                  onClick={handleApplyClick}
                />
              </div>
            </div>
          }
        />
      }
    />
  );
};
