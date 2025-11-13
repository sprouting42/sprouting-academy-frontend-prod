import Image from "next/image";
import { useState } from "react";

import { Button } from "../common";
import { CartDrawer } from "../drawer/cartDrawer";

export const ButtonCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cardData = [
    [
      {
        courseName: "Basic Course",
        price: "1000",
        date: "27, 29, 31 ตุลาคม 2568",
        totalTime: "5 ครั้ง 20 ชั่วโมง",
        classType: "LIVE Online",
      },
    ],
    [
      {
        courseName: "AI for Sale Course",
        price: "1000",
        date: "3 พฤศจิกายน 2568",
        totalTime: "5 ครั้ง 20 ชั่วโมง",
        classType: "LIVE Online",
      },
    ],
    [
      {
        courseName: "AI for Marketing Course",
        price: "1000",
        date: "4 พฤศจิกายน 2568",
        totalTime: "5 ครั้ง 20 ชั่วโมง",
        classType: "LIVE Online",
      },
    ],
    [
      {
        courseName: "AI for HR Course",
        price: "1000",
        date: "5 พฤศจิกายน 2568",
        totalTime: "5 ครั้ง 20 ชั่วโมง",
        classType: "LIVE Online",
      },
    ],
    [
      {
        courseName: "AI for Data Analysis Course",
        price: "1200",
        date: "7, 9, 10 พฤศจิกายน 2568",
        totalTime: "5 ครั้ง 20 ชั่วโมง",
        classType: "LIVE Online",
      },
    ],
    [
      {
        courseName: "AI for Business Automation Course",
        price: "1500",
        date: "11, 13, 15 พฤศจิกายน 2568",
        totalTime: "5 ครั้ง 20 ชั่วโมง",
        classType: "LIVE Online",
      },
    ],
  ];
  return (
    <div>
      <Button
        variant="iconOnly"
        size="lg"
        shape="square"
        className="h-8 lg:h-12 lg:w-12 w-8"
        icon={
          <Image
            src="/icons/shopping.svg"
            alt="Shopping cart"
            width={48}
            height={48}
            className="h-8 lg:h-12 lg:w-12 object-contain w-8"
          />
        }
        aria-label="Shopping cart"
        onClick={() => setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        className="h-full md:p-8 md:w-[700px] p-4 sm:p-6 sm:w-[600px] w-full xl:w-[953px]"
        content={cardData}
      />
    </div>
  );
};
