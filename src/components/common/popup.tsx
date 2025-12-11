"use client";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useCircularIndex } from "@/hooks/useCircularIndex";

type PopupItem = {
  src: string;
  alt?: string;
  id?: string;
};

type PopupProps = {
  images: PopupItem[];
  storageKey: string;
  onClose?: () => void;
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

export const Popup = ({ images, storageKey, onClose }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    currentIndex,
    setCurrentIndex,
    direction,
    setDirection,
    handlePrevWithDirection,
    handleNextWithDirection,
    pauseAutoplay,
  } = useCircularIndex(images.length, 999999999);
  useEffect(() => {
    pauseAutoplay();
  }, [pauseAutoplay]);

  useEffect(() => {
    const hasShown = localStorage.getItem(storageKey);
    if (!hasShown && images && images.length > 0) {
      setIsVisible(true);
    }
  }, [storageKey, images]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, "true");
    if (onClose) {
      onClose();
    }
  };

  if (!images || images.length === 0 || !isVisible) return null;

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      zIndex: 0,
    }),
  };

  const visibleIndices = Array.from(
    new Set(getVisibleIndices(currentIndex, images.length)),
  );
  const showNavigation = images.length > 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop-blur-sm bg-black/50 fixed flex inset-0 items-end justify-center pb-20 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full max-h-[90vh] max-w-[90vw] md:max-h-[600px] md:max-w-[800px] relative w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="-right-12 -top-12 absolute cursor-pointer flex h-10 items-center justify-center rounded-full shadow-md transition-colors w-10 z-20"
              aria-label="Close popup"
            >
              <XIcon size={24} className="text-white" />
            </button>
            <div className="h-full relative w-full">
              <AnimatePresence initial={false} custom={direction} mode="sync">
                {visibleIndices.map((index) => {
                  const image = images[index];
                  const isActive = index === currentIndex;

                  return (
                    <motion.div
                      key={image.id || `popup-${image.src}-${index}`}
                      custom={
                        isActive ? direction : index > currentIndex ? 1 : -1
                      }
                      variants={imageVariants}
                      initial={isActive ? "enter" : "exit"}
                      animate={isActive ? "center" : "exit"}
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt ?? `popup-${index}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 800px) 90vw, 800px"
                        priority={index === 0}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {showNavigation && (
              <>
                <motion.button
                  type="button"
                  onClick={handlePrevWithDirection}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="-left-12 -translate-y-1/2 absolute bg-gray-800/80 cursor-pointer flex h-10 hover:bg-gray-700/80 items-center justify-center rounded-full shadow-md top-1/2 transition-colors w-10 z-10"
                  aria-label="Previous image"
                >
                  <CaretLeftIcon size={24} className="text-white" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleNextWithDirection}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="-right-12 -translate-y-1/2 absolute bg-gray-800/80 cursor-pointer flex h-10 hover:bg-gray-700/80 items-center justify-center rounded-full shadow-md top-1/2 transition-colors w-10 z-10"
                  aria-label="Next image"
                >
                  <CaretRightIcon size={24} className="text-white" />
                </motion.button>

                <div className="-translate-x-1/2 absolute bottom-4 flex gap-2 left-1/2 z-10">
                  {images.map((image, index) => (
                    <motion.button
                      key={image.id || image.src}
                      type="button"
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
