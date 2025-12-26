"use client";

import Image from "next/image";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface EbookCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pages: number;
  badgeText?: string;
  alt?: string;
  onDownload?: () => void;
  isDownloading?: boolean;
  className?: string;
}

export const EbookCard = ({
  title,
  description,
  coverImage,
  pages,
  alt = "Ebook cover",
  onDownload,
  isDownloading = false,
  className,
}: EbookCardProps) => {
  return (
    <Card
      variant="gradientLightToDark"
      contentClassName="p-4 flex flex-col bg-linear-to-b from-background to-background-light rounded-2xl gap-6 h-full"
      className={cn("h-full w-full", className)}
      cardContent={
        <>
          <div className="aspect-[326/230.35] bg-background overflow-hidden relative rounded-2xl w-full">
            <Image
              src={coverImage}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h3
              className={cn(
                "font-normal lg:text-2xl md:text-xl text-lg lg:leading-relaxed md:leading-relaxed leading-normal",
                "bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent",
                "line-clamp-3",
              )}
            >
              {title}
            </h3>

            <p className="font-prompt leading-5 line-clamp-3 text-foreground/70 text-sm">
              {description}
            </p>

            <div className="bg-foreground/25 h-px w-full"></div>

            <div className="flex gap-2 items-center">
              <span className="bg-clip-text bg-linear-to-b font-normal font-prompt from-primary leading-normal lg:leading-7 lg:text-xl md:leading-6 md:text-lg text-base text-transparent to-secondary">
                {pages.toLocaleString()} หน้า
              </span>
            </div>

            <Button
              text="ดาวน์โหลด"
              variant="squareButton"
              size="sm"
              shape="square"
              onClick={onDownload}
              loading={isDownloading}
              className="w-full"
            />
          </div>
        </>
      }
    />
  );
};
