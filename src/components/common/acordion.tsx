"use client";

import { type ReactNode, useState } from "react";
import { GoTriangleRight } from "react-icons/go";

import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface AcordionProps {
  body: string | ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleText?: ReactNode;
  icon?: ReactNode;
  rightIcon?: (isOpen: boolean) => ReactNode;
  cardVariant?:
    | "gradientDarkToLight"
    | "gradientLightToDark"
    | "background"
    | "transparent";
  cardContentClassName?: string;
}
interface AccordionTitleProps {
  isOpen: boolean;
  onClick: () => void;
  titleText?: ReactNode;
  icon?: ReactNode;
  className?: string;
  rightIcon?: (isOpen: boolean) => ReactNode;
}

interface AccordionBodyProps {
  body: string | ReactNode;
  isOpen: boolean;
  className?: string;
  cardVariant?:
    | "gradientDarkToLight"
    | "gradientLightToDark"
    | "background"
    | "transparent";
  cardContentClassName?: string;
}

const AccordionTitle = ({
  isOpen,
  onClick,
  titleText,
  icon,
  className,
  rightIcon,
}: AccordionTitleProps) => {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className="cursor-pointer flex items-center justify-between text-base w-full"
      onClick={onClick}
    >
      <div className={cn("flex gap-2 items-center", className)}>
        {icon}
        {titleText}
      </div>
      <div
        className={cn(
          "transition-transform duration-200",
          !rightIcon && isOpen && "rotate-90",
        )}
      >
        {rightIcon ? rightIcon(isOpen) : <GoTriangleRight size={18} />}
      </div>
    </button>
  );
};

const AccordionBody = ({
  body,
  isOpen,
  cardVariant,
  cardContentClassName,
}: AccordionBodyProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-250 ease-in-out  ",
        isOpen ? "opacity-100 w-full rounded-2xl " : "max-h-0 opacity-0 w-full",
      )}
    >
      {isOpen ? (
        <Card
          variant={cardVariant}
          cardContent={body}
          className="p-px! rounded-full!"
          contentClassName={cardContentClassName}
        />
      ) : null}
    </div>
  );
};

export const Acordion = ({
  body,
  defaultOpen = false,
  titleText,
  icon,
  rightIcon,
  cardVariant = "gradientDarkToLight",
  className,
  cardContentClassName,
}: AcordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <AccordionTitle
        isOpen={isOpen}
        onClick={toggleAccordion}
        titleText={titleText}
        icon={icon}
        className={className}
        rightIcon={rightIcon}
      />
      <AccordionBody
        body={body}
        isOpen={isOpen}
        cardVariant={cardVariant}
        cardContentClassName={cardContentClassName}
      />
    </div>
  );
};
