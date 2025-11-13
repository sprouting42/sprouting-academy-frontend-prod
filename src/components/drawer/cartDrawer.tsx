import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useMemo, useState } from "react";
import { RiCoupon2Line } from "react-icons/ri";

import { Input } from "@/components/common/input";
import { PagePath } from "@/enum/menu";

import { CheckboxInput } from "../common";
import { Acordion } from "../common/acordion";
import { Button } from "../common/button";
import { Drawer } from "../common/drawer";

interface CourseItem {
  courseName: string;
  price: string;
  date: string;
  totalTime: string;
  classType: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content?: React.ReactNode | CourseItem[][];
  className?: string;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  content,
  className,
}: CartDrawerProps) => {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const cardData = content as CourseItem[][] | undefined;

  const handleCheckChange = (index: number, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: checked,
    }));
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    if (Array.isArray(cardData)) {
      cardData.forEach((courseGroup, groupIdx) => {
        if (checkedItems[groupIdx]) {
          courseGroup.forEach((course) => {
            total += parseInt(course.price) || 0;
          });
        }
      });
    }
    return total;
  }, [cardData, checkedItems]);

  const discountPercent = useMemo(() => {
    const selectedCount = Object.values(checkedItems).filter(Boolean).length;
    if (selectedCount >= 3) return 20;
    if (selectedCount === 2) return 10;
    return 0;
  }, [checkedItems]);

  const discountAmount = useMemo(
    () => Math.floor((totalPrice * discountPercent) / 100),
    [totalPrice, discountPercent],
  );

  const finalPrice = useMemo(
    () => totalPrice - discountAmount,
    [totalPrice, discountAmount],
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      content={
        <div className="2xl:max-h-220 lg:max-h-160 max-h-320 md:max-h-290 overflow-y-auto">
          <div className="flex">
            <Image
              src="/icons/shopping.svg"
              alt="Shopping cart"
              width={48}
              height={48}
              className="h-8 lg:h-12 lg:w-12 object-contain w-8"
            />
            <h1 className="font-bold font-prompt lg:text-[22px] pl-4 self-center text-[22px] text-secondary">
              ตะกร้าสินค้า
            </h1>
          </div>
          <div className="flex flex-col gap-6 pt-18">
            {Array.isArray(cardData) &&
              cardData.map((courseGroup, groupIdx) =>
                courseGroup.map((course, courseIdx) => {
                  const uniqueKey = `${groupIdx}-${courseIdx}`;
                  return (
                    <div key={uniqueKey}>
                      <div className="flex flex-row justify-between">
                        <CheckboxInput
                          content={course.courseName}
                          checked={checkedItems[groupIdx] || false}
                          onChange={(checked) =>
                            handleCheckChange(groupIdx, checked)
                          }
                          className="font-bold font-prompt text-[22px] text-foreground"
                        />
                        <p className="font-prompt text-[22px] text-foreground">
                          {course.price} บาท
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 pt-4">
                        <div className="flex flex-row gap-4">
                          <p className="font-prompt text-[16px] text-foreground/50">
                            วันที่เริ่มเรียน:{" "}
                          </p>
                          <p className="font-prompt text-[16px] text-foreground">
                            {course.date}
                          </p>
                        </div>
                        <p className="font-prompt text-[16px] text-foreground/50">
                          รวม:{" "}
                          <span className="font-prompt text-[16px] text-foreground">
                            {course.totalTime}
                          </span>
                        </p>
                        <p className="font-prompt text-[16px] text-foreground/50">
                          รูปแบบการเรียน:{" "}
                          <span className="font-prompt text-[16px] text-foreground">
                            {course.classType}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                }),
              )}
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <div className="flex flex-row justify-between">
              <p className="font-prompt text-[16px] text-foreground">
                ราคาสินค้ารวม (ก่อนส่วนลด)
              </p>
              <div className="flex flex-col items-end justify-end">
                <p className="font-prompt text-[16px] text-foreground">
                  {totalPrice.toLocaleString()} บาท
                </p>
                {discountPercent > 0 && (
                  <div className="font-prompt space-y-1 text-blue-400 text-sm">
                    {discountPercent === 10 && (
                      <>
                        <p className="text-[16px] text-secondary">
                          🗸 สุดคุ้ม! เพิ่มอีก 1 คอร์ส รับส่วนลด 20%
                        </p>
                        <p className="bg-clip-text bg-linear-to-r from-primary text-[16px] text-end text-transparent to-primary via-secondary">
                          (ลด 10% สำหรับ 2 คอร์สปัจจุบัน)
                        </p>
                      </>
                    )}
                    {discountPercent === 20 && (
                      <>
                        <p className="text-[16px] text-secondary">
                          🗸 ดีลที่ดีที่สุด! ส่วนลด 3 คอร์ส ถูกใช้แล้ว
                        </p>
                        <p className="bg-clip-text bg-linear-to-r from-primary text-[16px] text-end text-transparent to-primary via-secondary">
                          (ลด 20% สำหรับ{" "}
                          {Object.values(checkedItems).filter(Boolean).length}{" "}
                          คอร์สปัจจุบัน)
                        </p>
                      </>
                    )}
                  </div>
                )}
                {discountPercent === 0 &&
                  Object.values(checkedItems).filter(Boolean).length === 1 && (
                    <div className="font-prompt space-y-1 text-blue-400 text-sm">
                      <p className="text-[16px] text-secondary">
                        🗸 เพิ่มอีก 1 คอร์ส เพื่อรับส่วนลด 10%
                      </p>
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-prompt text-[16px] text-foreground">
                ส่วนลดแพ็กเกจ {discountPercent > 0 && `(${discountPercent}%)`}
              </p>
              <p className="font-prompt text-[16px] text-foreground">
                {discountAmount > 0
                  ? `${discountAmount.toLocaleString()}`
                  : "0"}{" "}
                บาท
              </p>
            </div>

            <div>
              <Acordion
                icon={<RiCoupon2Line />}
                cardVariant="transparent"
                body={
                  <div className="flex flex-row justify-between w-full">
                    <div className="w-full">
                      <Input
                        className="bg-linear-to-b from-background text-[16px]"
                        placeholder="Enter coupon code"
                      />
                    </div>
                    <Button
                      variant="primary"
                      shape="rounded"
                      size="md"
                      text="Apply"
                    />
                  </div>
                }
                defaultOpen={false}
                titleText={
                  <div>
                    <h1>คูปองส่วนลด</h1>
                  </div>
                }
              />
            </div>

            <div></div>

            <div className="border-foreground/25 border-t flex flex-row justify-between py-4">
              <p className="font-bold font-prompt text-foreground text-lg">
                ยอดรวมสุทธิที่ต้องชำระ
              </p>
              <p className="font-bold font-prompt text-foreground text-lg">
                {finalPrice.toLocaleString()} บาท
              </p>
            </div>
          </div>
          <div className="flex flex-row h-fit items-center justify-between pt-48">
            <Button
              variant="secondaryGradientBorder"
              shape="rounded"
              size="md"
              text="ดูรายละเอียดขอคอร์สทั้งหมด"
              className="w-72 xl:w-103"
            />

            <Button
              variant="primaryGradientBorder"
              shape="rounded"
              size="md"
              text="ชำระเงิน"
              className="w-72 xl:w-103"
              onClick={() => {
                const redirectUrl = `${PagePath.CHECKOUT}?from=cart`;
                router.push(
                  `${PagePath.LOGIN}?redirect=${encodeURIComponent(redirectUrl)}`,
                );
                onClose();
              }}
            />
          </div>
        </div>
      }
    />
  );
};
