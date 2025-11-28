import { type ReactNode } from "react";

import { cn } from "@/utils/cn";

interface GradientBorderWrapperProps {
  children: ReactNode;
  className?: string;
}

export const GradientBorderWrapper = ({
  children,
  className,
}: GradientBorderWrapperProps) => {
  return (
    <div
      className={cn(
        "p-1 rounded-full bg-linear-to-r from-primary to-secondary inline-flex items-center justify-center lg:p-0.5",
        className,
      )}
    >
      {children}
    </div>
  );
};
