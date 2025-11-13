"use client";

import { useState } from "react";
import { GoTriangleRight } from "react-icons/go";

import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface AcordionProps {
  body: string | React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleText?: React.ReactNode;
  icon?: React.ReactNode;
  cardVariant?:
    | "gradientDarkToLight"
    | "gradientLightToDark"
    | "background"
    | "transparent";
}
interface AccordionTitleProps {
  isOpen: boolean;
  onClick: () => void;
  titleText?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

interface AccordionBodyProps {
  body: string | React.ReactNode;
  isOpen: boolean;
  className?: string;
  cardVariant?:
    | "gradientDarkToLight"
    | "gradientLightToDark"
    | "background"
    | "transparent";
}

const AccordionTitle = ({
  isOpen,
  onClick,
  titleText,
  icon,
  className,
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
          isOpen && "rotate-90",
        )}
      >
        <GoTriangleRight size={18} />
      </div>
    </button>
  );
};

const AccordionBody = ({ body, isOpen, cardVariant }: AccordionBodyProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-250 ease-in-out  ",
        isOpen ? "opacity-100 w-full rounded-2xl" : "max-h-0 opacity-0 w-full",
      )}
    >
      {isOpen ? (
        <Card
          variant={cardVariant}
          cardContent={body}
          className="!p-px !rounded-full"
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
  cardVariant = "gradientDarkToLight",
  className,
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
      />
      <AccordionBody body={body} isOpen={isOpen} cardVariant={cardVariant} />
    </div>
  );
};
