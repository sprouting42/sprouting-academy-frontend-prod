"use client";
import { motion } from "framer-motion";

import { CourseCard, CourseDetail } from "@/components/card";
import { Button } from "@/components/common";
import { courses } from "@/data/courses";

export const Courses = () => {
  return (
    <div className="flex flex-col items-center lg:p-28 md:p-16 p-4 sm:p-8 w-full">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h1 className="font-bold font-prompt sm:text-3xl text-2xl text-secondary">
          รายละเอียดคอร์ส
        </h1>
        <h2 className="font-prompt md:text-xl sm:text-lg text-base">
          เรียนรู้จากกูรูตัวจริงกับคอร์สที่เรามั่นใจว่าคุณจะนำกลับไปใช้ได้ในองค์กร
        </h2>
      </div>

      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col gap-4 items-center justify-center lg:flex-row lg:hidden mb-8 w-full"
        >
          <CourseCard
            src={course.src}
            alt={course.alt}
            title={course.title}
            description={course.description}
            bulletPoints={course.bulletPoints}
            price={course.price}
            dateBadgeText={course.dateBadgeText}
            imageBadgeText={course.imageBadgeText}
            classNameTitle="justify-center w-full"
            courseDetail={{
              cardVariant: "transparent",
              courseOutcome: course.courseOutcome,
              courseTopics: course.courseTopics,
              caseStudies: course.caseStudies,
              classType: course.classType,
              instructorImage: course.instructorImage,
              instructorName: course.instructorName,
              instructorInformation: course.instructorInformation,
            }}
          />
        </div>
      ))}

      {courses.map((course, idx: number) => (
        <div
          key={course.id}
          className="flex-col gap-4 hidden justify-center lg:flex lg:flex-row mb-8 w-full"
        >
          <CourseCard
            src={course.src}
            alt={course.alt}
            title={course.title}
            description={course.description}
            bulletPoints={course.bulletPoints}
            price={course.price}
            dateBadgeText={course.dateBadgeText}
            imageBadgeText={course.imageBadgeText}
            classNameTitle="justify-center w-full"
          />
          <motion.div
            initial={{ opacity: 0, y: 600 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: false }}
          >
            <CourseDetail
              courseOutcome={course.courseOutcome}
              courseTopics={course.courseTopics}
              caseStudies={course.caseStudies}
              classType={course.classType}
              instructorImage={course.instructorImage}
              instructorName={course.instructorName}
              instructorInformation={course.instructorInformation}
              cardVariant="gradientDarkToLight"
              titleText="รายละเอียด"
            />
          </motion.div>
        </div>
      ))}

      <div className="p-8">
        <Button
          text="สอบถาม/ขอใบเสนอราคาองค์กร"
          variant="secondaryGradientBorder"
          size="md"
          shape="rounded"
        />
      </div>
    </div>
  );
};
