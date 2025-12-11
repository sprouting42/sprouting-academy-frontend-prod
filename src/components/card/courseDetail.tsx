import Image from "next/image";
import { type ReactNode } from "react";

import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface CourseDetailProps {
  courseBenefit?: string;
  courseTopics?: ReactNode[];
  caseStudies?: ReactNode[];
  classType?: string;
  instructorImage?: string;
  instructorName?: string;
  instructorInformation?: string;
  titleText?: string;
  cardVariant?:
    | "gradientDarkToLight"
    | "gradientLightToDark"
    | "background"
    | "transparent";
}

export const CourseDetail = ({
  courseBenefit,
  courseTopics,
  caseStudies,
  classType,
  instructorImage,
  instructorName,
  instructorInformation,
  titleText,
  cardVariant,
}: CourseDetailProps) => {
  return (
    <div className="max-w-178.75 w-full">
      <Card
        variant={cardVariant}
        cardContent={
          <div
            className={cn(
              cardVariant === "transparent"
                ? "bg-transparent"
                : "bg-linear-to-b from-background-light p-4 rounded-2xl to-background w-full",
            )}
          >
            <div className="w-full">
              <h1 className="border-b border-foreground/25 font-medium mb-4 pb-4 text-center text-foreground text-xl w-full">
                {titleText}
              </h1>
              <h2 className="[html[data-theme='dark']_&]:text-secondary font-medium text-base text-primary">
                คุณจะได้อะไรจากคอร์สนี้
              </h2>
              <p className="mb-8 mt-2">{courseBenefit}</p>

              <h2 className="[html[data-theme='dark']_&]:text-secondary font-medium text-base text-primary">
                หัวข้อที่สอน
              </h2>
              <ul className="[&>li]:before:content-['•'] [&>li]:before:mr-3 [&>li]:before:text-xs [&>li]:flex [&>li]:items-center [&>li]:list-none mb-8 mt-2 pl-3 space-y-1">
                {courseTopics?.map((topic, index) => (
                  <li key={`case-study-${index}-${topic}`}>{topic}</li>
                ))}
              </ul>

              <h2 className="[html[data-theme='dark']_&]:text-secondary font-medium text-base text-primary">
                Case Studies/Workshops
              </h2>
              <ul className="[&>li]:before:content-['•'] [&>li]:before:mr-3 [&>li]:before:text-xs [&>li]:flex [&>li]:items-center [&>li]:list-none mb-8 mt-2 pl-3 space-y-1">
                {caseStudies?.map((topic, index) => (
                  <li key={`case-study-${index}-${topic}`}>{topic}</li>
                ))}
              </ul>

              <h2 className="[html[data-theme='dark']_&]:text-secondary font-medium text-base text-primary">
                รูปแบบการเรียน
              </h2>
              <p className="mb-8 mt-2">{classType}</p>

              <h2 className="[html[data-theme='dark']_&]:text-secondary font-medium text-base text-primary">
                ข้อมูลผู้สอน
              </h2>
              <div className="flex flex-col gap-8 justify-between lg:flex-row mt-2">
                {instructorImage && (
                  <div className="lg:w-3/4 relative w-full">
                    <div className="aspect-3/4 h-64 md:h-68 relative w-full">
                      <Image
                        src={instructorImage}
                        alt="Instructor Photo"
                        fill
                        sizes="(max-width: 1024px) 100vw, 75vw"
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                )}
                <div className="md:w-3/4 w-full">
                  <h3 className="[html[data-theme='dark']_&]:text-secondary font-medium mb-2 text-primary text-xl">
                    {instructorName}
                  </h3>
                  <p>{instructorInformation}</p>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
