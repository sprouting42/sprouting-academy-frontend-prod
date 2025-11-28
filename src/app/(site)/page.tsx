import Link from "next/link";

import { CourseCard } from "@/components/card/courseCard";
import { InstructorDetail } from "@/components/card/instructorDetail";
import { Testimonial } from "@/components/card/testimonial";
import { WhyUsCard } from "@/components/card/whyUsCard";
import { Button } from "@/components/common/button";
import { Hero } from "@/components/hero";
import { bootcampsData } from "@/data/bootcamp-coursecard";
import { courses } from "@/data/courses";
import { fetchInstructors } from "@/data/instructors";
import { testimonials } from "@/data/testimonials";
import { PagePath } from "@/enum";

export default async function Home() {
  const instructors = await fetchInstructors();

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
          ],
        }}
      />

      {/* Why Learn with Us Section */}
      <section className="flex flex-col gap-6 items-center px-4">
        <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-center text-primary">
          ทำไมต้องเรียนกับเรา?
        </h2>
        <p className="font-prompt lg:text-base max-w-3xl text-center text-foreground text-lg">
          เราไม่ได้สอนแค่เทคนิคหรือจับมือทำ
          แต่เราช่วยคุณสร้างวิธีคิดและการพัฒนาผ่านการสอนสดๆ
          เพื่อให้คุณเข้าใจและสามารถนำกลับไปใช้งานจริงเองได้
        </p>
        <div className="flex flex-col flex-wrap gap-6 items-center justify-center lg:flex-row lg:gap-8">
          <WhyUsCard
            iconSrc="/icons/robot.svg"
            iconAlt="Make.com Automation"
            title="Make.com Automation Mastery"
            subtitle="เรียนรู้ Make.com เครื่องมือระดับโลกในการทำ AI Automation"
          />
          <WhyUsCard
            iconSrc="/icons/sparkle.svg"
            iconAlt="Pro Thinking Process"
            title="กระบวนการคิดแบบ Pro"
            subtitle="สอนให้คิดเป็น ไม่ใช่แค่ทำตาม เพื่อใช้งานได้ตลอดชีวิต"
          />
          <WhyUsCard
            iconSrc="/icons/arrow.svg"
            iconAlt="From Start to Real Application"
            title="ตั้งแต่เริ่มจนถึงใช้งานจริง"
            subtitle="เริ่มจากไม่รู้อะไรเลย จนสามารถใช้งานได้ในชีวิตจริง"
          />
          <WhyUsCard
            iconSrc="/icons/clock.svg"
            iconAlt="Live Stream"
            title="Live Stream สดทุกสัปดาห์"
            subtitle="เรียนแบบ Interactive ถาม-ตอบได้ทันที ไม่ใช่วิดีโอย้อนหลัง"
          />
        </div>
      </section>

      {/* Career Change with Intensive Bootcamp Section */}
      <section className="flex flex-col gap-8 items-center px-4">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-primary">
            เปลี่ยนอาชีพด้วยหลักสูตร Bootcamp ที่เข้มข้น
          </h2>
          <p className="font-prompt lg:text-base text-foreground text-lg">
            หลักสูตร 3-6 เดือน พร้อมฝึกงานจริง เน้นการลงมือทำ (Workshop-Based)
            เพื่อความพร้อมในการทำงาน 100%
          </p>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center md:flex-row md:items-stretch">
          {bootcampsData.map((bootcamp) => (
            <div key={bootcamp.id}>
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
            </div>
          ))}
        </div>
        <Link href={PagePath.COURSES}>
          <Button
            text="ดูหลักสูตรทั้งหมด"
            variant="primaryGradientBorder"
            size="md"
            shape="rounded"
          />
        </Link>
      </section>

      <section className="flex flex-col gap-8 items-center px-4">
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-primary">
            รายละเอียดคอร์ส
          </h2>
          <p className="font-prompt lg:text-base text-foreground text-lg">
            เรียนรู้จากกูรูตัวจริงกับคอร์สที่เรามั่นใจว่าคุณจะนำกลับไปใช้ได้ในองค์กร
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center justify-center md:flex-row md:gap-8 md:items-stretch">
          {courses.slice(0, 3).map((course) => (
            <div key={course.id}>
              <CourseCard
                id={course.id}
                coverImage={course.src}
                alt={course.alt}
                title={course.title}
                description={course.description}
                bulletPoints={course.bulletPoints}
                price={course.price}
                dateBadgeText={course.dateBadgeText}
                imageBadgeText={course.imageBadgeText}
                date={course.dateStart || ""}
                totalTime={course.totalTime || ""}
                classType={course.classType || ""}
              />
            </div>
          ))}
        </div>
        <Link href={PagePath.COURSES}>
          <Button
            text="ดูคอร์สทั้งหมด"
            variant="primaryGradientBorder"
            size="md"
            shape="rounded"
          />
        </Link>
      </section>

      <section className="flex flex-col gap-8 items-center px-4">
        <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-center text-primary">
          ข้อมูลผู้สอน
        </h2>
        <div className="flex flex-col gap-8 max-w-304 w-full">
          {instructors.map((instructor) => (
            <InstructorDetail
              key={instructor.id}
              instructorImage={instructor.instructorImage}
              instructorName={instructor.instructorName}
              instructorDescription={instructor.instructorDescription}
              instructorHighlight={instructor.instructorHighlight}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8 items-center px-4">
        <h2 className="[html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:bg-linear-to-r [html[data-theme='dark']_&]:from-secondary [html[data-theme='dark']_&]:text-transparent [html[data-theme='dark']_&]:to-primary font-bold font-prompt lg:text-3xl text-3xl text-center text-primary">
          เสียงจากผู้เรียน
        </h2>
        <p className="font-prompt lg:text-base text-foreground text-lg">
          ฟีดแบ็กจากมืออาชีพที่การันตีคุณภาพของคอร์สที่เราได้สร้างขึ้น
        </p>
        <div className="flex flex-col flex-wrap gap-6 items-center justify-center lg:flex-row lg:gap-8">
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.id}
              testimonialText={testimonial.testimonialText}
              testimonialName={testimonial.testimonialName}
              testimonialPosition={testimonial.testimonialPosition}
              testimonialImage={testimonial.testimonialImage}
              testimonialRating={testimonial.testimonialRating}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
