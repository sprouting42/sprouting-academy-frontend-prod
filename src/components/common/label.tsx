import React from "react";

import { cn } from "@/utils/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  icon?: React.ReactNode;
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
        "flex items-center justify-start text-[18px] font-prompt",
        className,
      )}
    >
      {icon && (
        <span className={cn("mr-1 w-6 h-6 flex items-center")}>{icon}</span>
      )}
      {text}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
