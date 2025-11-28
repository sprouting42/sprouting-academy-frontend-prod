import { notFound } from "next/navigation";

import { BulletAccordion } from "@/components/accordion";
import { CourseOutlineCard } from "@/components/card/courseOutlineCard";
import { ToolStackCard } from "@/components/card/toolStackCard";
import { TwoColumnCard } from "@/components/card/twoColumnCard";
import { BulletList } from "@/components/common";
import { HeroImage } from "@/components/hero";
import { getBootcampBySlug } from "@/data";

interface BootcampPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BootcampPage({ params }: BootcampPageProps) {
  const { slug } = await params;
  const bootcamp = getBootcampBySlug(slug);

  if (!bootcamp) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-24 items-center min-h-screen px-28 w-full">
      <HeroImage content={bootcamp.hero} />

      {bootcamp.whyStudy && (
        <div className="flex flex-col gap-4 items-start lg:w-280 md:w-220 w-106 xl:w-358">
          <h3 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-left text-primary">
            {bootcamp.whyStudy.title}
          </h3>
          <BulletList items={bootcamp.whyStudy.items} />
        </div>
      )}

      {bootcamp.designedFor && (
        <div className="flex flex-col gap-4 items-start lg:w-280 md:w-220 w-106 xl:w-358">
          <h3 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-left text-primary">
            {bootcamp.designedFor.title}
          </h3>
          <BulletList items={bootcamp.designedFor.items} />
        </div>
      )}

      {bootcamp.prerequisites && (
        <div className="flex flex-col gap-4 items-start lg:w-280 md:w-220 w-106 xl:w-358">
          <h3 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold text-2xl text-left text-primary">
            {bootcamp.prerequisites.title}
          </h3>
          <BulletList items={bootcamp.prerequisites.items} />
        </div>
      )}

      {bootcamp.bootcampBenefits && (
        <div className="flex flex-col gap-6 items-start lg:w-280 md:w-220 w-106 xl:w-358">
          <BulletAccordion
            title={bootcamp.bootcampBenefits.title}
            subtitle={bootcamp.bootcampBenefits.subtitle}
            items={bootcamp.bootcampBenefits.items}
          />
        </div>
      )}
      <TwoColumnCard
        leftTitle={bootcamp.suitableFor.title}
        leftItems={bootcamp.suitableFor.items}
        rightTitle={bootcamp.outcomes.title}
        rightItems={bootcamp.outcomes.items}
      />

      <CourseOutlineCard
        phases={bootcamp.phases}
        tableTitle={bootcamp.tableTitle}
      />

      <ToolStackCard
        title={bootcamp.toolStack.title}
        stackImages={bootcamp.toolStack.stackImages}
      />
    </div>
  );
}
