import { CheckCircleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { ComponentProps } from "react";

import { Acordion } from "@/components/common/acordion";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

import { CourseDetail } from "./courseDetail";

interface CourseCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  price: string;
  dateBadgeText: string;
  imageBadgeText: string;
  courseDetail?: ComponentProps<typeof CourseDetail>;
  classNameTitle?: string;
}
const variantTextStyle = {
  primary: "bg-clip-text bg-gradient-to-l from-primary to-secondary",
  secondary: "text-sm font-normal font-prompt text-foreground",
};

export const CourseCard = ({
  src,
  alt,
  title,
  description,
  bulletPoints,
  price,
  dateBadgeText,
  imageBadgeText,
  courseDetail,
  classNameTitle,
}: CourseCardProps) => {
  return (
    <Card
      variant="gradientLightToDark"
      contentClassName="p-4 max-w-[384px] lg:min-h-228.5 flex flex-col bg-linear-to-b from-background to-background-light rounded-2xl gap-6"
      className="w-fit"
      cardContent={
        <>
          <div className="flex-1">
            <CardContent
              src={src}
              alt={alt}
              title={title}
              description={description}
              bulletPoints={bulletPoints}
              imageBadgeText={imageBadgeText}
            />
          </div>

          <CardSubtitle
            text="Early Bird"
            price={price}
            dateBadgeText={dateBadgeText}
          />
          <div className="lg:hidden">
            <Acordion
              body={<CourseDetail {...courseDetail} />}
              titleText="รายละเอียด"
              icon=""
              className={classNameTitle}
              cardVariant="transparent"
            />
          </div>
        </>
      }
    />
  );
};

const CardSubtitle = ({
  text,
  price,
  dateBadgeText,
}: {
  text: string;
  price: string;
  dateBadgeText: string;
}) => {
  return (
    <div className="w-full">
      <div className="bg-foreground/25 h-px mb-5 w-full"></div>
      <div
        className={cn(
          " w-full flex gap-1 justify-between mb-2 sm:items-start md:items-center lg:items-center",
        )}
      >
        <div className="flex flex-col gap-1 justify-start w-fit">
          <h1
            className={cn(
              "text-sm font-normal font-prompt text-transparent",
              variantTextStyle.primary,
            )}
          >
            {text}
          </h1>
          <p
            className={cn(
              "text-2xl font-normal font-prompt text-transparent",
              variantTextStyle.primary,
            )}
          >
            {price}
          </p>
        </div>

        <Badge
          text={dateBadgeText}
          variant="primary"
          shape="rounded"
          size="md"
        />
      </div>
      <Button
        text="ลงทะเบียนเลย"
        variant="squareButton"
        size="md"
        shape="square"
        onClick={() =>
          window.open("https://form.jotform.com/253067865008461", "_blank")
        }
      />
    </div>
  );
};

const CardContent = ({
  src,
  alt,
  title,
  description,
  bulletPoints,
  imageBadgeText,
}: {
  src: string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageBadgeText: string;
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-[200px] relative w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="386px"
          className="object-cover rounded-2xl"
        />
        <div>
          <Badge
            text={imageBadgeText}
            variant="secondary"
            shape="rounded"
            size="xs"
            className="absolute right-1 top-1"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center p-6.25 w-full">
        <h1
          className={cn(
            "text-[1.75rem] font-normal font-prompt text-transparent",
            variantTextStyle.primary,
          )}
        >
          {title}
        </h1>
        <p className="font-normal font-prompt text-center text-foreground text-sm">
          {description}
        </p>
      </div>

      <div className="bg-foreground/25 h-px mb-5 w-full"></div>

      <div className="flex flex-1 flex-col gap-4 w-full">
        {bulletPoints.map((bulletPoint) => (
          <span key={bulletPoint} className="gap-2 inline-flex items-center">
            <CheckCircleIcon
              size={16}
              className="shrink-0 text-secondary"
              weight="fill"
            />
            {bulletPoint}
          </span>
        ))}
      </div>
    </div>
  );
};
