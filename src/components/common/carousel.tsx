"use client";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

import { useCircularIndex } from "@/hooks/useCircularIndex";

type CarouselItem = {
  src?: string;
  alt?: string;
  id?: string;
  content?: ReactNode;
};

type CarouselProps = {
  items: CarouselItem[];
  autoplayInterval?: number;
  height?: string;
  showDots?: boolean;
  showArrows?: boolean;
};

type Direction = 1 | -1 | 0;

export const Carousel = ({
  items,
  autoplayInterval = 5000,
  height,
  showDots = true,
  showArrows = true,
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
      x: direction > 0 ? "-100%" : "100%",
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: Direction) => ({
      x: direction < 0 ? "-100%" : "100%",
      opacity: 1,
      zIndex: 0,
    }),
  };

  const showNavigation = items.length > 1;

  return (
    <div
      className={`${height} max-w-304 mx-auto rounded-lg w-full `}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div
        className={`overflow-hidden relative ${height && !items[currentIndex]?.content ? "flex-1" : ""}`}
      >
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
            className="w-full"
          >
            {items[currentIndex]?.content ? (
              items[currentIndex].content
            ) : items[currentIndex]?.src ? (
              <div
                className={`relative w-full ${height ? "h-full" : "aspect-video"}`}
              >
                <Image
                  src={items[currentIndex].src}
                  alt={items[currentIndex].alt ?? `carousel-${currentIndex}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1216px"
                  priority={currentIndex === 0}
                />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {showNavigation && (
          <>
            {showDots && (
              <div className="-translate-x-1/2 absolute bottom-4 cursor-pointer flex gap-1.5 left-1/2 md:gap-2 z-10">
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
              <div className="absolute bottom-4 flex gap-2 md:gap-4 right-4 z-10">
                <motion.button
                  type="button"
                  onClick={handlePrevWithDirection}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="[html[data-theme='dark']_&]:bg-foreground [html[data-theme='light']_&]:bg-[rgb(229,232,232)] flex h-8 hover:bg-foreground items-center justify-center md:h-10 md:w-10 p-2 rounded-full shadow-md text-secondary transition-colors w-8"
                  aria-label="Previous slide"
                >
                  <CaretLeftIcon
                    size={20}
                    className="md:h-6 md:w-6 text-primary"
                  />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleNextWithDirection}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="[html[data-theme='dark']_&]:bg-foreground [html[data-theme='light']_&]:bg-[rgb(229,232,232)] flex h-8 hover:bg-foreground items-center justify-center md:h-10 md:w-10 p-2 rounded-full shadow-md text-secondary transition-colors w-8"
                  aria-label="Next slide"
                >
                  <CaretRightIcon
                    size={20}
                    className="md:h-6 md:w-6 text-primary"
                  />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
