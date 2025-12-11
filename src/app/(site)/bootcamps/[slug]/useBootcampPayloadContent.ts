"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import type { BootcampPage } from "@/payload/payload-types";
import {
  getBootcampCoverImageUrl,
  getCoursePlannerImageUrls,
  getToolStackImageAlt,
  getToolStackImageUrl,
} from "@/utils/payloadHelper";

export function useBootcampPayloadContent(bootcamp: BootcampPage) {
  const heroRef = useRef(null);
  const whyStudyRef = useRef(null);
  const designedForRef = useRef(null);
  const prerequisitesRef = useRef(null);
  const benefitsRef = useRef(null);
  const twoColumnRef = useRef(null);
  const outlineRef = useRef(null);
  const toolStackRef = useRef(null);
  const coursePlannerRef = useRef(null);
  const buttonRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whyStudyInView = useInView(whyStudyRef, { once: true });
  const designedForInView = useInView(designedForRef, { once: true });
  const prerequisitesInView = useInView(prerequisitesRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true });
  const twoColumnInView = useInView(twoColumnRef, { once: true });
  const outlineInView = useInView(outlineRef, { once: true });
  const toolStackInView = useInView(toolStackRef, { once: true });
  const coursePlannerInView = useInView(coursePlannerRef, { once: true });
  const buttonInView = useInView(buttonRef, { once: true });

  const heroContent = {
    imageSrc: getBootcampCoverImageUrl(bootcamp),
    title: bootcamp.hero.title,
    description: bootcamp.hero.description,
    buttonItems: bootcamp.hero.buttonItems,
    className:
      "object-cover sm:object-center md:object-center lg:object-[0%_] rounded-lg",
  };

  const whyStudyData =
    bootcamp.whyStudy?.title && bootcamp.whyStudy?.bulletPoints?.length
      ? {
          title: bootcamp.whyStudy.title,
          items: bootcamp.whyStudy.bulletPoints
            .map((bp) => bp.item)
            .filter((item): item is string => !!item),
        }
      : null;

  const designedForData =
    bootcamp.designedFor?.title && bootcamp.designedFor?.bulletPoints?.length
      ? {
          title: bootcamp.designedFor.title,
          items: bootcamp.designedFor.bulletPoints
            .map((bp) => bp.item)
            .filter((item): item is string => !!item),
        }
      : null;

  const prerequisitesData =
    bootcamp.prerequirements?.title &&
    bootcamp.prerequirements?.bulletPoints?.length
      ? {
          title: bootcamp.prerequirements.title,
          items: bootcamp.prerequirements.bulletPoints
            .map((bp) => bp.item)
            .filter((item): item is string => !!item),
        }
      : null;

  const bootcampBenefitsData = bootcamp.bootcampBenefits
    ? {
        title: bootcamp.bootcampBenefits.title,
        subtitle: bootcamp.bootcampBenefits.subtitle,
        items: bootcamp.bootcampBenefits.items.map((benefit) => ({
          id: benefit.id,
          title: benefit.title,
          items: benefit.items.map((item) => item.item),
        })),
      }
    : null;

  const suitableForData = {
    title: bootcamp.suitableFor.title,
    items: bootcamp.suitableFor.items.map((item) => item.item),
  };

  const outcomesData = {
    title: bootcamp.outcomes.title,
    items: bootcamp.outcomes.items.map((item) => item.item),
  };

  const phases =
    bootcamp.courseOutline?.map((outline) => ({
      phase: outline.phase,
      topic: outline.topic,
    })) ?? [];

  const toolStackData = {
    title: bootcamp.toolStack.title,
    stackImages: bootcamp.toolStack.stackImages.map((img) => ({
      src: getToolStackImageUrl(img.src),
      alt: getToolStackImageAlt(img.src),
    })),
  };

  const rawCoursePlanner = bootcamp.coursePlanner as
    | {
        name?: string | null;
        role?: string | null;
        info?: string | null;
      }
    | {
        name?: string | null;
        role?: string | null;
        info?: string | null;
      }[]
    | null
    | undefined;

  const coursePlanners = Array.isArray(rawCoursePlanner)
    ? rawCoursePlanner
    : rawCoursePlanner
      ? [rawCoursePlanner]
      : [];

  const coursePlannerImages = getCoursePlannerImageUrls(bootcamp);

  const coursePlannerData =
    coursePlanners.length > 0
      ? coursePlanners.map((planner, index) => ({
          name: planner.name ?? "",
          role: planner.role ?? "",
          info: planner.info ?? "",
          profileImage: coursePlannerImages[index] ?? "",
        }))
      : null;

  return {
    refs: {
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
    },
    inViews: {
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
    },
    data: {
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
    },
  };
}
