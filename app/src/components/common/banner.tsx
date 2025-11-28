"use client";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { useCircularIndex } from "@/hooks/useCircularIndex";

type BannerItem = {
  src: string;
  alt?: string;
  id?: string;
};

type BannerProps = {
  images: BannerItem[];
};

type Direction = 1 | -1 | 0;

const calculateDirection = (
  currentIndex: number,
  targetIndex: number,
  totalItems: number,
  userDirection: Direction,
): Direction => {
  if (currentIndex === targetIndex) {
    return userDirection;
  }

  if (currentIndex === totalItems - 1 && targetIndex === 0) {
    return 1;
  }
  if (currentIndex === 0 && targetIndex === totalItems - 1) {
    return -1;
  }

  return targetIndex > currentIndex ? 1 : -1;
};

const getVisibleIndices = (
  currentIndex: number,
  totalItems: number,
): number[] => {
  if (totalItems <= 1) return [0];

  const indices = [currentIndex];

  if (currentIndex === 0) {
    indices.push(totalItems - 1);
  } else {
    indices.push(currentIndex - 1);
  }

  if (currentIndex === totalItems - 1) {
    indices.push(0);
  } else {
    indices.push(currentIndex + 1);
  }

  return indices;
};

export const Banner = ({ images }: BannerProps) => {
  const {
    currentIndex,
    setCurrentIndex,
    direction,
    setDirection,
    handlePrevWithDirection,
    handleNextWithDirection,
    pauseAutoplay,
    resumeAutoplay,
  } = useCircularIndex(images.length, 5000);
  if (!images || images.length === 0) return null;

  const imageVariants = {
    enter: (direction: Direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: Direction) => ({
      x: direction < 0 ? -1000 : 1000,
      opacity: 0,
      zIndex: 0,
    }),
  };

  const visibleIndices = getVisibleIndices(currentIndex, images.length);
  const showNavigation = images.length > 1;

  return (
    <div
      className="h-[543px] max-w-[1216px] mx-auto overflow-hidden relative rounded-lg w-full"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        {visibleIndices.map((index) => {
          const image = images[index];
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={image.id || `banner-${image.src}-${index}`}
              custom={calculateDirection(
                currentIndex,
                index,
                images.length,
                direction as Direction,
              )}
              variants={imageVariants}
              initial={isActive ? "enter" : "exit"}
              animate={isActive ? "center" : "exit"}
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 40 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={image.src}
                alt={image.alt ?? `banner-${index}`}
                fill
                className="object-cover"
                sizes="(max-width: 1216px) 100vw, 1216px"
                priority={index === 0}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {showNavigation && (
        <>
          <div className="absolute bottom-4 flex gap-4 right-4 z-10">
            <motion.button
              type="button"
              onClick={handlePrevWithDirection}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-foreground flex h-10 hover:bg-foreground items-center justify-center p-2 rounded-full shadow-md text-slate-900 transition-colors w-10"
              aria-label="Previous banner"
            >
              <CaretLeftIcon size={24} className="text-primary" />
            </motion.button>
            <motion.button
              type="button"
              onClick={handleNextWithDirection}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-foreground flex h-10 hover:bg-foreground items-center justify-center p-2 rounded-full shadow-md text-slate-900 transition-colors w-10"
              aria-label="Next banner"
            >
              <CaretRightIcon size={24} className="text-primary" />
            </motion.button>
          </div>

          <div className="-translate-x-1/2 absolute bottom-4 flex gap-2 left-1/2 z-10">
            {images.map((image, index) => (
              <motion.button
                key={image.id || image.src}
                type="button"
                onClick={() => {
                  setDirection((index > currentIndex ? 1 : -1) as Direction);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
