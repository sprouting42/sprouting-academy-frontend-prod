"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { CourseCard } from "@/components/card/courseCard";
import { InstructorDetail } from "@/components/card/instructorDetail";
import { Testimonial } from "@/components/card/testimonial";
import { WhyUsCard } from "@/components/card/whyUsCard";
import { Button } from "@/components/common/button";
import { Carousel } from "@/components/common/carousel";
import { Hero } from "@/components/hero";
import type { BootcampCardData } from "@/data/bootcampCard";
import type { CourseData } from "@/data/courses";
import type { InstructorData } from "@/data/instructors";
import { testimonials } from "@/data/testimonials";
import { PagePath } from "@/enum";
import { useAddItemToCart } from "@/hooks/useCart";

interface HomeContentProps {
  courses: CourseData[];
  instructors: InstructorData[];
  bootcamps: BootcampCardData[];
}

export function HomeContent({
  courses,
  instructors,
  bootcamps,
}: HomeContentProps) {
  const { mutate: addItemToCart, isPending } = useAddItemToCart();

  const whyUsRef = useRef(null);
  const bootcampRef = useRef(null);
  const coursesRef = useRef(null);
  const instructorsRef = useRef(null);
  const testimonialsRef = useRef(null);

  const whyUsInView = useInView(whyUsRef, { once: true });
  const bootcampInView = useInView(bootcampRef, { once: true });
  const coursesInView = useInView(coursesRef, { once: true });
  const instructorsInView = useInView(instructorsRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {/* Hero Section */}
      <Hero
        content={{
          title: "อัปสกิลแห่งอนาคต: AI Automation",
          subTitle: "และ Web Development",
          description: "ลดเวลางานด้วย AI หรือเปลี่ยนอาชีพด้วย Bootcamp",
          buttonItems: [
            {
              id: "ai-automation",
              text: "ดูคอร์ส AI Automation",
              link: PagePath.COURSES,
            },
            {
              id: "bootcamp",
              text: "ดูคอร์ส Bootcamp",
              link: PagePath.BOOTCAMPS,
            },
            {
              id: "quotation",
              text: "ขอใบเสนอราคาองค์กร",
              link: PagePath.QUOTATION,
            },
          ],
        }}
      />

      {/* Career Change with Intensive Bootcamp Section */}
      <motion.section
        ref={bootcampRef}
        initial="hidden"
        animate={bootcampInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        className="flex flex-col gap-8 items-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            bootcampInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 items-center text-center"
        >
          <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-primary">
            เปลี่ยนอาชีพด้วยหลักสูตร Bootcamp ที่เข้มข้น
          </h2>
          <p className="font-prompt lg:text-base text-foreground text-lg">
            หลักสูตร 3-6 เดือน พร้อมฝึกงานจริง เน้นการลงมือทำ (Workshop-Based)
            เพื่อความพร้อมในการทำงาน 100%
          </p>
        </motion.div>
        <div className="flex flex-col gap-8 items-center justify-center md:flex-row md:items-stretch">
          {bootcamps.map((bootcamp) => (
            <motion.div
              key={bootcamp.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <CourseCard
                id={bootcamp.id}
                coverImage={bootcamp.src}
                alt={bootcamp.alt}
                title={bootcamp.title}
                description={bootcamp.description}
                bulletPoints={bootcamp.bulletPoints}
                imageBadgeText={bootcamp.imageBadgeText}
                date=""
                totalTime=""
                classType={bootcamp.classType}
                textButton={bootcamp.textButton}
                link={bootcamp.link}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            bootcampInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href={PagePath.COURSES}>
            <Button
              text="ดูหลักสูตรทั้งหมด"
              variant="primaryGradientBorder"
              size="md"
              shape="rounded"
            />
          </Link>
        </motion.div>
      </motion.section>

      {/* Course Detail Section */}
      <motion.section
        ref={coursesRef}
        initial="hidden"
        animate={coursesInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        className="flex flex-col gap-8 items-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={coursesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 items-center text-center"
        >
          <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-primary">
            รายละเอียดคอร์ส
          </h2>
          <p className="font-prompt lg:text-base text-foreground text-lg">
            เรียนรู้จากกูรูตัวจริงกับคอร์สที่เรามั่นใจว่าคุณจะนำกลับไปใช้ได้ในองค์กร
          </p>
        </motion.div>
        <div className="flex flex-col gap-6 items-center justify-center md:flex-row md:gap-8 md:items-stretch">
          {courses.slice(0, 3).map((course) => (
            <motion.div
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <CourseCard
                id={course.id}
                coverImage={course.coverImage}
                alt={course.alt}
                title={course.title}
                description={course.description}
                bulletPoints={course.bulletPoints}
                price={course.price}
                imageBadgeText={course.imageBadgeText}
                date={course.dateStart || ""}
                totalTime={course.totalTime || ""}
                classType={course.classType || ""}
                onButtonClick={() => {
                  const priceNum =
                    parseFloat((course.price || "0").replace(/[^0-9.]/g, "")) ||
                    0;
                  addItemToCart({
                    courseId: course.id,
                    courseName: course.title,
                    price: priceNum,
                    date: course.dateStart || "",
                    totalTime: course.totalTime || "",
                    classType: course.classType || "",
                  });
                }}
                isButtonLoading={isPending}
                courseDetail={{
                  courseBenefit: course.courseBenefit,
                  courseTopics: course.courseTopics,
                  caseStudies: course.caseStudies,
                  classType: course.classType,
                  instructorImage: course.instructorImage,
                  instructorName: course.instructorName,
                  instructorInformation: course.instructorInformation,
                }}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={coursesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href={PagePath.COURSES}>
            <Button
              text="ดูคอร์สทั้งหมด"
              variant="primaryGradientBorder"
              size="md"
              shape="rounded"
            />
          </Link>
        </motion.div>
      </motion.section>

      {/* Why Learn with Us Section */}
      <motion.section
        ref={whyUsRef}
        initial="hidden"
        animate={whyUsInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex flex-col gap-6 items-center px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={whyUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-center text-primary"
        >
          ทำไมต้องเรียนกับเรา?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={whyUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-prompt lg:text-base max-w-3xl text-center text-foreground text-lg"
        >
          เราไม่ได้สอนแค่เทคนิคหรือจับมือทำ
          แต่เราช่วยคุณสร้างวิธีคิดและการพัฒนาผ่านการสอนสดๆ
          เพื่อให้คุณเข้าใจและสามารถนำกลับไปใช้งานจริงเองได้
        </motion.p>
        <div className="flex flex-col flex-wrap gap-6 items-center justify-center lg:flex-row lg:gap-8">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <WhyUsCard
              iconSrc="/icons/robot.svg"
              iconAlt="Make.com Automation"
              title="Make.com Automation Mastery"
              subtitle="เรียนรู้ Make.com เครื่องมือระดับโลกในการทำ AI Automation"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <WhyUsCard
              iconSrc="/icons/sparkle.svg"
              iconAlt="Pro Thinking Process"
              title="กระบวนการคิดแบบ Pro"
              subtitle="สอนให้คิดเป็น ไม่ใช่แค่ทำตาม เพื่อใช้งานได้ตลอดชีวิต"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <WhyUsCard
              iconSrc="/icons/arrow.svg"
              iconAlt="From Start to Real Application"
              title="ตั้งแต่เริ่มจนถึงใช้งานจริง"
              subtitle="เริ่มจากไม่รู้อะไรเลย จนสามารถใช้งานได้ในชีวิตจริง"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <WhyUsCard
              iconSrc="/icons/clock.svg"
              iconAlt="Live Stream"
              title="Live Stream สดทุกสัปดาห์"
              subtitle="เรียนแบบ Interactive ถาม-ตอบได้ทันที ไม่ใช่วิดีโอย้อนหลัง"
            />
          </motion.div>
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
          className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-center text-primary"
        >
          ข้อมูลผู้สอน
        </motion.h2>
        <div className="w-full">
          <Carousel
            items={instructors.map((instructor) => ({
              id: instructor.id,
              content: (
                <InstructorDetail
                  instructorImage={instructor.instructorImage}
                  instructorName={instructor.instructorName}
                  instructorDescription={instructor.instructorDescription}
                  instructorHighlight={instructor.instructorHighlight}
                />
              ),
            }))}
            showDots={true}
            showArrows={true}
            autoplayInterval={108000}
            maxWidth="max-w-304 w-full"
          />
        </div>
      </motion.section>

      <motion.section
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex flex-col gap-8 items-center px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={
            testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-center text-primary"
        >
          เสียงจากผู้เรียน
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-prompt lg:text-base text-foreground text-lg"
        >
          ฟีดแบ็กจากมืออาชีพที่การันตีคุณภาพของคอร์สที่เราได้สร้างขึ้น
        </motion.p>
        <div className="flex flex-col flex-wrap gap-6 items-center justify-center lg:flex-row lg:gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <Testimonial
                testimonialText={testimonial.testimonialText}
                testimonialName={testimonial.testimonialName}
                testimonialPosition={testimonial.testimonialPosition}
                testimonialImage={testimonial.testimonialImage}
                testimonialRating={testimonial.testimonialRating}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
