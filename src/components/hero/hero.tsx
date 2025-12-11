"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "../common";

interface HeroProps {
  content?: {
    title?: string;
    subTitle?: string;
    description?: string;
    buttonItems?: Array<{ id: string; text: string; link: string }>;
  };
  titleSize?: "large" | "small";
  align?: "center" | "left";
  className?: string;
  showFirstButtonIcon?: boolean;
}

export const Hero = ({
  content,
  titleSize = "large",
  align = "center",
  className,
}: HeroProps) => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const isLeftAligned = align === "left";

  const containerAlignmentClasses = isLeftAligned
    ? "items-start md:items-start text-left w-full max-w-304"
    : "items-center md:items-center text-center";

  const titleBaseClasses =
    "bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary text-transparent to-primary";

  const largeTitleClasses = `${titleBaseClasses} md:text-7xl leading-normal sm:text-5xl text-3xl`;

  const smallTitleClasses = `${titleBaseClasses} text-xl leading-normal lg:text-3xl lg:leading-10`;

  const titleClasses =
    titleSize === "small" ? smallTitleClasses : largeTitleClasses;

  const descriptionClasses = isLeftAligned
    ? "font-prompt max-w-2xl md:text-xl sm:text-lg text-base text-foreground"
    : "font-prompt max-w-2xl md:text-2xl sm:text-xl text-lg text-foreground";

  const buttonWrapperClasses = isLeftAligned
    ? "flex flex-col flex-wrap gap-3 justify-start md:gap-4 sm:flex-row"
    : "flex flex-col flex-wrap gap-3 justify-center md:gap-4 sm:flex-row";

  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0, y: 30 }}
      animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className={className ?? "md:px-16 md:py-20 px-4 py-12 sm:px-8"}
    >
      <div
        className={`mx-auto flex flex-col gap-6 md:gap-8 ${containerAlignmentClasses}`}
      >
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className={`flex flex-col gap-4 ${
            isLeftAligned ? "items-start" : "items-center"
          }`}
        >
          {content?.title && (
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className={titleClasses}
            >
              {content.title}
            </motion.h1>
          )}
          {content?.subTitle && (
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className={largeTitleClasses}
            >
              {content.subTitle}
            </motion.h1>
          )}
          {content?.description && (
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={descriptionClasses}
            >
              {content.description}
            </motion.p>
          )}
        </motion.div>
        {content?.buttonItems && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={buttonWrapperClasses}
          >
            {content.buttonItems.map(({ id, text, link }, index) => {
              const isFirstButton = content.buttonItems?.[0]?.id === id;
              const isLastButton =
                index === (content.buttonItems?.length ?? 0) - 1;
              const isPrimaryGradient = isFirstButton || isLastButton;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    heroInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + (isFirstButton ? 0 : 0.1),
                  }}
                >
                  <Link href={link}>
                    <Button
                      text={text}
                      shape="rounded"
                      variant={
                        isPrimaryGradient
                          ? "primaryGradientBorder"
                          : "secondaryGradientBorder"
                      }
                      className={`w-full ${isLastButton ? "[html[data-theme='light']_&]:bg-background [html[data-theme='dark']_&]:bg-base-100 [html[data-theme='light']_&]:text-primary" : ""}`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
