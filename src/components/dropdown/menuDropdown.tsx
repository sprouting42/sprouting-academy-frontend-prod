"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useRef } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

interface MenuDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  className?: string;
  align?: "left" | "right";
  width?: string;
}

export const MenuDropdown = ({
  trigger,
  children,
  isOpen,
  onToggle,
  onClose,
  className,
  align = "right",
  width = "w-48",
}: MenuDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, onClose, { enabled: isOpen });

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div onClick={onToggle}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-14 bg-background-light rounded-2xl shadow-xl border border-foreground/10 overflow-hidden z-50",
              width,
              align === "right" ? "right-0" : "left-0",
            )}
          >
            <div className="py-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
