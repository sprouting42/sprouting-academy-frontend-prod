import React from "react";

import { cn } from "@/utils/cn";

interface BadgeProps {
  text: string;
  subtitle?: string;
  variant?:
    | "primary"
    | "secondary"
    | "transparentPrimary"
    | "transparentSecondary";
  size?: "xs" | "sm" | "md" | "lg";
  shape?: "square" | "rounded";
  icon?: React.ReactNode;
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
    primary: "w-fit bg-primary text-foreground font-normal font-prompt",
    secondary:
      "w-fit bg-gradient-to-b from-primary to-secondary text-foreground font-normal font-prompt",
    transparentPrimary:
      "w-fit bg-primary-light text-foreground font-semibold font-prompt",
    transparentSecondary: "w-fit bg-secondary-light text-secondary font-prompt",
  };

  const sizeClasses = {
    xs: "px-4 py-2 text-sm font-normal",
    sm: "px-4 py-2 text-sm font-semibold",
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
        {subtitle && <span className="font-semibold">{subtitle}</span>}
        {text}
      </div>
    </div>
  );
};
