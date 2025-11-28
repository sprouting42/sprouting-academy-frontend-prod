"use client";

import { CalendarIcon } from "@phosphor-icons/react/dist/csr/Calendar";
import { CertificateIcon } from "@phosphor-icons/react/dist/csr/Certificate";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/csr/Envelope";
import { PhoneIcon } from "@phosphor-icons/react/dist/csr/Phone";

import { UserAvatar } from "@/components/common";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface ProfileCardProps {
  avatarUrl?: string | null;
  fullName: string;
  email: string;
  phone?: string | null;
  onEditClick?: () => void;
  className?: string;
}

export const ProfileCard = ({
  avatarUrl,
  fullName,
  email,
  phone,
  className,
  onEditClick,
}: ProfileCardProps) => {
  return (
    <div className={cn("relative w-full lg:h-86", className)}>
      <Card
        variant="gradientDarkToLight"
        className="h-full w-full"
        contentClassName={cn(
          "relative bg-linear-to-b from-background-light to-background rounded-2xl overflow-hidden",
        )}
        cardContent={
          <>
            <div className="absolute bg-secondary/50 blur-3xl h-40 lg:h-53 lg:w-59.25 profile-blur-right rounded-full w-40 z-0" />
            <div className="absolute bg-secondary/50 blur-3xl h-32 lg:h-29.25 lg:w-67 profile-blur-left rounded-full w-48 z-0" />

            <div className="flex flex-col gap-6 lg:gap-0 lg:pb-0 lg:pt-25 lg:px-11 md:gap-6 md:pb-6 md:pt-6 md:px-6 pb-6 pt-6 px-4 relative z-10">
              <div className="flex justify-end lg:right-11 lg:top-7 mb-4 md:absolute md:mb-0 md:right-6 md:top-6">
                <Button
                  text="Edit profile"
                  variant="primaryGradientBorder"
                  size="sm"
                  shape="square"
                  onClick={onEditClick}
                  className="md:text-base min-h-11 text-sm"
                />
              </div>

              <div className="flex flex-col gap-6 lg:gap-7 md:flex-row md:gap-6 md:items-start">
                <div className="flex justify-center md:justify-start shrink-0">
                  <UserAvatar avatarUrl={avatarUrl} size="xl" />
                </div>

                <div className="flex flex-1 flex-col gap-6 items-center lg:gap-8 md:gap-6 md:items-start md:text-left text-center w-full">
                  <div className="flex flex-col gap-3 items-center lg:gap-11 md:flex-row md:gap-6 md:items-center w-full">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                      <h2 className="font-bold font-prompt leading-8 text-secondary text-xl">
                        {fullName.split(" ")[0] || fullName}
                      </h2>
                      <p className="font-normal font-prompt leading-7 text-base text-foreground">
                        {fullName}
                      </p>
                    </div>
                    <Badge
                      text="Premium"
                      variant="premium"
                      shape="rounded"
                      size="lg"
                      className="px-4 py-3 shrink-0"
                    />
                  </div>

                  <div className="flex flex-col gap-4 lg:gap-11 md:flex-row md:gap-6 md:items-center w-full">
                    <div className="flex flex-col gap-4 lg:gap-6 md:gap-5 md:w-auto w-full">
                      <div className="flex flex-row gap-3 items-center justify-center md:justify-start">
                        <EnvelopeIcon
                          size={24}
                          className="lg:h-7 lg:w-7 md:h-6 md:w-6 shrink-0 text-secondary"
                          weight="regular"
                        />
                        <span className="font-normal font-prompt leading-7 text-base text-foreground wrap-break-word">
                          {email}
                        </span>
                      </div>

                      <div className="flex flex-row gap-3 items-start justify-center md:justify-start">
                        <CalendarIcon
                          size={24}
                          className="lg:h-7 lg:w-7 md:h-6 md:w-6 shrink-0 text-secondary"
                          weight="regular"
                        />
                        <span className="font-normal font-prompt leading-7 text-base text-foreground">
                          Joined October 2025
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:gap-6 md:gap-5 md:w-auto w-full">
                      <div className="flex flex-row gap-3 items-start justify-center md:justify-start">
                        <CertificateIcon
                          size={24}
                          className="lg:h-7 lg:w-7 md:h-6 md:w-6 shrink-0 text-secondary"
                          weight="regular"
                        />
                        <span className="font-normal font-prompt leading-7 text-base text-foreground">
                          5 Certificates
                        </span>
                      </div>

                      {phone && (
                        <div className="flex flex-row gap-3 items-start justify-center md:justify-start">
                          <PhoneIcon
                            size={24}
                            className="lg:h-7 lg:w-7 md:h-6 md:w-6 shrink-0 text-secondary"
                            weight="regular"
                          />
                          <span className="font-normal font-prompt leading-7 text-base text-foreground wrap-break-word">
                            {phone}
                          </span>
                        </div>
                      )}
                    </div>
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
