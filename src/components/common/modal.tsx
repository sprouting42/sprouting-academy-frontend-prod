"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

import { Button } from "./button";
import { Card } from "./card";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  lockScroll?: boolean;
  size?: ModalSize;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  btnClassName?: string;
  position?: "topLeft" | "topRight" | "center" | "bottomLeft" | "bottomRight";
  closeButtonProps?: ComponentProps<typeof Button>;
  buttons?: ReactNode;
}

export const Modal = ({
  open = false,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
  lockScroll = false,
  size = "md",
  className,
  overlayClassName,
  contentClassName,
  btnClassName,
  position = "center",
  buttons,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useClickOutside(modalRef, () => {
    if (closeOnOverlayClick && open) {
      handleClose();
    }
  });

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!lockScroll) {
      return;
    }

    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    return;
  }, [lockScroll, open]);

  useEffect(() => {
    if (!open || !onClose) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, handleClose]);

  const overlayPositionClasses: Record<
    NonNullable<ModalProps["position"]>,
    { overlay: string; content: string }
  > = {
    topLeft: {
      overlay: "items-start justify-start",
      content: "items-start text-left",
    },
    topRight: {
      overlay: "items-start justify-end",
      content: "items-end text-right",
    },
    center: {
      overlay: "items-center justify-center",
      content: "items-center text-center",
    },
    bottomLeft: {
      overlay: "items-end justify-start",
      content: "items-start text-left",
    },
    bottomRight: {
      overlay: "items-end justify-end",
      content: "items-end text-right",
    },
  };

  const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-80",
    md: "max-w-120",
    lg: "max-w-160",
    xl: "max-w-205",
  };

  const modalContent = (
    <div
      className={cn(
        "fixed inset-0 z-999 flex w-full p-4 backdrop-blur-sm transition-opacity duration-200",
        overlayPositionClasses[position].overlay,
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        overlayClassName,
      )}
    >
      <Card
        variant="gradientDarkToLight"
        className={cn("w-full", sizeClasses[size], className)}
        contentClassName={cn(
          "relative z-1000 flex h-full flex-col gap-4 rounded-2xl p-4 outline-none transition-all duration-200 ease-out bg-gradient-to-b from-background-light to-background",
          open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          contentClassName,
        )}
        cardContent={
          <div ref={modalRef} className={cn("flex flex-col gap-4 w-full")}>
            {title && (
              <div className="flex flex-col w-full">
                <div className="font-medium font-prompt leading-7 lg:leading-normal lg:text-3xl text-foreground text-xl">
                  {title}
                </div>
              </div>
            )}

            {children ? (
              children
            ) : (
              <div className={cn("flex flex-col gap-4 w-full", btnClassName)}>
                {description && <div className="w-full">{description}</div>}
                {buttons}
              </div>
            )}
          </div>
        }
      />
    </div>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(modalContent, document.body);
};
