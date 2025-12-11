"use client";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

import { useCircularIndex } from "@/hooks/useCircularIndex";
import { cn } from "@/utils/cn";
type CarouselItem = {
  src?: string;
  alt?: string;
  id?: string;
  content?: ReactNode;
};

type CarouselProps = {
  items: CarouselItem[];
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  maxWidth?: string;
};

type Direction = 1 | -1 | 0;

export const Carousel = ({
  items,
  autoplayInterval,
  showDots = true,
  showArrows = true,
  maxWidth,
}: CarouselProps) => {
  const {
    currentIndex,
    setCurrentIndex,
    direction,
    setDirection,
    handlePrevWithDirection,
    handleNextWithDirection,
    pauseAutoplay,
    resumeAutoplay,
  } = useCircularIndex(items.length, autoplayInterval);
  if (!items || items.length === 0) return null;
  const imageVariants = {
    enter: (direction: Direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: Direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
      zIndex: 0,
    }),
  };

  const showNavigation = items.length > 1;

  return (
    <div
      className={cn("mx-auto rounded-lg w-full", maxWidth)}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div className="overflow-hidden relative w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={items[currentIndex]?.id || `carousel-item-${currentIndex}`}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.8, ease: "easeInOut" },
            }}
            className={
              items[currentIndex]?.content
                ? "relative w-full"
                : "absolute inset-0"
            }
          >
            {items[currentIndex]?.content ? (
              items[currentIndex].content
            ) : items[currentIndex]?.src ? (
              <div className="aspect-video relative w-full">
                <Image
                  src={items[currentIndex].src!}
                  alt={items[currentIndex].alt ?? `carousel-${currentIndex}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={currentIndex === 0}
                />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {showNavigation && (
          <>
            {showDots && (
              <div className="-translate-x-1/2 absolute bottom-9 cursor-pointer flex gap-1.5 left-1/2 md:gap-2 z-10">
                {items.map((item, index) => (
                  <motion.button
                    key={item.id || `carousel-dot-${index}`}
                    type="button"
                    onClick={() => {
                      setDirection(
                        (index > currentIndex ? 1 : -1) as Direction,
                      );
                      setCurrentIndex(index);
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-colors ${
                      index === currentIndex
                        ? "[html[data-theme='dark']_&]:bg-foreground [html[data-theme='light']_&]:bg-[rgb(229,232,232)]"
                        : "[html[data-theme='dark']_&]:bg-foreground/40 [html[data-theme='light']_&]:bg-[rgb(229,232,232)]/40"
                    }`}
                  />
                ))}
              </div>
            )}
            {showArrows && (
              <>
                <motion.button
                  type="button"
                  onClick={handlePrevWithDirection}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-6 box-border carousel-button-gradient p-0.25 right-19 rounded-full z-10"
                  aria-label="Previous slide"
                >
                  <div className="[html[data-theme='light']_&]:bg-white bg-background-light flex flex-col h-8 items-center justify-center rounded-full w-8">
                    <CaretLeftIcon
                      size={16}
                      weight="bold"
                      className="[html[data-theme='light']_&]:text-primary md:h-4 md:w-4 text-foreground"
                    />
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleNextWithDirection}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-6 box-border carousel-button-gradient p-0.25 right-6 rounded-full z-10"
                  aria-label="Next slide"
                >
                  <div className="[html[data-theme='light']_&]:bg-white bg-background-light flex flex-col h-8 items-center justify-center rounded-full w-8">
                    <CaretRightIcon
                      size={16}
                      weight="bold"
                      className="[html[data-theme='light']_&]:text-primary md:h-4 md:w-4 text-foreground"
                    />
                  </div>
                </motion.button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
