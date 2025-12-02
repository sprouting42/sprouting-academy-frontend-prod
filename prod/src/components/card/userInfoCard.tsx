"use client";

import { PhoneIcon } from "@phosphor-icons/react/dist/csr/Phone";
import { UserIcon } from "@phosphor-icons/react/dist/csr/User";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";

import { Card } from "../common/card";
import { Input } from "../common/input";
import { Label } from "../common/label";

export interface UserInfo {
  fullName: string;
  phone: string;
  email: string;
}

interface UserInfoCardProps {
  initialValues?: {
    fullName?: string;
    phone?: string | null;
    email?: string;
  };
  onInfoChange?: (info: UserInfo) => void;
}

export const UserInfoCard = ({
  initialValues,
  onInfoChange,
}: UserInfoCardProps) => {
  const [fullName, setFullName] = useState(initialValues?.fullName || "");
  const [phone, setPhone] = useState(initialValues?.phone || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const prevInitialValuesRef = useRef<string>("");
  const onInfoChangeRef = useRef(onInfoChange);

  useEffect(() => {
    onInfoChangeRef.current = onInfoChange;
  }, [onInfoChange]);

  useEffect(() => {
    if (initialValues) {
      const newFullName = initialValues.fullName || "";
      const newPhone = initialValues.phone || "";
      const newEmail = initialValues.email || "";
      const currentKey = `${newFullName}|${newPhone}|${newEmail}`;

      if (prevInitialValuesRef.current !== currentKey) {
        prevInitialValuesRef.current = currentKey;

        if (
          fullName !== newFullName ||
          phone !== newPhone ||
          email !== newEmail
        ) {
          setFullName(newFullName);
          setPhone(newPhone);
          setEmail(newEmail);
        }

        onInfoChangeRef.current?.({
          fullName: newFullName,
          phone: newPhone,
          email: newEmail,
        });
      }
    }
  }, [initialValues, fullName, phone, email]);

  const handleFullNameChange = useCallback(
    (value: string) => {
      setFullName(value);
      onInfoChange?.({
        fullName: value,
        phone,
        email,
      });
    },
    [phone, email, onInfoChange],
  );

  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhone(value);
      onInfoChange?.({
        fullName,
        phone: value,
        email,
      });
    },
    [fullName, email, onInfoChange],
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      onInfoChange?.({
        fullName,
        phone,
        email: value,
      });
    },
    [fullName, phone, onInfoChange],
  );

  return (
    <div className="max-w-148 w-full">
      <Card
        variant="gradientDarkToLight"
        className="w-full"
        cardContent={
          <div className="bg-linear-to-t flex flex-col from-background gap-6 items-start p-4 rounded-2xl to-background-light w-full">
            <h2 className="font-medium font-prompt text-foreground text-xl">
              ข้อมูลผู้สมัคร
            </h2>

            <div className="flex flex-col gap-4 items-start w-full">
              <div className="flex flex-col gap-2 items-start w-full">
                <Label
                  text="ชื่อ-นามสกุล *"
                  className="font-medium font-prompt leading-6 text-base text-foreground"
                  icon={
                    <UserIcon
                      size={24}
                      color={"var(--foreground)"}
                      weight="fill"
                    />
                  }
                />
                <Input
                  placeholder="ชื่อ-นามสกุลของคุณ"
                  className="w-full"
                  variant="primary"
                  value={fullName}
                  onChange={handleFullNameChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 items-start w-full">
                <Label
                  text="เบอร์โทรศัพท์ *"
                  className="font-medium font-prompt leading-6 text-base text-foreground"
                  icon={
                    <PhoneIcon
                      size={24}
                      color={"var(--foreground)"}
                      weight="fill"
                    />
                  }
                />
                <Input
                  placeholder="08x-xxx-xxxx"
                  className="w-full"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 items-start w-full">
                <Label
                  text="อีเมล *"
                  className="font-medium font-prompt leading-6 text-base text-foreground"
                  icon={<MdEmail size={24} color={"var(--foreground)"} />}
                />
                <Input
                  placeholder="name@example.com"
                  className="w-full"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
