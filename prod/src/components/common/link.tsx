import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface NavLinkProps extends Omit<NextLinkProps, "href"> {
  href: string;
  text?: string;
  children?: ReactNode;
  variant?: "mobileGradient" | "menuItem";
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<NonNullable<NavLinkProps["variant"]>, string> = {
  mobileGradient: cn(
    "text-xl leading-relaxed",
    "text-transparent bg-clip-text",
    "transition-all duration-200",
    "cursor-pointer",
    "hover:opacity-80 hover:scale-105",
    "active:opacity-60 active:scale-95",
    "gradient-link-primary",
  ),
  menuItem: cn(
    "block w-full px-4 py-3 text-left text-base font-prompt font-normal transition-colors",
    "text-foreground hover:bg-primary/10",
  ),
};

export const NavLink = ({
  href,
  text,
  children,
  variant = "mobileGradient",
  className,
  onClick,
  ...props
}: NavLinkProps) => {
  const variantClass = variantStyles[variant];

  return (
    <NextLink
      href={href}
      onClick={onClick}
      className={cn(variantClass, className)}
      {...props}
    >
      {text || children}
    </NextLink>
  );
};

// Backward compatibility exports - these are convenience wrappers
export const MobileGradientLink = (props: Omit<NavLinkProps, "variant">) => (
  <NavLink {...props} variant="mobileGradient" />
);

export const MenuItemLink = (props: Omit<NavLinkProps, "variant">) => (
  <NavLink {...props} variant="menuItem" />
);
