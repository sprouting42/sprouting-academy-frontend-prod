"use client";

import React, { useRef } from "react";
import { PiCheckBold } from "react-icons/pi";

import { cn } from "@/utils/cn";

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onBlur" | "value" | "type" | "prefix"
  > {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  value?: string;
  type?: string;
  loading?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  variant?: "primary";
  inputClassName?: string;
}

interface OtpInputProps {
  length: number;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  variant?: "primary";
  className?: string;
  inputClassName?: string;
}

interface FileInputProps {
  onChange?: (file: File | null) => void;
  accept?: string;
  className?: string;
  inputClassName?: string;
}

interface CheckboxInputProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: "primary";
  size?: "sm" | "md" | "lg";
  className?: string;
  checkboxClassName?: string;
  iconClassName?: string;
  content?: React.ReactNode;
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

  const variantClasses = {
    primary:
      "h-[48px] w-full text-foreground font-prompt " +
      "placeholder:text-[#E5E8E880] border-0 focus:outline-none rounded-full bg-background-light " +
      (isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-text hover:opacity-90 focus:opacity-95 transition-all duration-200") +
      (prefix ? " pl-2 pr-4 py-3" : suffix ? " pl-4 pr-2 py-3" : " px-4 py-3"),
  };

  if (variant === "primary") {
    return (
      <div
        className={cn(
          "rounded-full p-px bg-linear-to-t from-foreground/50 to-background-light overflow-hidden relative flex items-center " +
            "transition-all duration-200 " +
            (isDisabled
              ? ""
              : "hover:from-foreground/70 hover:to-background-light hover:shadow-sm focus-within:from-foreground/90 focus-within:to-background-light focus-within:shadow-md"),
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
    <div className="flex items-center relative">
      {prefix && (
        <div className="flex items-center justify-center pl-2 shrink-0">
          {prefix}
        </div>
      )}
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        disabled={isDisabled}
        required={required}
        className={cn(variantClasses[variant], inputClassName)}
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
  const variantClasses = {
    primary:
      "w-full lg:h-12 h-8 text-center text-white font-medium rounded-full bg-background-light focus:outline-none focus:ring-0 " +
      (disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"),
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, newValue: string) => {
    const sanitized = newValue.slice(-1);

    if (sanitized && !/^\d$/.test(sanitized)) {
      return;
    }

    const valueArray = value.padEnd(length, "").split("");
    valueArray[index] = sanitized;
    const result = valueArray.join("").slice(0, length);
    onChange?.(result);

    if (sanitized && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const valueArray = value.padEnd(length, "").split("");

      if (valueArray[index]) {
        valueArray[index] = "";
        onChange?.(valueArray.join("").slice(0, length));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  if (variant === "primary") {
    return (
      <div className={cn("flex gap-3 lg:gap-4", className)}>
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
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
              value={value.padEnd(length, "")[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={disabled}
              className={cn(variantClasses[variant], inputClassName)}
            />
            {placeholder && !value.padEnd(length, "")[index] && (
              <div className="absolute flex inset-0 items-center justify-center pointer-events-none rounded-full text-foreground/50">
                {placeholder}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3 lg:gap-4", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
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
          value={value.padEnd(length, "")[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={cn(variantClasses[variant], inputClassName)}
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
}: FileInputProps) => {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : null);
    onChange?.(file);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const variantClasses = {
    primary:
      "h-[85px] w-full text-foreground font-prompt px-4 py-3 " +
      "border-0 focus:outline-none rounded-full bg-background cursor-pointer flex items-center gap-4",
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className={cn(
          "rounded-full p-px bg-linear-to-t from-foreground/50 to-background overflow-hidden",
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <button
          type="button"
          className={cn(variantClasses.primary, inputClassName)}
          onClick={handleClick}
        >
          <span
            className={cn(
              "bg-secondary/12 rounded-4xl px-4 py-2 text-secondary font-promt",
              inputClassName,
            )}
          >
            Choose File
          </span>
          <span className="text-[#E5E8E880]">
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
            checked ? "bg-foreground" : "bg-background",
            checkboxClassName,
          )}
        >
          {checked && (
            <PiCheckBold
              className={cn("text-background", iconSizes[size], iconClassName)}
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
  variant?: "primary";
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
      "placeholder:text-[#E5E8E880] border-0 focus:outline-none rounded-2xl bg-background-light " +
      "px-6 py-1.5 resize-none overflow-y-auto " +
      (isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-text hover:opacity-90 focus:opacity-95 transition-all duration-200"),
  };

  if (variant === "primary") {
    return (
      <div
        className={cn(
          "rounded-2xl h-[86px] p-px bg-linear-to-t from-foreground/50 to-background-light overflow-hidden relative " +
            "transition-all duration-200 " +
            (isDisabled
              ? ""
              : "hover:from-foreground/70 hover:to-background-light hover:shadow-sm focus-within:from-foreground/90 focus-within:to-background-light focus-within:shadow-md"),
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

  return (
    <div className="flex items-center relative">
      <textarea
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
