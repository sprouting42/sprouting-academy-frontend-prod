"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { CourseCard } from "@/components/card/courseCard";
import { advancedAutomationEbooks, makeForBusinessEbooks } from "@/data/ebooks";

export default function EbookPage() {
  const heroRef = useRef(null);
  const advancedSectionRef = useRef(null);
  const businessSectionRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const advancedInView = useInView(advancedSectionRef, { once: true });
  const businessInView = useInView(businessSectionRef, { once: true });

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-8 items-center lg:gap-24 max-w-360 md:gap-12 mx-auto pt-48 w-full">
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col gap-6 md:gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                heroInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-60 lg:h-129 md:h-100 overflow-hidden relative rounded-lg shadow-[0px_24px_64px_rgba(0,0,0,0.08)] w-full"
            >
              <Image
                src="/e-book.png"
                alt="Sprouting Tech Academy ebook mockup"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1216px"
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3 md:gap-4"
            >
              <h1 className="bg-clip-text bg-linear-to-r font-bold font-prompt from-primary leading-8 lg:leading-tight lg:text-3xl md:leading-9 md:text-2xl text-transparent text-xl to-secondary">
                อัปสกิล Automation ด้วยคู่มือฉบับใช้งานจริง จาก Sprouting Tech
                Academy
              </h1>
              <p className="font-prompt leading-6 lg:leading-9 lg:text-2xl max-w-273.75 md:leading-7 md:text-lg text-base text-foreground">
                ไม่ว่าคุณจะเป็นสาย Tech ที่ต้องการความยืดหยุ่น หรือสาย Business
                ที่ต้องการลดงานซ้ำซาก เรามี E-book ที่ตอบโจทย์คุณ
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          ref={advancedSectionRef}
          initial="hidden"
          animate={advancedInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col gap-8 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              advancedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 md:gap-4 w-full"
          >
            <p className="font-prompt font-semibold leading-7 lg:leading-9 lg:text-2xl md:leading-8 md:text-xl text-center text-lg text-primary">
              สำหรับผู้ต้องการความยืดหยุ่นสูงสุด (Advanced Automation)
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-6 justify-center md:gap-8 w-full">
            {advancedAutomationEbooks.map((ebook) => (
              <motion.div
                key={ebook.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                className="w-fit"
              >
                <CourseCard {...ebook} cardVariant="ebook" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={businessSectionRef}
          initial="hidden"
          animate={businessInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col gap-8 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              businessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 md:gap-4 w-full"
          >
            <p className="font-prompt font-semibold leading-7 lg:leading-9 lg:text-2xl md:leading-8 md:text-xl text-center text-lg text-primary">
              ซีรีส์ Make for Business ลดงานเอกสาร เพิ่มยอดขายให้ทะลุเป้า
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-6 justify-center md:gap-8 w-full">
            {makeForBusinessEbooks.map((ebook) => (
              <motion.div
                key={ebook.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                className="w-fit"
              >
                <CourseCard {...ebook} cardVariant="ebook" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
