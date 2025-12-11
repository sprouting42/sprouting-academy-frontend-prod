"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { BulletAccordion } from "@/components/accordion/bulletAccordion";
import { CourseOutlineCard } from "@/components/card/courseOutlineCard";
import { CoursePlannerCard } from "@/components/card/coursePlannerCard";
import { ToolStackCard } from "@/components/card/toolStackCard";
import { TwoColumnCard } from "@/components/card/twoColumnCard";
import { BulletList, Button, Carousel } from "@/components/common";
import { HeroImage } from "@/components/hero";
import type { BootcampPage } from "@/payload/payload-types";

import { useBootcampPayloadContent } from "./useBootcampPayloadContent";

interface BootcampPayloadContentProps {
  bootcamp: BootcampPage;
}

export function BootcampPayloadContent({
  bootcamp,
}: BootcampPayloadContentProps) {
  const { refs, inViews, data } = useBootcampPayloadContent(bootcamp);
  const {
    heroRef,
    whyStudyRef,
    designedForRef,
    prerequisitesRef,
    benefitsRef,
    twoColumnRef,
    outlineRef,
    toolStackRef,
    coursePlannerRef,
    buttonRef,
  } = refs;

  const {
    heroInView,
    whyStudyInView,
    designedForInView,
    prerequisitesInView,
    benefitsInView,
    twoColumnInView,
    outlineInView,
    toolStackInView,
    coursePlannerInView,
    buttonInView,
  } = inViews;

  const {
    heroContent,
    whyStudyData,
    designedForData,
    prerequisitesData,
    bootcampBenefitsData,
    suitableForData,
    outcomesData,
    phases,
    toolStackData,
    coursePlannerData,
  } = data;

  return (
    <div className="flex flex-col gap-24 items-center min-h-screen px-28 w-full">
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <HeroImage content={heroContent} />
      </motion.div>

      {whyStudyData && (
        <motion.div
          ref={whyStudyRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            whyStudyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 items-start lg:w-280 md:w-220 w-106 xl:w-358"
        >
          <h3 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-left text-primary">
            {whyStudyData.title}
          </h3>
          <BulletList items={whyStudyData.items} />
        </motion.div>
      )}

      {designedForData && (
        <motion.div
          ref={designedForRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            designedForInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 items-start lg:w-280 md:w-220 w-106 xl:w-358"
        >
          <h3 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-left text-primary">
            {designedForData.title}
          </h3>
          <BulletList items={designedForData.items} />
        </motion.div>
      )}

      {prerequisitesData && (
        <motion.div
          ref={prerequisitesRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            prerequisitesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 items-start lg:w-280 md:w-220 w-106 xl:w-358"
        >
          <h3 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-left text-primary">
            {prerequisitesData.title}
          </h3>
          <BulletList items={prerequisitesData.items} />
        </motion.div>
      )}

      {bootcampBenefitsData && (
        <motion.div
          ref={benefitsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={
            benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 items-start lg:w-280 md:w-220 w-106 xl:w-358"
        >
          <BulletAccordion
            title={bootcampBenefitsData.title}
            subtitle={bootcampBenefitsData.subtitle}
            items={bootcampBenefitsData.items}
          />
        </motion.div>
      )}

      <motion.div
        ref={twoColumnRef}
        initial={{ opacity: 0, y: 30 }}
        animate={twoColumnInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <TwoColumnCard
          leftTitle={suitableForData.title}
          leftItems={suitableForData.items}
          rightTitle={outcomesData.title}
          rightItems={outcomesData.items}
        />
      </motion.div>

      <motion.div
        ref={outlineRef}
        initial={{ opacity: 0, y: 30 }}
        animate={outlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <CourseOutlineCard phases={phases} />
      </motion.div>

      <motion.div
        ref={toolStackRef}
        initial={{ opacity: 0, y: 30 }}
        animate={toolStackInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <ToolStackCard
          title={toolStackData.title}
          stackImages={toolStackData.stackImages}
        />
      </motion.div>

      {coursePlannerData && (
        <motion.div
          ref={coursePlannerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            coursePlannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 items-center lg:w-280 md:w-220 w-106 xl:w-358"
        >
          <h2 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-center text-primary">
            ผู้วางแผนหลักสูตรเรียนรู้
          </h2>
          <Carousel
            items={coursePlannerData.map((planner, index) => ({
              id: `course-planner-${index}`,
              content: (
                <CoursePlannerCard
                  name={planner.name}
                  role={planner.role}
                  info={planner.info}
                  profileImage={planner.profileImage}
                />
              ),
            }))}
            showDots={true}
            showArrows={true}
            autoplayInterval={400000}
            maxWidth="w-full"
          />
        </motion.div>
      )}
      <motion.div
        ref={buttonRef}
        initial={{ opacity: 0, y: 30 }}
        animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {bootcamp.hero.buttonItems && bootcamp.hero.buttonItems.length > 0 && (
          <Link href={bootcamp.hero.buttonItems[0].link}>
            <Button
              text={bootcamp.hero.buttonItems[0].text}
              shape="rounded"
              className="h-14 w-52"
            />
          </Link>
        )}
      </motion.div>
    </div>
  );
}
