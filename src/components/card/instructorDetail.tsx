"use client";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import Image from "next/image";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";

interface InstructorDetailProps {
  instructorImage?: string;
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
    <div className="p-2">
      <Card
        variant="gradientDarkToLight"
        cardContent={
          <div className="[html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:from-background-light [html[data-theme='dark']_&]:to-background [html[data-theme='light']_&]:bg-white flex flex-col gap-4 h-full md:flex-row md:gap-6 md:items-stretch md:min-h-78 md:p-6 p-4 pb-10 rounded-2xl w-full">
            {instructorImage && (
              <div className="md:w-auto relative shrink-0 w-full">
                <div className="h-[200px] md:h-[280px] md:w-[420px] relative w-full">
                  <Image
                    src={instructorImage}
                    alt="Instructor Photo"
                    fill
                    sizes="420px"
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-1 flex-col gap-6 justify-between py-4">
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
    </div>
  );
};
