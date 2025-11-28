"use client";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/csr/CheckCircle";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

import { Acordion } from "@/components/common/acordion";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { MediaCourse } from "@/payload/payload-types";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/utils/cn";

import { CourseDetail } from "./courseDetail";

interface CourseCardProps {
  id: string;
  coverImage: MediaCourse | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  price?: string;
  dateBadgeText?: string;
  imageBadgeText: string;
  courseDetail?: ComponentProps<typeof CourseDetail>;
  classNameTitle?: string;
  date?: string;
  totalTime?: string;
  classType?: string;
  textButton?: string;
  earlyBirdText?: string;
  link?: string;
}
const variantTextStyle = {
  primary: "bg-clip-text bg-gradient-to-l from-primary to-secondary",
  secondary: "text-sm font-normal font-prompt text-foreground",
};

export const CourseCard = ({
  id,
  coverImage,
  alt,
  title,
  description,
  bulletPoints,
  price,
  dateBadgeText,
  imageBadgeText,
  courseDetail,
  classNameTitle,
  date = "",
  totalTime = "",
  classType = "",
  textButton = "เพิ่มลงในตระกร้า",
  earlyBirdText = "",
  link,
}: CourseCardProps) => {
  return (
    <Card
      variant="gradientDarkToLight"
      contentClassName="p-4 max-w-[384px] h-full flex flex-col bg-linear-to-b from-background to-background-light rounded-2xl gap-6"
      className="h-full w-fit"
      cardContent={
        <>
          <div className="h-full">
            <CardContent
              coverImage={coverImage}
              alt={alt}
              title={title}
              description={description}
              bulletPoints={bulletPoints}
              imageBadgeText={imageBadgeText}
            />
          </div>

          <CardSubtitle
            id={id}
            text={earlyBirdText}
            price={price}
            dateBadgeText={dateBadgeText}
            title={title}
            date={date}
            totalTime={totalTime}
            classType={classType}
            textButton={textButton}
            link={link}
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
  id,
  text,
  price,
  dateBadgeText,
  title,
  date,
  totalTime,
  classType,
  textButton,
  link,
}: {
  id: string;
  text: string;
  price?: string;
  dateBadgeText?: string;
  title: string;
  date: string;
  totalTime: string;
  classType: string;
  textButton: string;
  link?: string;
}) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id,
      courseName: title,
      price: price || "",
      date,
      totalTime,
      classType,
    });
  };
  return (
    <div className="w-full">
      <div className="bg-foreground/25 h-px mb-5 w-full"></div>
      <div
        className={cn(
          " w-full flex gap-1 justify-between mb-2 sm:items-start md:items-center lg:items-center",
        )}
      >
        <div className="flex flex-col gap-1 justify-start w-fit">
          {text && (
            <h1
              className={cn(
                "text-sm font-normal font-prompt text-transparent",
                variantTextStyle.primary,
              )}
            >
              {text}
            </h1>
          )}
          {price && (
            <p
              className={cn(
                "text-2xl font-normal font-prompt text-transparent",
                variantTextStyle.primary,
              )}
            >
              {price}
            </p>
          )}
        </div>

        {dateBadgeText && (
          <Badge
            text={dateBadgeText}
            variant="primary"
            shape="rounded"
            size="md"
          />
        )}
      </div>
      {link ? (
        <Link href={link}>
          <Button
            text={textButton}
            variant="squareButton"
            size="md"
            shape="square"
          />
        </Link>
      ) : (
        <Button
          text={textButton}
          variant="squareButton"
          size="md"
          shape="square"
          onClick={handleAddToCart}
        />
      )}
    </div>
  );
};

const CardContent = ({
  coverImage,
  alt,
  title,
  description,
  bulletPoints,
  imageBadgeText,
}: {
  coverImage: MediaCourse | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageBadgeText: string;
}) => {
  const imageUrl =
    typeof coverImage === "string" ? coverImage : coverImage?.url || "";

  return (
    <div className="flex flex-col h-full">
      <div className="h-[200px] relative w-full">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="386px"
            className="object-[40%_10%] object-cover rounded-lg"
          />
        )}
        <div>
          <Badge
            text={imageBadgeText}
            variant="secondary"
            shape="rounded"
            size="xs"
            className="absolute right-2 top-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center py-4 w-full">
        <h1
          className={cn(
            "text-[1.75rem] font-medium font-prompt text-transparent text-center w-full",
            variantTextStyle.primary,
          )}
        >
          {title}
        </h1>
        <p className="font-normal font-prompt mt-4 text-base text-center text-foreground">
          {description}
        </p>
      </div>

      <div className="bg-foreground/25 h-px mb-5 w-full"></div>

      <div className="flex flex-1 flex-col gap-4 w-full">
        {bulletPoints.map((bulletPoint) => (
          <span key={bulletPoint} className="gap-2 inline-flex items-start">
            <CheckCircleIcon
              size={18}
              className="mt-0.5 shrink-0 text-secondary"
              weight="fill"
            />
            {bulletPoint}
          </span>
        ))}
      </div>
    </div>
  );
};
