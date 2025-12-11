import type { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  icon?: ReactNode;
  required?: boolean;
}

export const Label = ({
  text,
  className,
  icon,
  required,
  ...props
}: LabelProps) => {
  return (
    <label
      {...props}
      className={cn(
        "flex items-center justify-start gap-1.5 md:gap-2 text-sm md:text-base lg:text-lg font-prompt",
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            "flex items-center justify-center shrink-0 flex-none",
            "[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6",
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex gap-1 items-center">
        {text}
        {required && <span className="text-foreground">*</span>}
      </span>
    </label>
  );
};
