"use client";

import { SparkleIcon } from "@phosphor-icons/react/dist/csr/Sparkle";
import Link from "next/link";

import { FeatureHighlightCard } from "@/components/card/featureHighlightCard";
import { InstructorDetail } from "@/components/card/instructorDetail";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Hero } from "@/components/hero";
import { aboutUsFeatures } from "@/data/aboutus-features";
import { InstructorData } from "@/data/instructors";
import { PagePath } from "@/enum";

interface AboutUsProps {
  instructors: InstructorData[];
}

export default function AboutUs({ instructors }: AboutUsProps) {
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

      <section className="flex flex-col gap-6 items-center px-4">
        <div className="gap-6 grid grid-cols-1 lg:gap-8 lg:grid-cols-3 max-w-304 w-full">
          {aboutUsFeatures.map((feature) => (
            <FeatureHighlightCard
              key={feature.id}
              iconSrc={feature.iconSrc}
              iconAlt={feature.iconAlt}
              title={feature.title}
              subtitle={feature.subtitle}
              description={feature.description}
              className="h-full"
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8 items-center px-4">
        <h2 className="font-bold font-prompt lg:text-3xl text-3xl text-center text-secondary">
          ผู้ก่อตั้ง
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

      <section className="flex flex-col gap-2.5 items-center lg:gap-4 lg:pb-20 pb-16 px-4">
        <Badge
          text="ราคา Early Bird ประหยัดได้กว่า 80%"
          icon={<SparkleIcon size={16} color="#e5e8e8" weight="fill" />}
          variant="transparentPrimary"
          shape="rounded"
          size="sm"
        />
        <h2 className="font-bold font-prompt leading-9 lg:font-medium lg:leading-10 lg:text-3xl text-center text-foreground text-xl">
          พร้อมจะยกระดับ อัพสกิลในการทำงานหรือยัง?
        </h2>
        <div className="w-fit">
          <div className="flex flex-col gap-4 md:flex-row">
            <Link href={PagePath.COURSES}>
              <Button
                text="ดูคอร์ส AI Automation"
                variant="primaryGradientBorder"
                size="sm"
                shape="rounded"
              />
            </Link>
            <Link href={PagePath.BOOTCAMPS}>
              <Button
                text="ดูหลักสูตร Bootcamp"
                variant="secondaryGradientBorder"
                size="sm"
                shape="rounded"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
