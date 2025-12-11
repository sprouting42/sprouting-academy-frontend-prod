import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PiTrashSimpleBold } from "react-icons/pi";

import { PagePath } from "@/enum/menu";
import { useGetCart, useRemoveItemFromCart } from "@/hooks/useCart";
import { CartItem } from "@/store/cartStore";
import { isAuthenticated } from "@/utils/auth";
import { formatDateShort } from "@/utils/dateFormatter";

import { DiscountPart } from "../card/paymentCard/discountPart";
import { CheckboxInput } from "../common";
import { Acordion } from "../common/acordion";
import { Button } from "../common/button";
import { Drawer } from "../common/drawer";

const COUPON_CODES: Record<string, number> = {
  TEST100: 100,
  TEST500: 500,
  TEST1000: 1000,
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CartDrawer = ({ isOpen, onClose, className }: CartDrawerProps) => {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const { data: cardData = [] } = useGetCart();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveItemFromCart();

  const handleCheckChange = (index: number, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: checked,
    }));
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    if (Array.isArray(cardData)) {
      cardData.forEach((item, idx) => {
        if (checkedItems[idx]) {
          total += item.price || 0;
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
    () => Math.max(0, totalPrice - discountAmount - couponDiscount),
    [totalPrice, discountAmount, couponDiscount],
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => {
        setCouponCode("");
        setCouponDiscount(0);
        setCheckedItems({});
        onClose();
      }}
      className={className}
      content={
        <div className="box-border flex flex-col h-full overflow-x-hidden overflow-y-auto">
          <div className="flex">
            <Image
              src="/icons/shopping.svg"
              alt="Shopping cart"
              width={48}
              height={48}
              className="h-8 lg:h-12 lg:w-12 object-contain w-8"
            />
            <h1 className="font-bold font-prompt lg:text-xl pl-4 self-center text-lg text-secondary">
              ตะกร้าสินค้า
            </h1>
          </div>
          <div className="flex flex-col gap-4 lg:gap-8 lg:pt-18 pt-12">
            {Array.isArray(cardData) &&
              cardData.map((item, idx) => {
                const course: CartItem = item;
                return (
                  <div key={course.id}>
                    <div className="flex flex-row justify-between">
                      <CheckboxInput
                        content={course.courseName}
                        checked={checkedItems[idx] || false}
                        onChange={(checked) => handleCheckChange(idx, checked)}
                        className="font-bold font-prompt lg:text-xl text-foreground text-lg"
                        checkboxClassName="shrink-0"
                      />

                      <p className="font-prompt lg:text-xl text-foreground text-lg">
                        {course.price.toLocaleString()} บาท
                      </p>
                    </div>
                    <div className="flex flex-row justify-between pt-2">
                      <div className="w-74">
                        <Acordion
                          cardVariant="transparent"
                          body={
                            <div className="flex flex-col w-full">
                              <div className="flex flex-col gap-2 items-start">
                                <p className="font-prompt lg:text-base text-foreground/50 text-sm">
                                  รวม:{" "}
                                  <span className="font-prompt lg:text-base text-foreground text-sm">
                                    {course.totalTime}
                                  </span>
                                </p>
                                <p className="font-prompt lg:text-base text-foreground/50 text-sm">
                                  รูปแบบการเรียน:{" "}
                                  <span className="font-prompt lg:text-base text-foreground text-sm">
                                    {course.classType}
                                  </span>
                                </p>
                              </div>
                            </div>
                          }
                          defaultOpen={false}
                          titleText={
                            <div className="flex flex-row gap-4">
                              <p className="font-prompt lg:text-base text-foreground/50 text-sm whitespace-nowrap">
                                วันเริ่มเรียน:{" "}
                              </p>
                              <p className="font-prompt lg:text-base text-foreground text-sm">
                                {formatDateShort(course.date)}
                              </p>
                            </div>
                          }
                        />
                      </div>
                      <Button
                        variant="iconOnly"
                        size="sm"
                        icon={
                          <PiTrashSimpleBold className="h-6 lg:h-8 lg:w-8 w-6" />
                        }
                        aria-label="Remove item"
                        onClick={() => {
                          removeItem(item.id);
                        }}
                        className="text-red-500"
                        disabled={isRemoving}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <div className="flex flex-row justify-between">
              <p className="font-prompt lg:text-base text-foreground text-sm">
                ราคาสินค้ารวม (ก่อนส่วนลด)
              </p>
              <div className="flex flex-col items-end justify-end">
                <p className="font-prompt lg:text-base shrink-0 text-foreground text-sm whitespace-nowrap">
                  {totalPrice.toLocaleString()} บาท
                </p>
                {discountPercent > 0 && (
                  <div className="font-prompt space-y-1 text-blue-400 text-sm">
                    {discountPercent === 10 && (
                      <>
                        <p className="lg:text-base text-secondary text-sm">
                          🗸 สุดคุ้ม! เพิ่มอีก 1 คอร์ส รับส่วนลด 20%
                        </p>
                        <p className="bg-clip-text bg-linear-to-r from-primary lg:text-base text-end text-sm text-transparent to-primary via-secondary">
                          (ลด 10% สำหรับ 2 คอร์สปัจจุบัน)
                        </p>
                      </>
                    )}
                    {discountPercent === 20 && (
                      <>
                        <p className="lg:text-base text-secondary text-sm">
                          🗸 ดีลที่ดีที่สุด! ส่วนลด 3 คอร์ส ถูกใช้แล้ว
                        </p>
                        <p className="bg-clip-text bg-linear-to-r from-primary lg:text-base text-end text-sm text-transparent to-primary via-secondary">
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
                      <p className="lg:text-base text-secondary text-sm">
                        🗸 เพิ่มอีก 1 คอร์ส เพื่อรับส่วนลด 10%
                      </p>
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-prompt lg:text-base text-foreground text-sm">
                ส่วนลดแพ็กเกจ {discountPercent > 0 && `(${discountPercent}%)`}
              </p>
              <p className="font-prompt lg:text-base shrink-0 text-foreground text-sm whitespace-nowrap">
                {discountAmount > 0
                  ? `-${discountAmount.toLocaleString()}`
                  : "0"}{" "}
                บาท
              </p>
            </div>

            {couponDiscount > 0 && (
              <div className="flex flex-row justify-between">
                <p className="font-prompt lg:text-base text-foreground text-sm">
                  ส่วนลดคูปอง
                </p>
                <p className="font-prompt lg:text-base text-foreground text-sm">
                  -{couponDiscount.toLocaleString()} บาท
                </p>
              </div>
            )}

            <div>
              <div className="flex flex-row justify-between w-full">
                <div className="w-full">
                  <DiscountPart
                    discountTitleText="คูปองส่วนลด"
                    placeholder="Enter coupon code"
                    buttonText="Apply"
                    value={couponCode}
                    onChange={setCouponCode}
                    onApply={(code) => {
                      const upperCode = code.toUpperCase().trim();
                      const discount = COUPON_CODES[upperCode];

                      if (discount) {
                        setCouponDiscount(discount);
                      } else {
                        setCouponDiscount(0);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div></div>

            <div className="border-foreground/25 border-t flex flex-row justify-between py-4">
              <p className="font-bold font-prompt lg:text-lg text-base text-foreground">
                ยอดรวมสุทธิที่ต้องชำระ
              </p>
              <p className="font-bold font-prompt lg:text-lg shrink-0 text-base text-foreground whitespace-nowrap">
                {finalPrice.toLocaleString()} บาท
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-fit items-center justify-between lg:flex-row mt-auto pb-6">
            <Button
              variant="secondaryGradientBorder"
              shape="rounded"
              size="md"
              text="ดูรายละเอียดขอคอร์สทั้งหมด"
              className="max-w-72 w-full xl:max-w-103"
            />

            <Button
              variant="primaryGradientBorder"
              shape="rounded"
              size="md"
              text="ชำระเงิน"
              className="max-w-72 w-full xl:max-w-103"
              onClick={() => {
                if (isAuthenticated()) {
                  router.push(PagePath.CHECKOUT);
                  onClose();
                } else {
                  const redirectUrl = `${PagePath.CHECKOUT}?from=cart`;
                  router.push(
                    `${PagePath.LOGIN}?redirect=${encodeURIComponent(redirectUrl)}`,
                  );
                  onClose();
                }
              }}
            />
          </div>
        </div>
      }
    />
  );
};
