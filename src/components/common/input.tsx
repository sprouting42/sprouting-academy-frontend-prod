"use client";

import {
  type ChangeEvent,
  type ClipboardEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { PiCheckBold } from "react-icons/pi";

import { cn } from "@/utils/cn";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onBlur" | "value" | "type" | "prefix"
  > {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  value?: string;
  type?: string;
  loading?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: "primary" | "secondary";
  inputClassName?: string;
}

interface OtpInputProps {
  length: number;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  inputClassName?: string;
}

interface FileInputProps {
  onChange?: (file: File | null) => void;
  accept?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-required"?: boolean | "true" | "false";
}

interface CheckboxInputProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: "primary";
  size?: "sm" | "md" | "lg";
  className?: string;
  checkboxClassName?: string;
  iconClassName?: string;
  content?: ReactNode;
  id?: string;
  name?: string;
  value?: string;
}

export const Input = ({
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  disabled = false,
  loading = false,
  required = false,
  prefix,
  suffix,
  variant = "primary",
  className,
  inputClassName,
  ...props
}: InputProps) => {
  const isDisabled = disabled || loading;
  const getPaddingClass = () => {
    if (prefix) return " pl-2 pr-4 py-2 md:py-3";
    if (suffix) return " pl-4 pr-2 py-2 md:py-3";
    return " px-4 py-2 md:py-3";
  };
  const variantClasses = {
    primary:
      "h-10 md:h-12 w-full text-sm md:text-base text-foreground font-prompt " +
      "placeholder:text-foreground/50 border-0 focus:outline-none rounded-full bg-foreground/2 [html[data-theme='dark']_&]:bg-background-light " +
      (isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-text hover:opacity-90 focus:opacity-95 transition-all duration-200") +
      getPaddingClass(),

    secondary:
      "h-12 w-full text-foreground font-prompt " +
      "placeholder:text-foreground/50 border-0 focus:outline-none rounded-full bg-base-300 " +
      (isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-text hover:opacity-90 focus:opacity-95 transition-all duration-200") +
      getPaddingClass(),
  };

  if (variant === "secondary") {
    return (
      <div
        className={cn(
          "rounded-full p-[1.3px] [html[data-theme='light']_&]:bg-gradient-to-b [html[data-theme='light']_&]:from-[#EEEEEE] [html[data-theme='light']_&]:to-[#DEDEDE] [html[data-theme='dark']_&]:bg-gradient-to-b [html[data-theme='dark']_&]:from-[#454545] [html[data-theme='dark']_&]:to-base-300 overflow-hidden relative flex items-center " +
            "transition-all duration-200 " +
            (isDisabled ? "" : "hover:opacity-90 focus-within:opacity-95"),
          className,
        )}
      >
        {prefix && (
          <div className="flex items-center justify-center pl-2 shrink-0">
            {prefix}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          disabled={isDisabled}
          required={required}
          className={cn(variantClasses[variant], inputClassName)}
          {...props}
        />
        {suffix && (
          <div className="flex items-center justify-center pr-2 shrink-0">
            {suffix}
          </div>
        )}
        {loading && (
          <div className="absolute flex inset-0 items-center justify-end pointer-events-none pr-4">
            <div className="animate-spin border-2 border-foreground/30 border-t-foreground h-4 rounded-full w-4" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full p-px border border-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:border-0 [html[data-theme='dark']_&]:shadow-none [html[data-theme='dark']_&]:bg-linear-to-t [html[data-theme='dark']_&]:from-foreground/50 [html[data-theme='dark']_&]:to-background-light overflow-hidden relative flex items-center " +
          "transition-all duration-200 " +
          (isDisabled
            ? ""
            : "hover:shadow-sm focus-within:shadow-md [html[data-theme='dark']_&]:hover:from-foreground/70 [html[data-theme='dark']_&]:hover:to-background-light [html[data-theme='dark']_&]:focus-within:from-foreground/90 [html[data-theme='dark']_&]:focus-within:to-background-light"),
        className,
      )}
    >
      {prefix && (
        <div className="flex items-center justify-center pl-2 shrink-0">
          {prefix}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        disabled={isDisabled}
        required={required}
        className={cn(variantClasses[variant], inputClassName)}
        {...props}
      />
      {suffix && (
        <div className="flex items-center justify-center pr-2 shrink-0">
          {suffix}
        </div>
      )}
      {loading && (
        <div className="absolute flex inset-0 items-center justify-end pointer-events-none pr-4">
          <div className="animate-spin border-2 border-foreground/30 border-t-foreground h-4 rounded-full w-4" />
        </div>
      )}
    </div>
  );
};

export const OtpInput = ({
  length,
  placeholder,
  value = "",
  onChange,
  disabled = false,
  variant = "primary",
  className,
  inputClassName,
}: OtpInputProps) => {
  const inputId = useId();
  const variantClasses = {
    primary:
      "w-full lg:h-12 h-8 text-center text-foreground font-medium rounded-full bg-background-light focus:outline-none focus:ring-0 " +
      (disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"),
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getValueArray = useCallback(() => {
    const chars = value.split("");
    if (chars.length < length) {
      chars.push(...Array(length - chars.length).fill(""));
    }
    return chars.slice(0, length);
  }, [length, value]);

  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus();
      }
    },
    [length],
  );

  const updateValue = useCallback(
    (valueArray: string[]) => {
      onChange?.(valueArray.join("").slice(0, length));
    },
    [length, onChange],
  );

  const fillFromIndex = useCallback(
    (startIndex: number, rawValue: string) => {
      const digits = rawValue.replace(/\D/g, "");
      if (!digits) return;

      const valueArray = getValueArray();
      let nextIndex = startIndex;

      for (const digit of digits) {
        if (nextIndex >= length) break;
        valueArray[nextIndex] = digit;
        nextIndex += 1;
      }

      updateValue(valueArray);
      const nextFocusIndex = Math.min(nextIndex, length - 1);
      focusInput(nextFocusIndex);
    },
    [focusInput, getValueArray, length, updateValue],
  );

  const handleChange = useCallback(
    (index: number, newValue: string) => {
      if (!newValue) {
        const valueArray = getValueArray();
        valueArray[index] = "";
        updateValue(valueArray);
        return;
      }

      fillFromIndex(index, newValue);
    },
    [fillFromIndex, getValueArray, updateValue],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const valueArray = getValueArray();

        if (valueArray[index]) {
          valueArray[index] = "";
          updateValue(valueArray);
        } else if (index > 0) {
          valueArray[index - 1] = "";
          updateValue(valueArray);
          focusInput(index - 1);
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusInput(index - 1);
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        focusInput(index + 1);
        return;
      }
    },
    [focusInput, getValueArray, updateValue],
  );

  const handlePaste = useCallback(
    (index: number, e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const clipboardData = e.clipboardData.getData("text");
      fillFromIndex(index, clipboardData);
    },
    [fillFromIndex],
  );

  const valueArray = getValueArray();

  if (variant === "primary") {
    return (
      <div className={cn("flex gap-3 lg:gap-4", className)}>
        {Array.from({ length }).map((_, index) => (
          <div
            key={`${inputId}-${index}`}
            className="bg-linear-to-t from-foreground/50 p-px relative rounded-full to-background-light"
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              id={`otp-input-${index}`}
              name={`otp-${index}`}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              pattern="[0-9]"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              value={valueArray[index] ?? ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
              onFocus={(e) => e.currentTarget.select()}
              disabled={disabled}
              className={cn(variantClasses[variant], inputClassName)}
            />
            {placeholder && !(valueArray[index] ?? "") && (
              <div className="[html[data-theme='light']_&]:text-foreground/30 absolute flex inset-0 items-center justify-center pointer-events-none rounded-full text-foreground/50">
                {placeholder}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Primary variant (default) - OtpInput currently only supports primary variant
  return (
    <div className={cn("flex gap-3 lg:gap-4", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={`${inputId}-${index}`}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          id={`otp-input-${index}`}
          name={`otp-${index}`}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          pattern="[0-9]"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          value={valueArray[index] ?? ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.currentTarget.select()}
          className={cn(variantClasses.primary, inputClassName)}
        />
      ))}
    </div>
  );
};

export const FileInput = ({
  onChange,
  accept,
  className,
  inputClassName,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-required": ariaRequired,
}: FileInputProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : null);
    onChange?.(file);
  };

  const handleClick = (e: MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const variantClasses = {
    primary:
      "h-auto w-full text-foreground font-prompt p-6 " +
      "border-0 focus:outline-none rounded-full bg-background cursor-pointer flex items-center gap-2.5",
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        aria-label={ariaLabel}
        aria-required={ariaRequired}
      />
      <div
        className={cn(
          "rounded-full p-px border border-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:border-0 [html[data-theme='dark']_&]:shadow-none [html[data-theme='dark']_&]:bg-linear-to-t [html[data-theme='dark']_&]:from-foreground/50 [html[data-theme='dark']_&]:to-background-light overflow-hidden",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        onClick={(e) => {
          if (disabled) return;
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === "") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <button
          type="button"
          disabled={disabled}
          className={cn(
            variantClasses.primary,
            disabled && "cursor-not-allowed",
            inputClassName,
          )}
          onClick={handleClick}
        >
          <span
            className={cn(
              "bg-secondary/12 rounded-4xl px-4 py-2 text-secondary font-semibold font-promt whitespace-nowrap",
              inputClassName,
            )}
          >
            Choose File
          </span>
          <span className="text-foreground/50">
            {fileName || "No file chosen"}
          </span>
        </button>
      </div>
    </>
  );
};

export const CheckboxInput = ({
  content,
  checked,
  onChange,
  variant = "primary",
  size = "md",
  className,
  checkboxClassName,
  iconClassName,
  id,
  name,
  value,
}: CheckboxInputProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2",
  };

  const iconSizes = {
    sm: "w-2 h-2",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  if (variant === "primary") {
    return (
      <label
        className={cn(
          "inline-flex items-center gap-4 cursor-pointer",
          className,
        )}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />

        <span
          className={cn(
            "inline-flex items-center justify-center rounded-md border-white transition-all",
            sizeClasses[size],
            checked
              ? "bg-foreground [html[data-theme='light']_&]:bg-foreground"
              : "bg-background [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-3 [html[data-theme='light']_&]:border-foreground",
            checkboxClassName,
          )}
        >
          {checked && (
            <PiCheckBold
              className={cn(
                "text-background [html[data-theme='light']_&]:text-white",
                iconSizes[size],
                iconClassName,
              )}
            />
          )}
        </span>
        {content && (
          <span className="font-prompt text-foreground w-full">{content}</span>
        )}
      </label>
    );
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      className={cn("border-2 border-white bg-background", sizeClasses[size])}
    />
  );
};

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  textareaClassName?: string;
  rows?: number;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export const Textarea = ({
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  loading = false,
  required = false,
  variant = "primary",
  className,
  textareaClassName,
  rows = 4,
  id,
  name,
  autoComplete,
}: TextareaProps) => {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary:
      "w-full h-full text-foreground font-prompt " +
      "placeholder:text-foreground/50 border-0 focus:outline-none rounded-2xl bg-foreground/2 [html[data-theme='dark']_&]:bg-background-light " +
      "px-6 py-1.5 resize-none overflow-y-auto " +
      (isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-text hover:opacity-90 focus:opacity-95 transition-all duration-200"),

    secondary:
      "w-full h-full text-foreground font-prompt " +
      "placeholder:text-foreground/50 border-0 focus:outline-none rounded-2xl bg-base-300 " +
      "p-4 resize-none overflow-y-auto " +
      (isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-text hover:opacity-90 focus:opacity-95 transition-all duration-200"),
  };

  if (variant === "secondary") {
    return (
      <div
        className={cn(
          "rounded-2xl h-21.5 p-[1.3px] [html[data-theme='light']_&]:bg-gradient-to-b [html[data-theme='light']_&]:from-[#EEEEEE] [html[data-theme='light']_&]:to-[#DEDEDE] [html[data-theme='dark']_&]:bg-gradient-to-b [html[data-theme='dark']_&]:from-[#454545] [html[data-theme='dark']_&]:to-base-300 overflow-hidden relative " +
            "transition-all duration-200 " +
            (isDisabled ? "" : "hover:opacity-90 focus-within:opacity-95"),
          className,
        )}
      >
        <textarea
          id={id}
          name={name}
          autoComplete={autoComplete}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          disabled={isDisabled}
          required={required}
          className={cn(variantClasses[variant], textareaClassName)}
        />
        {loading && (
          <div className="absolute flex inset-0 items-center justify-end pointer-events-none pr-4">
            <div className="animate-spin border-2 border-foreground/30 border-t-foreground h-4 rounded-full w-4" />
          </div>
        )}
      </div>
    );
  }

  // Primary variant (default)
  return (
    <div
      className={cn(
        "rounded-2xl h-21.5 p-px border border-background shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] [html[data-theme='dark']_&]:border-0 [html[data-theme='dark']_&]:shadow-none [html[data-theme='dark']_&]:bg-linear-to-t [html[data-theme='dark']_&]:from-foreground/50 [html[data-theme='dark']_&]:to-background-light overflow-hidden relative " +
          "transition-all duration-200 " +
          (isDisabled
            ? ""
            : "hover:shadow-sm focus-within:shadow-md [html[data-theme='dark']_&]:hover:from-foreground/70 [html[data-theme='dark']_&]:hover:to-background-light [html[data-theme='dark']_&]:focus-within:from-foreground/90 [html[data-theme='dark']_&]:focus-within:to-background-light"),
        className,
      )}
    >
      <textarea
        id={id}
        name={name}
        autoComplete={autoComplete}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        disabled={isDisabled}
        required={required}
        className={cn(variantClasses[variant], textareaClassName)}
      />
      {loading && (
        <div className="absolute flex inset-0 items-center justify-end pointer-events-none pr-4">
          <div className="animate-spin border-2 border-foreground/30 border-t-foreground h-4 rounded-full w-4" />
        </div>
      )}
    </div>
  );
};
