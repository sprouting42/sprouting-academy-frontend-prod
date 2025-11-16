"use client";

import { PhoneIcon, UserIcon } from "@phosphor-icons/react";
import { MdEmail } from "react-icons/md";

import { Card } from "../common/card";
import { Input } from "../common/input";
import { Label } from "../common/label";

export const UserInfoCard = () => {
  return (
    <div>
      <Card
        variant="gradientDarkToLight"
        className="mt-3"
        cardContent={
          <div className="bg-linear-to-t from-background p-4 rounded-2xl to-background-light w-full">
            <h2 className="font-medium mb-6 text-[1.375rem]">ข้อมูลผู้สมัคร</h2>

            <Label
              text="ชื่อ-นามสกุล *"
              className="font-normal mb-2 mr-2 text-base"
              icon={
                <UserIcon size={24} color={"var(--foreground)"} weight="fill" />
              }
            />
            <Input
              placeholder="ชื่อ-นามสกุลของคุณ"
              className="w-full"
              variant="primary"
            />

            <Label
              text="เบอร์โทรศัพท์ *"
              className="font-normal mb-2 mr-2 mt-6 text-base"
              icon={
                <PhoneIcon
                  size={24}
                  color={"var(--foreground)"}
                  weight="fill"
                />
              }
            />
            <Input placeholder="08x-xxx-xxxx" className="w-full" />

            <Label
              text="อีเมล *"
              className="font-normal mb-2 mr-2 mt-6 text-base"
              icon={<MdEmail size={24} color={"var(--foreground)"} />}
            />
            <Input placeholder="name@example.com" className="w-full" />
          </div>
        }
      />
    </div>
  );
};
