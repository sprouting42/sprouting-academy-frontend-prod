import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface BadgeProps {
  text: string;
  subtitle?: string;
  variant?:
    | "primary"
    | "secondary"
    | "transparentPrimary"
    | "transparentSecondary"
    | "error"
    | "premium"
    | "courseDate";
  size?: "xs" | "sm" | "md" | "lg";
  shape?: "square" | "rounded";
  icon?: ReactNode;
  className?: string;
}

export const Badge = ({
  text,
  subtitle,
  variant = "primary",
  size = "sm",
  shape = "rounded",
  icon,
  className,
}: BadgeProps) => {
  const baseClasses = "flex items-start";

  const variantClasses = {
    primary: "w-fit bg-primary text-white font-normal font-prompt",
    secondary:
      "w-fit bg-gradient-to-b from-primary to-secondary text-white font-normal font-prompt",
    transparentPrimary:
      "w-fit bg-primary-light text-primary [html[data-theme='dark']_&]:text-foreground font-semibold font-prompt",
    transparentSecondary: "w-fit bg-secondary-light text-secondary font-prompt",
    error: "w-fit bg-[var(--error)] text-white font-normal font-prompt",
    premium: "w-fit bg-premium text-white font-bold font-prompt",
    courseDate: "w-fit bg-course-date-badge text-black font-normal font-prompt",
  };

  const sizeClasses = {
    xs: "px-4 py-2 text-sm",
    sm: "px-4 py-2 text-sm",
    md: "px-3 py-1 text-sm",
    lg: "px-3 py-1 text-base",
  };

  const shapeClasses = {
    square: "rounded-lg",
    rounded: "rounded-full",
  };

  const hasGap = icon || subtitle;

  return (
    <div>
      <div
        className={cn(
          baseClasses,
          hasGap && "gap-2",
          variantClasses[variant],
          sizeClasses[size],
          shapeClasses[shape],
          className,
        )}
      >
        {icon}
        {subtitle && <span className="font-semibold!">{subtitle} </span>}
        <span className="font-normal!">{text}</span>
      </div>
    </div>
  );
};
