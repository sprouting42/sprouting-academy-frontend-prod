import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?:
    | "primary"
    | "primaryGradientBorder"
    | "secondaryGradientBorder"
    | "squareButton"
    | "circleButton"
    | "tertiaryGradientBorder"
    | "iconOnly"
    | "errorButton"
    | "profileButton"
    | "textButton"
    | "menuItemDanger"
    | "lightButton";
  size?: "sm" | "md" | "lg";
  shape?: "square" | "rounded" | "circle";
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
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
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const isIconOnly = variant === "iconOnly";
  const isTextButton = variant === "textButton";
  const isMenuItemDanger = variant === "menuItemDanger";
  const isProfileButton = variant === "profileButton";

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
      inner: cn("bg-primary text-white font-medium", interactiveStates),
    },
    primaryGradientBorder: {
      inner: cn("bg-primary text-white font-medium w-full", interactiveStates),
      wrapper:
        "inline-block rounded-full bg-linear-to-br from-primary via-secondary to-primary p-0.5",
    },
    secondaryGradientBorder: {
      inner: cn(
        "bg-secondary text-white font-medium w-full",
        interactiveStates,
      ),
      wrapper:
        "inline-block rounded-full bg-linear-to-br from-secondary via-primary to-secondary p-0.5",
    },
    tertiaryGradientBorder: {
      inner: cn(
        "bg-foreground/2 [html[data-theme='dark']_&]:bg-gradient-to-b [html[data-theme='dark']_&]:from-background-light [html[data-theme='dark']_&]:to-background text-foreground font-medium w-full",
        interactiveStates,
      ),
      wrapper:
        "inline-block rounded-full p-px border border-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:border-0 [html[data-theme='dark']_&]:shadow-none [html[data-theme='dark']_&]:bg-linear-to-t [html[data-theme='dark']_&]:from-foreground/50 [html[data-theme='dark']_&]:to-background-light [&_svg]:h-6 [&_svg]:w-6",
    },
    squareButton: {
      inner: cn(
        "bg-gradient-to-b from-primary to-secondary text-white font-medium w-full",
        interactiveStates,
      ),
    },
    circleButton: {
      inner: cn("social-icon-bg text-primary font-medium", interactiveStates),
    },
    iconOnly: {
      inner:
        "bg-transparent enabled:hover:opacity-80 enabled:active:opacity-60 enabled:active:scale-95",
    },
    errorButton: {
      inner: cn(
        "bg-[var(--error)] text-white font-medium w-full",
        interactiveStates,
      ),
    },
    textButton: {
      inner: cn(
        "bg-transparent text-foreground/50 font-normal",
        "[html[data-theme='light']_&]:text-foreground/70",
        "enabled:hover:text-primary transition-colors duration-200",
        "flex items-center gap-2",
      ),
    },
    menuItemDanger: {
      inner: cn(
        "w-full px-4 py-3 text-left text-base font-prompt transition-colors",
        "bg-transparent text-[var(--error)] font-normal",
        "enabled:hover:bg-[color-mix(in_srgb,var(--error)_10%,transparent)]",
      ),
    },
    profileButton: {
      inner:
        "bg-background-light flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:opacity-80 active:opacity-60 active:scale-95 shrink-0 overflow-hidden aspect-square relative",
    },
    lightButton: {
      inner: cn(
        "bg-foreground text-background font-medium shadow-[0px_2px_8px_rgba(0,0,0,0.12)]",
        interactiveStates,
      ),
    },
  };

  const sizeClasses = {
    sm: "py-2 px-4 md:py-3 md:px-6 text-sm md:text-base",
    md: "py-2.5 px-5 md:py-3 md:px-6 text-base md:text-lg",
    lg: "w-8 h-8 md:w-10 md:h-10 text-base md:text-lg font-black",
  };

  const textButtonSizeClasses = {
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
    square: "rounded-xl",
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
  const hasGradientBorderWrapper =
    wrapper &&
    (variant === "primaryGradientBorder" ||
      variant === "secondaryGradientBorder" ||
      variant === "tertiaryGradientBorder");

  const getWrapperClassName = () => {
    if (!wrapper) return "";
    if (hasGradientBorderWrapper && shape === "square") {
      return wrapper.replace("rounded-full", "rounded-xl");
    }
    return wrapper;
  };

  const getSizeClass = () => {
    if (isIconOnly) return iconSizeClasses[size];
    if (isTextButton) return textButtonSizeClasses[size];
    if (!isProfileButton && !isMenuItemDanger) return sizeClasses[size];
    return "";
  };

  const getButtonContent = () => {
    if (loading) return loadingIndicator;
    if (isProfileButton) return children;
    return (
      <>
        {icon}
        {text || children}
      </>
    );
  };

  const buttonElement = (
    <button
      className={cn(
        !isProfileButton &&
          !isTextButton &&
          !isMenuItemDanger &&
          baseButtonClasses,
        inner,
        !isProfileButton &&
          !isTextButton &&
          !isMenuItemDanger &&
          shapeClasses[shape],
        getSizeClass(),
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {getButtonContent()}
    </button>
  );

  if (!wrapper || isProfileButton || isTextButton || isMenuItemDanger) {
    return buttonElement;
  }

  return (
    <div className={cn(getWrapperClassName(), className)}>{buttonElement}</div>
  );
};
