"use client";

import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { cn } from "@utils/cn";
import { type ReactNode, useEffect } from "react";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
  content?: ReactNode;
  className?: string;
};

export const Drawer = ({
  isOpen,
  onClose,
  content,
  className,
}: DrawerProps) => {
  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined")
      return;

    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow || "unset";
    }

    const handleResize = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow || "unset";
      window.removeEventListener("resize", handleResize);
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
        data-drawer-open={isOpen}
        className={cn(
          "absolute top-0 right-0 h-full bg-background p-4 shadow-lg transform transition-transform duration-300 ease-in-out w-80 box-border",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        <button
          className="absolute h-6 lg:top-10 right-16 w-6"
          onClick={onClose}
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="h-full overflow-x-hidden overflow-y-auto scrollbar-thin">
          {content}
        </div>
      </aside>
    </div>
  );
};
