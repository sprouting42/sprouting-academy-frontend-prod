import { Card } from "@/components/common/card";
import { cn } from "@/utils/cn";

interface Phase {
  phase: string;
  topic: string;
}

interface CourseOutlineCardProps {
  phases: Phase[];
  className?: string;
  contentClassName?: string;
}

export const CourseOutlineCard = ({
  phases,
  className,
  contentClassName,
}: CourseOutlineCardProps) => {
  return (
    <Card
      variant="gradientDarkToLight"
      className={cn("w-106 md:w-220 lg:w-280 xl:w-358", className)}
      cardContent={
        <div
          className={cn(
            "bg-linear-to-b from-background-light flex flex-col gap-6 p-8 rounded-2xl to-background",
            contentClassName,
          )}
        >
          <h2 className="[html[data-theme='dark']_&]:text-secondary font-semibold mb-3 text-2xl text-center text-primary">
            Course Outline
          </h2>

          <div className="flex flex-col gap-6">
            <div className="gap-4 grid grid-cols-1 md:gap-6 md:grid-cols-[minmax(25rem,auto)_1fr]">
              <h3 className="[html[data-theme='dark']_&]:text-secondary font-semibold hidden sm:block text-primary text-xl">
                วันที่
              </h3>
              <h3 className="[html[data-theme='dark']_&]:text-secondary font-semibold text-primary text-xl">
                หัวข้อหลัก
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {phases.map((item) => (
                <div
                  key={`${item.phase}-${item.topic}`}
                  className="gap-4 grid grid-cols-1 items-start md:gap-6 md:grid-cols-[minmax(25rem,auto)_1fr]"
                >
                  <p className="font-normal font-prompt md:whitespace-nowrap text-base text-foreground">
                    {item.phase}
                  </p>
                  <p className="font-normal font-prompt text-base text-foreground">
                    {item.topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};
