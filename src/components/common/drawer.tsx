"use client";

import { XIcon } from "@phosphor-icons/react";
import { cn } from "@utils/cn";
import React, { useEffect } from "react";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
  content?: React.ReactNode;
  className?: string;
};

export const Drawer = ({
  isOpen,
  onClose,
  content,
  className,
}: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-99999",
        isOpen ? "block" : "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-background transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-50" : "opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute top-0 right-0 h-full bg-background p-4 shadow-lg transform transition-transform duration-300 ease-in-out w-80",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        <button
          className="absolute h-6 right-8 sm:top-11 w-6"
          onClick={onClose}
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div>{content}</div>
      </aside>
    </div>
  );
};
