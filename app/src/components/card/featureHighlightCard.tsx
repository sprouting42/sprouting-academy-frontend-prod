import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface FeatureHighlightCardProps {
  icon?: ReactNode;
  iconSrc?: StaticImageData | string;
  iconAlt?: string;
  title: string;
  subtitle: string;
  description: string;
  className?: string;
  contentClassName?: string;
}

export const FeatureHighlightCard = ({
  icon,
  iconSrc,
  iconAlt,
  title,
  subtitle,
  description,
  className,
  contentClassName,
}: FeatureHighlightCardProps) => {
  const iconContent =
    icon ??
    (iconSrc ? (
      <Image
        src={iconSrc}
        alt={iconAlt ?? title}
        width={64}
        height={64}
        className="h-16 object-contain w-16"
      />
    ) : null);

  return (
    <Card
      variant="gradientLightToDark"
      className={cn(
        "bg-linear-to-b from-background-light h-full min-h-[312px] rounded-2xl",
        className,
      )}
      contentClassName={cn(
        "bg-linear-to-b flex flex-col from-background-light gap-4 h-full items-start p-6 rounded-2xl text-left to-background w-full",
        contentClassName,
      )}
      cardContent={
        <>
          <div className="flex gap-5 items-start">
            {iconContent ? (
              <div className="flex items-center justify-start shrink-0">
                {iconContent}
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              <h3 className="font-prompt font-semibold leading-snug text-secondary text-xl">
                {title}
              </h3>
              <p className="font-prompt font-semibold leading-snug text-secondary text-xl">
                ({subtitle})
              </p>
            </div>
          </div>
          <p className="font-normal font-prompt leading-snug mt-2 text-foreground text-xl">
            {description}
          </p>
        </>
      }
    />
  );
};
