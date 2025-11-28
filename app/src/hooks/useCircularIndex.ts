import { useCallback, useEffect, useState } from "react";

export const useCircularIndex = (
  totalItems: number,
  autoplayInterval: number = 5000,
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  }, [totalItems]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  }, [totalItems]);

  const handlePrevWithDirection = useCallback(() => {
    setDirection(-1);
    handlePrev();
  }, [handlePrev]);

  const handleNextWithDirection = useCallback(() => {
    setDirection(1);
    handleNext();
  }, [handleNext]);

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAutoplay = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      handleNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [handleNext, autoplayInterval, isPaused]);

  return {
    currentIndex,
    setCurrentIndex,
    direction,
    setDirection,
    handlePrev,
    handleNext,
    handlePrevWithDirection,
    handleNextWithDirection,
    pauseAutoplay,
    resumeAutoplay,
  };
};
