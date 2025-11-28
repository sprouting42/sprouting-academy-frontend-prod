import { Card } from "@/components/common/card";
import { Label } from "@/components/common/label";

import { CourseSummaryProps } from "./types";

export const CourseSummary = ({
  titleText,
  titleIcon,
  courses,
  price,
}: CourseSummaryProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Label text={titleText} icon={titleIcon} />
      <Card
        variant="gradientDarkToLight"
        contentClassName=" flex flex-col gap-4 h-full px-4 py-6 rounded-2xl text-base bg-background"
        cardContent={
          <>
            {courses.map((item) => (
              <div
                key={`${item.course}-${item.startDate}`}
                className="flex flex-col gap-2 justify-between"
              >
                <div className="flex items-center justify-between">
                  <span>คอร์ส:</span>
                  <span>{item.course}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>วันเริ่มเรียน:</span>
                  <span>{item.startDate}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between mt-2 text-xl">
              <span>ราคา:</span>
              <span>{price}</span>
            </div>
          </>
        }
      />
    </div>
  );
};
