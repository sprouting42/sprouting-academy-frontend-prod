"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { CourseCard, CourseDetail } from "@/components/card";
import { Button } from "@/components/common";
import { Banner } from "@/components/common";
import { PagePath } from "@/enum/menu";
import { MediaCourse } from "@/payload/payload-types";
export interface CourseCardProps {
  coverImage: MediaCourse | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  price: string;
  dateBadgeText: string;
  imageBadgeText: string;
  dateStart?: string;
}

export interface CourseDetailProps {
  courseBenefit?: string;
  courseTopics?: ReactNode[];
  caseStudies?: ReactNode[];
  classType?: string;
  totalTime?: string;
  startDate?: string;
  instructorImage?: string;
  instructorName?: string;
  instructorInformation?: string;
}

export interface CourseData extends CourseCardProps, CourseDetailProps {
  id: string;
}

export function Courses({
  courses,
  bannerImages,
}: {
  courses: CourseData[];
  bannerImages?: { src: string; alt?: string }[];
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 items-center lg:p-28 md:p-16 p-4 sm:p-8 w-full">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-primary">
          รายละเอียดคอร์ส
        </h2>
        <h2 className="font-prompt md:text-xl sm:text-lg text-base">
          เรียนรู้จากกูรูตัวจริงกับคอร์สที่เรามั่นใจว่าคุณจะนำกลับไปใช้ได้ในองค์กร
        </h2>
      </div>

      {bannerImages && bannerImages.length > 0 && (
        <Banner images={bannerImages} />
      )}

      {courses.map((course, idx) => {
        const courseDetailProps = {
          cardVariant: "transparent" as const,
          courseBenefit: course.courseBenefit,
          courseTopics: course.courseTopics,
          caseStudies: course.caseStudies,
          classType: course.classType,
          instructorImage: course.instructorImage,
          instructorName: course.instructorName,
          instructorInformation: course.instructorInformation,
        };

        const courseCardProps = {
          id: course.id,
          coverImage: course.coverImage,
          alt: course.alt,
          title: course.title,
          description: course.description,
          bulletPoints: course.bulletPoints,
          price: course.price,
          dateBadgeText: course.dateBadgeText,
          imageBadgeText: course.imageBadgeText,
          classNameTitle: "justify-center w-full",
          date: course.dateStart,
          totalTime: course.totalTime,
          classType: course.classType || "LIVE Online",
        };

        return (
          <div key={course.id} className="mb-8 w-full">
            <div className="flex flex-col gap-4 items-center justify-center lg:hidden">
              <CourseCard
                {...courseCardProps}
                courseDetail={courseDetailProps}
              />
            </div>

            <div className="gap-4 hidden justify-center lg:flex lg:flex-row">
              <CourseCard {...courseCardProps} />
              <motion.div
                initial={{ opacity: 0, y: 600 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <CourseDetail
                  {...courseDetailProps}
                  cardVariant="gradientDarkToLight"
                  titleText="รายละเอียด"
                />
              </motion.div>
            </div>
          </div>
        );
      })}

      <div className="p-8">
        <Button
          text="สอบถาม/ขอใบเสนอราคาองค์กร"
          variant="secondaryGradientBorder"
          size="md"
          shape="rounded"
          onClick={() => router.push(PagePath.QUOTATION)}
        />
      </div>
    </div>
  );
}
