import Image from "next/image";

import { Card } from "@/components/common/card";

interface StackImage {
  src: string;
  alt: string;
}

interface ToolStackCardProps {
  title?: string;
  stackImages?: StackImage[];
}

export const ToolStackCard = ({
  title,
  stackImages = [],
}: ToolStackCardProps) => {
  return (
    <Card
      variant="gradientDarkToLight"
      className="lg:w-280 md:w-220 w-106 xl:w-358"
      cardContent={
        <div className="bg-linear-to-b from-background-light p-8 rounded-2xl to-background w-full">
          <h1 className="[html[data-theme='dark']_&]:text-secondary font-prompt font-semibold mb-8 text-3xl text-primary">
            {title}
          </h1>
          <div className="flex flex-row flex-wrap gap-11">
            {stackImages.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={600}
                height={600}
                className="h-16 object-contain w-16"
              />
            ))}
          </div>
        </div>
      }
    />
  );
};
