import { type ReactNode, useCallback, useRef, useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";

interface DropdownProps {
  icon: ReactNode;
  title: string;
  required: boolean;
  options: string[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary";
}

export const Dropdown = ({
  icon,
  title,
  required,
  options,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  loading,
  variant = "primary",
}: DropdownProps) => {
  const variantClasses = {
    primary: " font-prompt text-foreground font-medium cursor-pointer",
  };

  const varianStyles = {
    primary:
      "border border-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:border-0 [html[data-theme='dark']_&]:shadow-none [html[data-theme='dark']_&]:bg-linear-to-t [html[data-theme='dark']_&]:from-foreground/50 [html[data-theme='dark']_&]:to-background-light",
  };
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = useCallback(
    (opt: string) => {
      onChange(opt);
      setOpen(false);
    },
    [onChange],
  );

  useClickOutside(rootRef, () => setOpen(false));

  return (
    <div className={cn("w-full", className)} ref={rootRef}>
      <div className={cn("flex flex-col gap-1")}>
        <div className={cn("flex gap-2 items-center", variantClasses[variant])}>
          {icon}
          {title}
          {required && <span className="text-red-500">*</span>}
        </div>
        <div
          className={cn(
            "w-full p-0.5 [&_svg]:w-6 [&_svg]:h-6 relative rounded-full",
            varianStyles[variant],
          )}
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            className={cn(
              "w-full rounded-full bg-background text-foreground relative",
              "px-4 py-3 pr-10 font-prompt text-sm text-left",
              (disabled || loading) && "opacity-60 cursor-not-allowed",
              variantClasses[variant],
            )}
            onClick={() => {
              if (disabled || loading) return;
              setOpen((v) => !v);
            }}
            disabled={disabled || loading}
          >
            <span
              className={cn(!value && placeholder ? "text-foreground/60" : "")}
            >
              {value || placeholder}
            </span>
            <span className="absolute flex inset-y-0 items-center pointer-events-none right-3">
              {open ? <GoTriangleUp /> : <GoTriangleDown />}
            </span>
          </button>

          {open && (
            <div
              className={cn(
                "absolute z-100 top-full left-0 mt-1 w-full",
                "p-0.5 shadow-lg rounded-2xl",
                varianStyles[variant],
              )}
            >
              <ul
                className={cn(
                  "max-h-60 overflow-auto",
                  "bg-background",
                  "focus:outline-none rounded-2xl",
                  className,
                )}
              >
                {options?.map((opt) => {
                  const selected = opt === value;
                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        className={cn(
                          "w-full text-left px-4 py-2 cursor-pointer font-prompt text-sm",
                          selected
                            ? "bg-foreground/10"
                            : "hover:bg-foreground/5",
                        )}
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
