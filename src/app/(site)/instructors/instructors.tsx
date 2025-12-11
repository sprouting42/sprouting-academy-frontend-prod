"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { InstructorDetail } from "@/components/card/instructorDetail";
import { Hero } from "@/components/hero";
import { InstructorData } from "@/data/instructors";
import { PagePath } from "@/enum";

interface InstructorsProps {
  instructors: InstructorData[];
}

export default function Instructors({ instructors }: InstructorsProps) {
  const instructorsRef = useRef(null);
  const instructorsInView = useInView(instructorsRef, { once: true });

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      <Hero
        titleSize="small"
        align="left"
        showFirstButtonIcon={false}
        className="md:pt-40 pt-32 px-4"
        content={{
          title: "เรียนรู้จากผู้เชี่ยวชาญสายงานจริง",
          description:
            "ทีมผู้สอนของเราคือ Full-Stack Developer และ AI Architect ที่มีประสบการณ์ทำงานจริงในระดับองค์กรที่ใหญ่และต่างประเทศ เราสอนเฉพาะสิ่งที่ตลาดต้องการและใช้ในระบบจริงเท่านั้น",
          buttonItems: [
            {
              id: "ai-automation",
              text: "ดูคอร์ส AI Automation",
              link: PagePath.COURSES,
            },
            {
              id: "bootcamp",
              text: "ดูหลักสูตร Bootcamp",
              link: PagePath.BOOTCAMPS,
            },
          ],
        }}
      />

      <motion.section
        ref={instructorsRef}
        initial="hidden"
        animate={instructorsInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        className="flex flex-col gap-8 items-center px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={
            instructorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="[html[data-theme='dark']_&]:text-secondary font-bold font-prompt lg:text-3xl text-3xl text-center text-primary"
        >
          ผู้สอน
        </motion.h2>
        <div className="flex flex-col gap-8 max-w-304 w-full">
          {instructors.map((instructor) => (
            <motion.div
              key={instructor.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <InstructorDetail
                instructorImage={instructor.instructorImage}
                instructorName={instructor.instructorName}
                instructorDescription={instructor.instructorDescription}
                instructorHighlight={instructor.instructorHighlight}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
