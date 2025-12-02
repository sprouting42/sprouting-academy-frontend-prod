"use client";
import { motion } from "framer-motion";

import {
  HAMBURGER_LINE_VARIANTS,
  HAMBURGER_TRANSITION,
} from "@/constants/navigationBar";
import { cn } from "@/utils/cn";

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerButton = ({ isOpen, onToggle }: HamburgerButtonProps) => (
  <div className="lg:hidden relative">
    <motion.button
      onClick={onToggle}
      className={cn(
        "w-6 h-6 cursor-pointer relative z-60",
        isOpen
          ? "flex items-center justify-center"
          : "flex flex-col justify-center gap-1",
      )}
      whileHover={{ opacity: 0.8 }}
      whileTap={{ opacity: 0.6 }}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <motion.span
        className={cn(
          "h-0.75 bg-primary rounded-full block",
          isOpen &&
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
        variants={HAMBURGER_LINE_VARIANTS.topBottom}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={HAMBURGER_TRANSITION}
      />
      <div
        className={cn(
          "relative",
          isOpen && "absolute top-1/2 left-0 -translate-y-1/2 w-full",
        )}
      >
        <motion.span
          className="bg-primary block h-0.75 rounded-full w-6"
          variants={HAMBURGER_LINE_VARIANTS.middleTop}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={HAMBURGER_TRANSITION}
        />
        <motion.span
          className="absolute bg-primary block h-0.75 left-0 rounded-full top-0 w-6"
          variants={HAMBURGER_LINE_VARIANTS.middleBottom}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={HAMBURGER_TRANSITION}
        />
      </div>
      <motion.span
        className={cn(
          "h-0.75 bg-primary rounded-full block",
          isOpen &&
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
        variants={HAMBURGER_LINE_VARIANTS.topBottom}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={HAMBURGER_TRANSITION}
      />
    </motion.button>
  </div>
);
