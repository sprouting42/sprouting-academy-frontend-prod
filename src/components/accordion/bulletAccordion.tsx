"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { CaretUpIcon } from "@phosphor-icons/react";
import React from "react";

import { Acordion } from "@/components/common/acordion";
import { BulletList } from "@/components/common/bulletList";
import { Card } from "@/components/common/card";

interface AccordionItem {
  id: string;
  title: string;
  items: string[];
}

interface BulletAccordionProps {
  title: string;
  subtitle: string;
  items: AccordionItem[];
}

export const BulletAccordion = ({
  title,
  subtitle,
  items,
}: BulletAccordionProps) => {
  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <div className="flex flex-col gap-2 items-start w-full">
        <h2 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-left text-primary">
          {title}
        </h2>
        <p className="font-prompt text-base text-foreground">{subtitle}</p>
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 w-full">
        {items.map((item) => (
          <Card
            key={item.id}
            variant="transparent"
            className="[html[data-theme='dark']_&]:border-foreground/25 [html[data-theme='dark']_&]:shadow-none border border-background overflow-hidden rounded-2xl self-start shadow-[0_4px_4px_0_rgba(0,0,0,0.08)]"
            contentClassName="bg-linear-to-b from-background-light p-6 rounded-2xl to-background"
            cardContent={
              <Acordion
                rightIcon={(isOpen) =>
                  isOpen ? (
                    <CaretUpIcon
                      weight="bold"
                      className="text-secondary"
                      size={24}
                    />
                  ) : (
                    <CaretDownIcon
                      weight="bold"
                      className="text-secondary"
                      size={24}
                    />
                  )
                }
                titleText={
                  <span className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-base text-primary">
                    {item.title}
                  </span>
                }
                body={<BulletList items={item.items} />}
                cardVariant="transparent"
                defaultOpen={false}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};
