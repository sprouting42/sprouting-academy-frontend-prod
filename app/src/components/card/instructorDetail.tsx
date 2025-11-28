"use client";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import Image from "next/image";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";

interface InstructorDetailProps {
  instructorImage: string;
  instructorName: string;
  instructorHighlight?: string;
  instructorDescription: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export const InstructorDetail = ({
  instructorImage,
  instructorName,
  instructorDescription,
  onPrev,
  onNext,
}: InstructorDetailProps) => {
  const showNavigation = Boolean(onPrev || onNext);

  return (
    <Card
      variant="gradientLightToDark"
      cardContent={
        <div className="bg-linear-to-b flex flex-col from-background-light gap-6 md:flex-row md:items-stretch min-h-[312px] p-6 rounded-2xl to-background w-full">
          <div className="md:w-[420px] relative w-full">
            <div className="aspect-3/2 h-full relative w-full">
              <Image
                src={instructorImage}
                alt="Instructor Image"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 justify-between">
            <div className="space-y-3">
              <h3 className="[html[data-theme='dark']_&]:text-secondary font-semibold text-2xl text-primary">
                {instructorName}
              </h3>
              <p className="leading-relaxed md:text-base text-foreground/80 text-sm">
                {instructorDescription}
              </p>
            </div>

            {showNavigation && (
              <div className="flex gap-3 justify-end">
                <Button
                  variant="circleButton"
                  size="lg"
                  shape="circle"
                  icon={<CaretLeftIcon size={24} weight="bold" />}
                  onClick={onPrev}
                  disabled={!onPrev}
                  aria-label="Previous instructor"
                />
                <Button
                  variant="circleButton"
                  size="lg"
                  shape="circle"
                  icon={<CaretRightIcon size={24} weight="bold" />}
                  onClick={onNext}
                  disabled={!onNext}
                  aria-label="Next instructor"
                />
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};
