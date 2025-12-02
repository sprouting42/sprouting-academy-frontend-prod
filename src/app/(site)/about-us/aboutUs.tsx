"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { FeatureHighlightCard } from "@/components/card/featureHighlightCard";
import { InstructorDetail } from "@/components/card/instructorDetail";
import { Hero } from "@/components/hero";
import { aboutUsFeatures } from "@/data/aboutus-features";
import { InstructorData } from "@/data/instructors";
import { PagePath } from "@/enum";

interface AboutUsProps {
  instructors: InstructorData[];
}

export default function AboutUs({ instructors }: AboutUsProps) {
  const featuresRef = useRef(null);
  const instructorsRef = useRef(null);

  const featuresInView = useInView(featuresRef, { once: true });
  const instructorsInView = useInView(instructorsRef, { once: true });

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      <Hero
        titleSize="small"
        align="left"
        showFirstButtonIcon={false}
        className="md:pt-40 pt-32 px-4"
        content={{
          title: "เพราะเราเชื่อว่าทักษะที่แท้จริง ต้องเกิดจากการลงมือทํา",
          description:
            'Sprouting Tech มุ่งมั่นสร้างนักพัฒนาและผู้เชี่ยวชาญ AI รุ่นใหม่ ที่ไม่ได้แค่ "มีความรู้" แต่ต้อง "พร้อมทํางานจริง" ในโลกเทคโนโลยีที่เปลี่ยนแปลงตลอดเวลา',
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
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex flex-col gap-6 items-center px-4"
      >
        <div className="gap-6 grid grid-cols-1 lg:gap-8 lg:grid-cols-3 max-w-304 w-full">
          {aboutUsFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <FeatureHighlightCard
                iconSrc={feature.iconSrc}
                iconAlt={feature.iconAlt}
                title={feature.title}
                subtitle={feature.subtitle}
                description={feature.description}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

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
          className="font-bold font-prompt lg:text-3xl text-3xl text-center text-secondary"
        >
          ผู้ก่อตั้ง
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
