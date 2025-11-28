import Image from "next/image";
import Link from "next/link";

import { Button } from "../common";

interface HeroImageProps {
  content?: {
    imageSrc?: string;
    title?: string;
    description?: string;
    buttonItems?: Array<{ id: string; text: string; link: string }>;
    className?: string;
  };
}

export const HeroImage = ({ content }: HeroImageProps) => {
  return (
    <section>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-start justify-center">
          <div className="h-127 lg:w-280 md:w-220 relative w-106 xl:w-358">
            <Image
              src={content?.imageSrc || "/placeholder.png"}
              alt={content?.title || "Hero Image"}
              fill
              className={content?.className}
            />
          </div>

          <div className="flex flex-col gap-8 items-start justify-start pt-8">
            <h1 className="bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary py-2 text-4xl text-transparent to-primary via-secondary">
              {content?.title}
            </h1>
            <h2 className="font-prompt text-2xl">{content?.description}</h2>
          </div>
          <div className="pt-8">
            {content?.buttonItems && content.buttonItems.length > 0 && (
              <Link href={content.buttonItems[0].link}>
                <Button
                  text={content.buttonItems[0].text}
                  shape="rounded"
                  className="h-14 w-52"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
