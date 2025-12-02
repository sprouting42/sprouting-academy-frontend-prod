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
      className="lg:text-base text-sm"
      body={
        <Card
          variant="gradientDarkToLight"
          className="p-0.25 rounded-full"
          contentClassName="h-12 lg:h-16.5 rounded-full bg-background"
          cardContent={
            <div className="relative w-full">
              <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-background! focus-within:from-transparent! focus-within:to-transparent! from-transparent! hover:from-transparent! hover:to-transparent! p-0! to-transparent! w-full"
                inputClassName="h-12 lg:h-16.5 lg:text-base pr-28 text-sm"
              />
              <div className="absolute h-fit inset-y-0 my-auto right-3">
                <Button
                  text={buttonText}
                  variant="primary"
                  size="sm"
                  shape="rounded"
                  onClick={handleApplyClick}
                  className="h-8 lg:h-10.5 lg:text-base text-sm"
                />
              </div>
            </div>
          }
        />
      }
    />
  );
};
