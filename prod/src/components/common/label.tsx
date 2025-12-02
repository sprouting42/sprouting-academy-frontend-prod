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
        "flex items-center justify-start gap-2 lg:text-lg font-prompt text-base",
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            "w-6 h-6 flex items-center justify-center shrink-0 flex-none",
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
