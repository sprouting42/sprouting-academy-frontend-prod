import { Card } from "@/components/common";

interface TwoColumnCardProps {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
  className?: string;
}

export const TwoColumnCard = ({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
}: TwoColumnCardProps) => {
  return (
    <Card
      variant="gradientDarkToLight"
      className="lg:w-280 md:w-220 w-106 xl:w-358"
      cardContent={
        <div className="bg-linear-to-b from-background-light gap-4 grid grid-cols-1 md:flex md:flex-row min-h-58 p-8 rounded-2xl to-background w-full">
          <div className="flex flex-1 flex-col gap-4 h-full items-center w-full">
            <h3 className="[html[data-theme='dark']_&]:text-secondary font-semibold text-2xl text-center text-primary">
              {leftTitle}
            </h3>

            <ul className="flex flex-col gap-2 items-start w-full">
              {leftItems.map((leftBullet, index) => (
                <li
                  key={`left-${leftBullet}-${index}`}
                  className="flex font-prompt gap-2 items-center text-base"
                >
                  <span>•</span>
                  <span>{leftBullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-foreground/25 border-l hidden md:block" />

          <div className="flex flex-1 flex-col gap-4 h-full items-center w-full">
            <h3 className="[html[data-theme='dark']_&]:text-secondary font-semibold text-2xl text-center text-primary">
              {rightTitle}
            </h3>
            <ul className="flex flex-col gap-2 items-start w-full">
              {rightItems.map((rightBullet, index) => (
                <li
                  key={`right-${rightBullet}-${index}`}
                  className="flex font-prompt gap-2 items-center text-base w-full"
                >
                  <span>•</span>
                  <span>{rightBullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  );
};
