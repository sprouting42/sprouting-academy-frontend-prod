import Link from "next/link";

import { Button } from "../common";

interface HeroProps {
  content?: {
    title?: string;
    subTitle?: string;
    description?: string;
    buttonItems?: Array<{ id: string; text: string; link: string }>;
  };
  titleSize?: "large" | "small";
  align?: "center" | "left";
  className?: string;
  showFirstButtonIcon?: boolean;
}

export const Hero = ({
  content,
  titleSize = "large",
  align = "center",
  className,
}: HeroProps) => {
  const isLeftAligned = align === "left";

  const containerAlignmentClasses = isLeftAligned
    ? "items-start md:items-start text-left w-full max-w-304"
    : "items-center md:items-center text-center";

  const titleBaseClasses =
    "bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary text-transparent to-primary via-secondary";

  const largeTitleClasses = `${titleBaseClasses} md:text-7xl py-2 sm:text-5xl text-3xl`;

  const smallTitleClasses = `${titleBaseClasses} text-xl leading-9 lg:text-3xl lg:leading-10`;

  const titleClasses =
    titleSize === "small" ? smallTitleClasses : largeTitleClasses;

  const descriptionClasses = isLeftAligned
    ? "font-prompt max-w-2xl md:text-xl sm:text-lg text-base text-foreground"
    : "font-prompt max-w-2xl md:text-2xl sm:text-xl text-lg";

  const buttonWrapperClasses = isLeftAligned
    ? "flex flex-col flex-wrap gap-3 justify-start md:gap-4 sm:flex-row"
    : "flex flex-col flex-wrap gap-3 justify-center md:gap-4 sm:flex-row";

  return (
    <section className={className ?? "md:px-16 md:py-20 px-4 py-12 sm:px-8"}>
      <div
        className={`mx-auto flex flex-col gap-6 md:gap-8 ${containerAlignmentClasses}`}
      >
        <div
          className={`flex flex-col gap-4 md:gap-8 py-2 ${
            isLeftAligned ? "items-start" : "items-center"
          }`}
        >
          {content?.title && <h1 className={titleClasses}>{content.title}</h1>}
          {content?.subTitle && (
            <h1 className={largeTitleClasses}>{content.subTitle}</h1>
          )}
          {content?.description && (
            <p className={descriptionClasses}>{content.description}</p>
          )}
        </div>
        {content?.buttonItems && (
          <div className={buttonWrapperClasses}>
            {content.buttonItems.map(({ id, text, link }) => {
              const isFirstButton = content.buttonItems?.[0]?.id === id;
              return (
                <div key={id}>
                  <Link href={link}>
                    <Button
                      text={text}
                      shape="rounded"
                      variant={
                        isFirstButton
                          ? "primaryGradientBorder"
                          : "secondaryGradientBorder"
                      }
                      className="w-full"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
