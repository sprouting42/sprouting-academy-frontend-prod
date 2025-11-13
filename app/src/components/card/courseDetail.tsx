import Image from "next/image";

import { cn } from "@/utils/cn";

import { Card } from "../common/card";

interface CourseDetailProps {
  courseOutcome?: string;
  courseTopics?: React.ReactNode[];
  caseStudies?: React.ReactNode[];
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
  courseOutcome,
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
    <div className="max-w-[715px] w-full">
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
              <h1 className="border-b border-foreground/25 font-medium mb-4 pb-4 text-[1.375rem] text-center text-foreground w-full">
                {titleText}
              </h1>
              <h2 className="font-normal text-base text-secondary">
                คุณจะได้อะไรจากคอร์สนี้
              </h2>
              <p className="mb-8 mt-2">{courseOutcome}</p>

              <h2 className="font-normal text-base text-secondary">
                หัวข้อที่สอน
              </h2>
              <ul className="[&>li]:before:content-['•'] [&>li]:before:mr-3 [&>li]:before:text-xs [&>li]:flex [&>li]:items-center [&>li]:list-none mb-8 mt-2 pl-3 space-y-1">
                {courseTopics?.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>

              <h2 className="font-normal text-base text-secondary">
                Case Studies/Workshops
              </h2>
              <ul className="[&>li]:before:content-['•'] [&>li]:before:mr-3 [&>li]:before:text-xs [&>li]:flex [&>li]:items-center [&>li]:list-none mb-8 mt-2 pl-3 space-y-1">
                {caseStudies?.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>

              <h2 className="font-normal text-base text-secondary">
                รูปแบบการเรียน
              </h2>
              <p className="mb-8 mt-2">{classType}</p>

              <h2 className="font-normal text-base text-secondary">
                ข้อมูลผู้สอน
              </h2>
              <div className="flex flex-col gap-8 justify-between md:flex-row mt-2">
                {instructorImage && (
                  <div className="md:w-3/4 relative w-full">
                    <div className="aspect-3/4 h-64 md:h-68 relative w-full">
                      <Image
                        src={instructorImage || "/instructor-image.png"}
                        alt="Instructor Photo"
                        fill
                        sizes="(max-width: 1024px) 100vw, 75vw"
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                )}
                <div className="md:w-3/4 w-full">
                  <h3 className="font-normal mb-2 text-secondary text-xl">
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
