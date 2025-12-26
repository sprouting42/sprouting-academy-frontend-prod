"use client";

import { Info } from "@phosphor-icons/react";
import { CalendarBlankIcon } from "@phosphor-icons/react/dist/csr/CalendarBlank";
import React, { useCallback, useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";
import { formatDateShort } from "@/utils/dateFormatter";

import { DATE_SELECTOR_MESSAGES } from "../utils/cartDrawerConstants";

interface DateSelectorProps {
  value: string;
  options: string[];
  onChange: (date: string) => void;
  hasError: boolean;
}

export const DateSelector = ({
  value,
  options,
  onChange,
  hasError,
}: DateSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = useCallback(
    (date: string) => {
      onChange(date);
      setIsOpen(false);
    },
    [onChange],
  );

  const formattedValue =
    value && value !== DATE_SELECTOR_MESSAGES.PLACEHOLDER
      ? formatDateShort(value)
      : "";
  const displayValue = formattedValue || DATE_SELECTOR_MESSAGES.PLACEHOLDER;
  const isPlaceholder = !value || value === DATE_SELECTOR_MESSAGES.PLACEHOLDER;

  return (
    <div className="py-4 w-full" ref={dropdownRef}>
      <div className="flex gap-2 items-center mb-4">
        <CalendarBlankIcon
          size={16}
          weight="duotone"
          className="text-foreground/80"
        />
        <span className="font-prompt text-foreground/80 text-sm">
          {DATE_SELECTOR_MESSAGES.LABEL}
        </span>
      </div>
      <div className="max-w-72 relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full px-4 py-2 rounded-xl",
            "bg-[rgba(15,15,15,1)] border border-foreground/10",
            "font-prompt text-sm text-left transition-colors",
            hasError && "border-error",
          )}
        >
          <span
            className={isPlaceholder ? "text-foreground/40" : "text-foreground"}
          >
            {displayValue}
          </span>
          {isOpen ? (
            <GoTriangleUp className="text-foreground/40" />
          ) : (
            <GoTriangleDown className="text-foreground/40" />
          )}
        </button>

        {isOpen && (
          <div className="absolute bg-cart-background border border-foreground/20 mt-1 overflow-hidden rounded-xl shadow-lg w-full z-50">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  "w-full px-4 py-2.5 text-left font-prompt text-sm",
                  "hover:bg-foreground/10 transition-colors",
                  option === value && "bg-foreground/5",
                )}
              >
                {option === DATE_SELECTOR_MESSAGES.PLACEHOLDER
                  ? option
                  : formatDateShort(option)}
              </button>
            ))}
          </div>
        )}
      </div>
      {hasError && (
        <div className="flex gap-1 items-center mt-2 text-error">
          <Info size={14} />
          <span className="font-prompt text-sm">
            {DATE_SELECTOR_MESSAGES.ERROR}
          </span>
        </div>
      )}
    </div>
  );
};
