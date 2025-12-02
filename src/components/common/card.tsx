import { type ReactNode } from "react";

import { cn } from "@/utils/cn";

interface CardProps {
  cardContent: ReactNode;
  variant?:
    | "gradientDarkToLight"
    | "gradientLightToDark"
    | "gradientLightToForeground"
    | "background"
    | "transparent";
  className?: string;
  contentClassName?: string;
}

export const Card = ({
  cardContent,
  variant = "gradientLightToDark",
  className,
  contentClassName,
}: CardProps) => {
  const baseInnerClasses =
    "font-prompt gap-2 transition-all duration-200 w-full h-full";

  const variantStyles: Record<
    NonNullable<CardProps["variant"]>,
    {
      wrapper?: string;
      inner: string;
    }
  > = {
    gradientDarkToLight: {
      wrapper:
        "p-0.25 rounded-2xl bg-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:from-background [html[data-theme='dark']_&]:to-foreground/50 [html[data-theme='dark']_&]:shadow-none",
      inner: "rounded-2xl",
    },
    gradientLightToDark: {
      wrapper:
        "p-0.25 rounded-2xl bg-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:from-foreground/50 [html[data-theme='dark']_&]:to-background [html[data-theme='dark']_&]:shadow-none",
      inner: "rounded-2xl",
    },
    gradientLightToForeground: {
      wrapper:
        "p-0.25 rounded-2xl bg-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:from-background-light [html[data-theme='dark']_&]:to-foreground/50 [html[data-theme='dark']_&]:shadow-none",
      inner: "rounded-2xl",
    },
    background: {
      inner:
        "bg-background p-6 rounded-xl border border-foreground/25 flex justify-center items-center",
    },
    transparent: {
      wrapper: "bg-transparent  flex justify-center items-center",
      inner: "bg-transparent flex justify-center items-center",
    },
  };

  const { wrapper, inner } = variantStyles[variant];

  const cardElement = (
    <div
      className={cn(
        baseInnerClasses,
        inner,
        contentClassName,
        !wrapper && className,
      )}
    >
      {cardContent}
    </div>
  );

  if (!wrapper) {
    return cardElement;
  }

  return <div className={cn("w-full", wrapper, className)}>{cardElement}</div>;
};
