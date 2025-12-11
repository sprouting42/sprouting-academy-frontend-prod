"use client";

import { CalendarIcon } from "@phosphor-icons/react/dist/csr/Calendar";
import { CertificateIcon } from "@phosphor-icons/react/dist/csr/Certificate";
import { PhoneIcon } from "@phosphor-icons/react/dist/csr/Phone";
import { FaEnvelope } from "react-icons/fa";
import { TbPencilMinus } from "react-icons/tb";

import { UserAvatar } from "@/components/common";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";
import { formatJoinDate } from "@/utils/dateFormatter";

interface ProfileCardProps {
  avatarUrl?: string | null;
  fullName: string;
  nickname?: string | null;
  email: string;
  phone?: string | null;
  certificatesCount?: number;
  enrolledCoursesCount?: number;
  joinDate?: string | Date;
  onEditClick?: () => void;
  className?: string;
}

export const ProfileCard = ({
  avatarUrl,
  fullName,
  nickname,
  email,
  phone,
  certificatesCount = 0,
  enrolledCoursesCount = 0,
  joinDate,
  className,
  onEditClick,
}: ProfileCardProps) => {
  const displayName = nickname || fullName.split(" ")[0] || fullName;
  const getCertificatesText = () => {
    if (certificatesCount === 0 && enrolledCoursesCount === 0) {
      return "No Certificates or Enrolled Courses";
    }

    const certificateText =
      certificatesCount === 1 ? "Certificate" : "Certificates";
    const courseText =
      enrolledCoursesCount === 1 ? "Enrolled Course" : "Enrolled Courses";

    return `${certificatesCount} ${certificateText} & ${enrolledCoursesCount} ${courseText}`;
  };

  const certificatesText = getCertificatesText();

  const formattedJoinDate = formatJoinDate(joinDate);
  return (
    <div className={cn("relative w-full", className)}>
      <Card
        variant="gradientDarkToLight"
        className="h-full w-full"
        contentClassName={cn(
          "relative bg-linear-to-b from-background-light to-background rounded-2xl overflow-hidden",
        )}
        cardContent={
          <>
            <div className="flex flex-col gap-5 md:gap-6 md:p-8 p-5 relative z-10">
              <div className="flex justify-end md:absolute md:right-8 md:top-8">
                <Button
                  text="Edit"
                  icon={
                    <TbPencilMinus className="h-4 md:h-5 md:w-5 text-secondary w-4" />
                  }
                  variant="primaryGradientBorder"
                  size="sm"
                  shape="rounded"
                  onClick={onEditClick}
                  className="md:text-sm py-1.5 text-xs"
                />
              </div>

              <div className="flex flex-col gap-5 md:flex-row md:gap-6 md:items-center">
                <div className="flex justify-center md:justify-start shrink-0">
                  <UserAvatar avatarUrl={avatarUrl} size="xl" priority />
                </div>

                <div className="flex flex-col gap-2 items-center md:items-start md:text-left text-center w-full">
                  <div className="flex flex-row flex-wrap gap-3 items-center justify-center md:justify-start">
                    <h2 className="font-bold font-prompt lg:text-xl md:text-lg text-base text-foreground">
                      {displayName}
                    </h2>
                    <Badge
                      text="Premium"
                      variant="premium"
                      shape="rounded"
                      size="md"
                      className="px-2 py-1 shrink-0"
                    />
                  </div>

                  <p className="font-normal font-prompt lg:text-base md:text-sm text-foreground/80 text-sm">
                    {fullName}
                  </p>

                  <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
                    <CertificateIcon
                      className="h-5 md:h-6 md:w-6 shrink-0 text-secondary w-5"
                      weight="fill"
                    />
                    <span className="font-normal font-prompt lg:text-sm md:text-sm text-foreground/80 text-xs">
                      {certificatesText}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-foreground/10 border-t pt-5">
                <div className="flex flex-col gap-3 items-center justify-center md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-3 md:justify-start">
                  {phone && (
                    <div className="flex flex-row gap-2 items-center">
                      <PhoneIcon
                        className="h-5 md:h-5 md:w-5 shrink-0 text-secondary w-5"
                        weight="fill"
                      />
                      <span className="font-normal font-prompt lg:text-sm md:text-sm text-foreground text-xs">
                        {phone}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-row gap-2 items-center">
                    <FaEnvelope className="h-5 md:h-5 md:w-5 shrink-0 text-secondary w-5" />
                    <span className="break-all font-normal font-prompt lg:text-sm md:text-sm text-foreground text-xs">
                      {email}
                    </span>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <CalendarIcon
                      className="h-5 md:h-5 md:w-5 shrink-0 text-secondary w-5"
                      weight="fill"
                    />
                    <span className="font-normal font-prompt lg:text-sm md:text-sm text-foreground text-xs">
                      {formattedJoinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};
