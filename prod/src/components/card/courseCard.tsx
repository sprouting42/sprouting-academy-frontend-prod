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
import { cn } from "@/utils/cn";

import { CourseDetail } from "./courseDetail";

interface CourseCardProps {
  id: string;
  coverImage: MediaCourse | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints?: string[];
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
  targetAudience?: string;
  cardVariant?: "course" | "ebook";
  showAccordion?: boolean;
  onButtonClick?: () => void;
  isButtonLoading?: boolean;
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
  bulletPoints = [],
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
  targetAudience,
  cardVariant = "course",
  showAccordion,
  onButtonClick,
  isButtonLoading = false,
}: CourseCardProps) => {
  const isEbook = cardVariant === "ebook";

  return (
    <Card
      variant={isEbook ? "gradientDarkToLight" : "gradientLightToDark"}
      contentClassName={cn(
        isEbook
          ? "p-3 md:p-4 max-w-96 flex flex-col [html[data-theme='light']_&]:bg-white [html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:from-background-light rounded-2xl gap-3 md:gap-4 h-full [html[data-theme='dark']_&]:to-background"
          : "p-4 max-w-96 min-h-228.5 flex flex-col [html[data-theme='light']_&]:bg-white [html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:from-background rounded-2xl gap-6 [html[data-theme='dark']_&]:to-background-light",
      )}
      className="h-full w-fit"
      cardContent={
        <>
          {isEbook ? (
            <CardContent
              coverImage={coverImage}
              alt={alt}
              title={title}
              description={description}
              bulletPoints={bulletPoints}
              imageBadgeText={imageBadgeText}
              targetAudience={targetAudience}
              price={price}
              textButton={textButton}
              link={link}
              isEbook={isEbook}
            />
          ) : (
            <>
              <div className="flex-1 h-full">
                <CardContent
                  coverImage={coverImage}
                  alt={alt}
                  title={title}
                  description={description}
                  bulletPoints={bulletPoints}
                  imageBadgeText={imageBadgeText}
                  targetAudience={targetAudience}
                  isEbook={isEbook}
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
                isEbook={isEbook}
                onButtonClick={onButtonClick}
                isButtonLoading={isButtonLoading}
              />
              {showAccordion && (
                <div className="lg:hidden">
                  <Acordion
                    body={<CourseDetail {...courseDetail} />}
                    titleText="รายละเอียด"
                    icon=""
                    className={classNameTitle}
                    cardVariant="transparent"
                  />
                </div>
              )}
            </>
          )}
        </>
      }
    />
  );
};

const CardSubtitle = ({
  text,
  price,
  dateBadgeText,
  textButton,
  link,
  isEbook,
  onButtonClick,
  isButtonLoading = false,
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
  isEbook?: boolean;
  onButtonClick?: () => void;
  isButtonLoading?: boolean;
}) => {
  if (isEbook) {
    return (
      <div className="flex flex-1 flex-col gap-4 justify-end w-full">
        <div className="bg-foreground/25 h-px w-full"></div>
        <div className="flex flex-row gap-2 items-end">
          <span
            className={cn(
              "font-prompt text-transparent md:text-sm md:leading-relaxed text-xs leading-normal",
              variantTextStyle.primary,
            )}
          >
            ราคา
          </span>
          <span
            className={cn(
              "font-prompt text-transparent md:text-xl md:leading-relaxed text-lg leading-normal",
              variantTextStyle.primary,
            )}
          >
            {price}
          </span>
        </div>
        {link ? (
          <Link href={link} className="w-full">
            <Button
              text={textButton}
              variant="squareButton"
              size="md"
              shape="square"
              className="w-full"
            />
          </Link>
        ) : (
          <Button
            text={textButton}
            variant="squareButton"
            size="md"
            shape="square"
            className="w-full"
          />
        )}
      </div>
    );
  }

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
          text={isButtonLoading ? "กำลังเพิ่ม..." : textButton}
          variant="squareButton"
          size="md"
          shape="square"
          onClick={onButtonClick}
          disabled={isButtonLoading}
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
  targetAudience,
  price,
  textButton,
  link,
  isEbook,
}: {
  coverImage: MediaCourse | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageBadgeText: string;
  targetAudience?: string;
  price?: string;
  textButton?: string;
  link?: string;
  isEbook?: boolean;
}) => {
  const imageUrl =
    typeof coverImage === "string" ? coverImage : coverImage?.url || "";

  if (isEbook) {
    return (
      <>
        <div className="h-40 md:h-50 relative w-full">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 352px"
            className="object-cover rounded-lg"
          />
          <div className="absolute right-2 top-2">
            <Badge
              text={imageBadgeText}
              variant="secondary"
              shape="rounded"
              size="xs"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <h2
            className={cn(
              "font-prompt font-medium text-center text-transparent w-full md:text-3xl md:leading-normal text-xl leading-normal",
              variantTextStyle.primary,
            )}
          >
            {title}
          </h2>
        </div>

        <div className="flex flex-1 flex-col gap-4 justify-end w-full">
          {description && (
            <p className="font-prompt leading-normal md:leading-normal md:text-base text-foreground text-left text-sm w-full wrap-break-word">
              {description}
            </p>
          )}
          {targetAudience && (
            <>
              <div className="bg-foreground/25 h-px w-full"></div>
              <p className="font-prompt leading-normal md:leading-normal md:text-base text-foreground text-left text-sm w-full wrap-break-word">
                {targetAudience}
              </p>
            </>
          )}
          <div className="bg-foreground/25 h-px w-full"></div>
          <div className="flex flex-row gap-2 items-end">
            <span
              className={cn(
                "font-prompt text-transparent md:text-sm md:leading-relaxed text-xs leading-normal",
                variantTextStyle.primary,
              )}
            >
              ราคา
            </span>
            <span
              className={cn(
                "font-prompt text-transparent md:text-xl md:leading-relaxed text-lg leading-normal",
                variantTextStyle.primary,
              )}
            >
              {price}
            </span>
          </div>
          {link ? (
            <Link href={link} className="w-full">
              <Button
                text={textButton || ""}
                variant="squareButton"
                size="md"
                shape="square"
                className="w-full"
              />
            </Link>
          ) : (
            <Button
              text={textButton || ""}
              variant="squareButton"
              size="md"
              shape="square"
              className="w-full"
            />
          )}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-50 relative w-full">
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
            "text-3xl font-medium font-prompt text-transparent text-center w-full",
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
