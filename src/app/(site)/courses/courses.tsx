"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";

import { CourseCard, CourseDetail } from "@/components/card";
import { Button } from "@/components/common";
import { Carousel } from "@/components/common";
import { Popup } from "@/components/common/popup";
import type { PopupImage } from "@/data/popup";
import { PagePath } from "@/enum/menu";
import { useAddCourseToCart } from "@/hooks/useAddCourseToCart";
import { MediaCourse } from "@/payload/payload-types";

export interface CourseCardProps {
  coverImage: MediaCourse | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  price: string;
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
  dateOptions?: string[];
}

export function Courses({
  courses,
  bannerImages,
  popupImages,
}: {
  courses: CourseData[];
  bannerImages?: { src: string; alt?: string; id: string }[];
  popupImages: PopupImage[];
}) {
  const router = useRouter();
  const headerRef = useRef(null);
  const coursesRef = useRef(null);
  const buttonRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true });
  const coursesInView = useInView(coursesRef, { once: true });
  const buttonInView = useInView(buttonRef, { once: true });

  const { addCourseToCart, isPending } = useAddCourseToCart();

  return (
    <>
      <Popup images={popupImages} storageKey="course-popup-shown" />
      <div className="flex flex-col gap-8 items-center lg:p-28 md:p-16 p-4 sm:p-8 w-full">
        <Carousel
          items={(bannerImages || []).map((banner, index) => ({
            id: banner.id,
            content: (
              <div className="h-[300px] md:h-[543px] relative sm:h-[400px] w-full">
                <Image
                  src={banner.src}
                  alt={banner.alt ?? `Banner ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1216px"
                  priority={index === 0}
                />
              </div>
            ),
          }))}
          autoplayInterval={4000}
          showDots={true}
          showArrows={true}
          maxWidth="max-w-304 w-full"
        />

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-2 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
            className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-primary"
          >
            รายละเอียดคอร์ส
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-prompt md:text-xl sm:text-lg text-base"
          >
            เรียนรู้จากกูรูตัวจริงกับคอร์สที่เรามั่นใจว่าคุณจะนำกลับไปใช้ได้ในองค์กร
          </motion.h2>
        </motion.div>

        <motion.div
          ref={coursesRef}
          initial="hidden"
          animate={coursesInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="w-full"
        >
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
              imageBadgeText: course.imageBadgeText,
              classNameTitle: "justify-center w-full",
              date: course.dateStart,
              totalTime: course.totalTime,
              classType: course.classType || "LIVE Online",
              showAccordion: true,
              onButtonClick: () => addCourseToCart(course),
              isButtonLoading: isPending,
            };

            return (
              <motion.div
                key={course.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="mb-8 w-full"
              >
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
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, y: 20 }}
          animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <Button
            text="สอบถาม/ขอใบเสนอราคาองค์กร"
            variant="secondaryGradientBorder"
            size="md"
            shape="rounded"
            onClick={() => router.push(PagePath.QUOTATION)}
          />
        </motion.div>
      </div>
    </>
  );
}
