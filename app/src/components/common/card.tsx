import { cn } from "@/utils/cn";

interface CardProps {
  cardContent: React.ReactNode;
  variant?:
    | "gradientDarkToLight"
    | "gradientLightToDark"
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
        "p-0.5 bg-linear-to-t from-foreground/50 to-background rounded-2xl",
      inner: "rounded-2xl",
    },
    gradientLightToDark: {
      wrapper:
        "p-0.5 bg-linear-to-t from-background to-foreground/50 rounded-2xl",
      inner: "rounded-2xl",
    },
    background: {
      inner:
        "bg-background p-[1.5625rem] rounded-[0.875rem] border border-foreground/25 flex justify-center items-center",
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

  return <div className={cn("w-full ", wrapper, className)}>{cardElement}</div>;
};
