"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { BulletAccordion } from "@/components/accordion";
import { CourseOutlineCard } from "@/components/card/courseOutlineCard";
import { ToolStackCard } from "@/components/card/toolStackCard";
import { TwoColumnCard } from "@/components/card/twoColumnCard";
import { BulletList } from "@/components/common";
import { HeroImage } from "@/components/hero";
import type { BootcampData } from "@/data/bootcamps";

interface BootcampContentProps {
  bootcamp: BootcampData;
}

export function BootcampContent({ bootcamp }: BootcampContentProps) {
  const heroRef = useRef(null);
  const whyStudyRef = useRef(null);
  const designedForRef = useRef(null);
  const prerequisitesRef = useRef(null);
  const benefitsRef = useRef(null);
  const twoColumnRef = useRef(null);
  const outlineRef = useRef(null);
  const toolStackRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whyStudyInView = useInView(whyStudyRef, { once: true });
  const designedForInView = useInView(designedForRef, { once: true });
  const prerequisitesInView = useInView(prerequisitesRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true });
  const twoColumnInView = useInView(twoColumnRef, { once: true });
  const outlineInView = useInView(outlineRef, { once: true });
  const toolStackInView = useInView(toolStackRef, { once: true });

  return (
    <div className="flex flex-col gap-24 items-center min-h-screen px-28 w-full">
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <HeroImage content={bootcamp.hero} />
      </motion.div>

      {bootcamp.whyStudy && (
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
            {bootcamp.whyStudy.title}
          </h3>
          <BulletList items={bootcamp.whyStudy.items} />
        </motion.div>
      )}

      {bootcamp.designedFor && (
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
            {bootcamp.designedFor.title}
          </h3>
          <BulletList items={bootcamp.designedFor.items} />
        </motion.div>
      )}

      {bootcamp.prerequisites && (
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
            {bootcamp.prerequisites.title}
          </h3>
          <BulletList items={bootcamp.prerequisites.items} />
        </motion.div>
      )}

      {bootcamp.bootcampBenefits && (
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
            title={bootcamp.bootcampBenefits.title}
            subtitle={bootcamp.bootcampBenefits.subtitle}
            items={bootcamp.bootcampBenefits.items}
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
          leftTitle={bootcamp.suitableFor.title}
          leftItems={bootcamp.suitableFor.items}
          rightTitle={bootcamp.outcomes.title}
          rightItems={bootcamp.outcomes.items}
        />
      </motion.div>

      <motion.div
        ref={outlineRef}
        initial={{ opacity: 0, y: 30 }}
        animate={outlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <CourseOutlineCard
          phases={bootcamp.phases}
          tableTitle={bootcamp.tableTitle}
        />
      </motion.div>

      <motion.div
        ref={toolStackRef}
        initial={{ opacity: 0, y: 30 }}
        animate={toolStackInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <ToolStackCard
          title={bootcamp.toolStack.title}
          stackImages={bootcamp.toolStack.stackImages}
        />
      </motion.div>
    </div>
  );
}
