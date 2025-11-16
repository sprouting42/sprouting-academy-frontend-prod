import React from "react";

import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?:
    | "primary"
    | "primaryGradientBorder"
    | "secondaryGradientBorder"
    | "squareButton"
    | "circleButton"
    | "tertiaryGradientBorder"
    | "iconOnly"
    | "linkButton";
  size?: "sm" | "md" | "lg";
  shape?: "square" | "rounded" | "circle";
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export const Button = ({
  text,
  variant = "primary",
  size = "md",
  shape = "square",
  icon,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const isIconOnly = variant === "iconOnly";
  const isLinkButton = variant === "linkButton";

  const baseButtonClasses =
    "font-prompt flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const interactiveStates =
    "enabled:hover:opacity-90 enabled:active:opacity-80 enabled:active:scale-[0.98]";

  const variantStyles: Record<
    NonNullable<ButtonProps["variant"]>,
    {
      inner: string;
      wrapper?: string;
    }
  > = {
    primary: {
      inner: cn("bg-primary text-foreground font-medium", interactiveStates),
    },
    primaryGradientBorder: {
      inner: cn(
        "bg-primary text-foreground font-medium w-full",
        interactiveStates,
      ),
      wrapper:
        "inline-block rounded-full bg-linear-to-br from-primary via-secondary to-primary p-0.5",
    },
    secondaryGradientBorder: {
      inner: cn(
        "bg-secondary text-foreground font-medium w-full",
        interactiveStates,
      ),
      wrapper:
        "inline-block rounded-full bg-linear-to-br from-secondary via-primary to-secondary p-0.5",
    },
    tertiaryGradientBorder: {
      inner: cn(
        "bg-gradient-to-b from-background-light to-background text-foreground font-medium w-full",
        interactiveStates,
      ),
      wrapper:
        "inline-block rounded-full p-px bg-linear-to-t from-foreground/50 to-background-light [&_svg]:h-6 [&_svg]:w-6",
    },
    squareButton: {
      inner: cn(
        "bg-gradient-to-b from-primary to-secondary text-foreground font-medium w-full",
        interactiveStates,
      ),
    },
    circleButton: {
      inner: cn("bg-foreground text-primary font-medium", interactiveStates),
    },
    iconOnly: {
      inner:
        "bg-transparent enabled:hover:opacity-80 enabled:active:opacity-60 enabled:active:scale-95",
    },
    linkButton: {
      inner: cn(
        "bg-transparent text-foreground/50 font-normal",
        "enabled:hover:text-primary transition-colors duration-200",
      ),
    },
  };

  const sizeClasses = {
    sm: "py-3 px-6 text-base",
    md: "py-3 px-6 text-lg",
    lg: "w-10 h-10 text-lg font-black",
  };

  const linkButtonSizeClasses = {
    sm: "text-sm leading-5 lg:leading-6 lg:text-base",
    md: "text-base leading-5 lg:leading-6 lg:text-base",
    lg: "text-lg leading-6 lg:leading-7 lg:text-lg",
  };

  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const shapeClasses = {
    square: "rounded-lg",
    rounded: "rounded-full",
    circle: "rounded-full aspect-square",
  };

  const loadingIndicator = (
    <div className="flex gap-2 items-center">
      <div className="animate-spin border-2 border-foreground/30 border-t-foreground h-4 rounded-full w-4" />
      {text && <span>{text}</span>}
    </div>
  );

  const { wrapper, inner } = variantStyles[variant];

  const buttonElement = (
    <button
      className={cn(
        baseButtonClasses,
        inner,
        !isLinkButton && shapeClasses[shape],
        isIconOnly
          ? iconSizeClasses[size]
          : isLinkButton
            ? linkButtonSizeClasses[size]
            : sizeClasses[size],
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        loadingIndicator
      ) : (
        <>
          {isLinkButton && icon}
          {text}
          {!isLinkButton && icon}
        </>
      )}
    </button>
  );

  if (!wrapper || isLinkButton) {
    return buttonElement;
  }

  return <div className={cn(wrapper, className)}>{buttonElement}</div>;
};
