import { Card } from "@/components/common/card";
import { Label } from "@/components/common/label";

import { CourseSummaryProps } from "./types";

export const CourseSummary = ({
  titleText,
  titleIcon,
  courses,
  price,
}: CourseSummaryProps) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <Label text={titleText} icon={titleIcon} />
        <Card
          variant="gradientDarkToLight"
          contentClassName="flex flex-col gap-4 h-full p-6 rounded-2xl text-base bg-background"
          cardContent={
            <p className="text-center text-foreground/50">ไม่มีรายการคอร์ส</p>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Label text={titleText} icon={titleIcon} />
      <Card
        variant="gradientLightToForeground"
        contentClassName="flex flex-col justify-center items-start gap-4 h-full p-6 rounded-2xl text-base bg-background-light"
        cardContent={
          <>
            <div
              className="flex flex-col gap-4 items-start w-full"
              role="list"
              aria-label="รายการคอร์ส"
            >
              {courses.map((item) => (
                <div
                  key={`${item.course}-${item.startDate}`}
                  role="listitem"
                  className="flex flex-col gap-2 items-start w-full"
                >
                  <div className="flex gap-2.5 items-center justify-between w-full">
                    <span className="font-normal font-prompt leading-6 text-base text-foreground/75">
                      คอร์ส:
                    </span>
                    <span className="font-normal font-prompt leading-6 text-base text-foreground">
                      {item.course}
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center justify-between w-full">
                    <span className="font-normal font-prompt leading-6 text-base text-foreground/75">
                      วันเริ่มเรียน:
                    </span>
                    <span className="font-normal font-prompt leading-6 text-base text-foreground">
                      {item.startDate}
                    </span>
                  </div>
                  {item.price && (
                    <div className="flex gap-2.5 items-center justify-between w-full">
                      <span className="font-normal font-prompt leading-6 text-base text-foreground/75">
                        ราคา:
                      </span>
                      <span className="font-normal font-prompt leading-6 text-base text-foreground">
                        {item.price}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              className="flex font-prompt font-semibold gap-2.5 items-center justify-between leading-8 text-xl w-full"
              role="separator"
              aria-label="ราคารวม"
            >
              <span className="text-foreground">ราคารวม:</span>
              <span className="text-foreground">{price}</span>
            </div>
          </>
        }
      />
    </div>
  );
};
