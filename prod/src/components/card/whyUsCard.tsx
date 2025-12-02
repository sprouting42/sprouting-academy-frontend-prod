import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface WhyUsCardProps {
  icon?: ReactNode;
  iconSrc?: StaticImageData | string;
  iconAlt?: string;
  title: string;
  subtitle: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
}

export const WhyUsCard = ({
  icon,
  iconSrc,
  iconAlt,
  title,
  subtitle,
  className,
  contentClassName,
  titleClassName,
}: WhyUsCardProps) => {
  const iconContent =
    icon ??
    (iconSrc ? (
      <Image
        src={iconSrc}
        alt={iconAlt ?? title}
        width={32}
        height={32}
        className="h-8 object-contain w-8"
      />
    ) : null);

  return (
    <Card
      variant="gradientDarkToLight"
      className={cn(
        "bg-linear-to-b from-background-light h-64 rounded-2xl w-72",
        className,
      )}
      contentClassName={cn(
        "[html[data-theme='light']_&]:bg-white [html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:from-background-light flex flex-col gap-4 h-full items-center p-6 rounded-2xl text-center [html[data-theme='dark']_&]:to-background w-full",
        contentClassName,
      )}
      cardContent={
        <>
          <div className="flex flex-col gap-4 items-center">
            {iconContent ? (
              <span className="bg-secondary/15 flex h-14 items-center justify-center rounded-2xl w-14">
                {iconContent}
              </span>
            ) : null}
            <h3
              className={cn(
                "font-semibold leading-snug text-primary text-xl [html[data-theme='dark']_&]:text-secondary",
                titleClassName,
              )}
            >
              {title}
            </h3>
          </div>
          <p className="font-normal leading-relaxed text-base text-foreground">
            {subtitle}
          </p>
        </>
      }
    />
  );
};
