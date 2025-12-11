import Image from "next/image";

import { Card } from "@/components/common/card";

interface CoursePlannerCardProps {
  title?: string;
  name: string;
  role: string;
  info: string;
  profileImage: string;
}

export const CoursePlannerCard = ({
  name,
  role,
  info,
  profileImage,
}: CoursePlannerCardProps) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Card
        variant="gradientDarkToLight"
        className="w-full"
        cardContent={
          <div className="bg-linear-to-b flex flex-col from-background-light gap-6 md:flex-row p-4 rounded-2xl to-background w-full">
            <div className="aspect-3/2 md:h-[280px] md:w-[420px] overflow-hidden relative rounded-lg shrink-0 w-full">
              <Image
                src={profileImage || "/placeholder.png"}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <h3 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-primary text-xl">
                {name}
              </h3>
              <p className="font-prompt text-foreground/75 text-sm">{role}</p>
              <p className="font-prompt text-base text-foreground whitespace-pre-line">
                {info}
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
};
