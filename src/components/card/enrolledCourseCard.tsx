import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { TbBookFilled, TbVideoFilled } from "react-icons/tb";

import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { PagePath } from "@/enum";
import { cn } from "@/utils/cn";
import { parseThaiDateShort } from "@/utils/dateFormatter";

interface EnrolledCourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  instructorName?: string;
  courseDate?: string;
  videoProgress?: { current: number; total: number };
  bookProgress?: { current: number; total: number };
  className?: string;
}

const DAYS_BEFORE_LIVE_SOON = 3;
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const COURSE_DATE_PREFIX = "เรียนวันที่ ";
const MIDNIGHT_HOUR = 0;
const MIDNIGHT_MINUTE = 0;
const MIDNIGHT_SECOND = 0;
const MIDNIGHT_MILLISECOND = 0;
const DAYS_DIFF_TODAY = 0;

const calculateDaysDifference = (targetDate: Date, today: Date): number => {
  const targetTime = targetDate.getTime();
  const todayTime = today.getTime();
  const diffTime = targetTime - todayTime;
  return Math.ceil(diffTime / MILLISECONDS_PER_DAY);
};

const getBadgeInfo = (
  courseDate?: string,
): { text: string; isLiveSoon: boolean } => {
  if (!courseDate) {
    return { text: "", isLiveSoon: false };
  }

  const dateWithoutPrefix = courseDate.startsWith(COURSE_DATE_PREFIX)
    ? courseDate.replace(COURSE_DATE_PREFIX, "")
    : courseDate;

  const parsedDate = parseThaiDateShort(dateWithoutPrefix);
  if (!parsedDate) {
    return { text: "", isLiveSoon: false };
  }

  const today = new Date();
  today.setHours(
    MIDNIGHT_HOUR,
    MIDNIGHT_MINUTE,
    MIDNIGHT_SECOND,
    MIDNIGHT_MILLISECOND,
  );
  parsedDate.setHours(
    MIDNIGHT_HOUR,
    MIDNIGHT_MINUTE,
    MIDNIGHT_SECOND,
    MIDNIGHT_MILLISECOND,
  );

  const diffDays = calculateDaysDifference(parsedDate, today);

  if (diffDays === DAYS_DIFF_TODAY) {
    return { text: "Live today", isLiveSoon: true };
  }

  if (diffDays > DAYS_DIFF_TODAY && diffDays <= DAYS_BEFORE_LIVE_SOON) {
    return { text: "Live soon", isLiveSoon: true };
  }

  return { text: "", isLiveSoon: false };
};

export const EnrolledCourseCard = ({
  id,
  title,
  description,
  imageUrl,
  courseDate,
  videoProgress,
  bookProgress,
  className,
}: EnrolledCourseCardProps) => {
  const router = useRouter();

  const badgeInfo = useMemo(() => getBadgeInfo(courseDate), [courseDate]);

  return (
    <Card
      variant="gradientDarkToLight"
      className={cn("w-full h-full", className)}
      contentClassName="flex flex-col p-4 bg-linear-to-b from-background-light to-background h-full"
      cardContent={
        <div className="flex flex-col gap-6 h-full w-full">
          {imageUrl && (
            <div className="aspect-video bg-foreground/10 overflow-hidden relative rounded-lg shrink-0 w-full">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 426px"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col gap-6 justify-between w-full">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-row gap-3 items-start min-w-0 w-full">
                <h3 className="flex-1 font-bold font-prompt lg:min-h-18 lg:text-2xl line-clamp-2 md:min-h-15 md:text-xl min-h-14 min-w-0 text-lg text-secondary">
                  {title}
                </h3>
                {badgeInfo.isLiveSoon && (
                  <Badge
                    text={badgeInfo.text}
                    variant="courseDate"
                    shape="rounded"
                    size="sm"
                    className="mt-0.5 shrink-0"
                  />
                )}
              </div>

              <p className="font-normal font-prompt line-clamp-4 md:min-h-24 md:text-base min-h-21 overflow-hidden text-foreground text-sm w-full">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                {courseDate && (
                  <div className="flex flex-row gap-3 items-center">
                    <div className="bg-course-date-dot h-4 rounded-full shrink-0 w-4" />
                    <span className="font-normal font-prompt md:text-base text-foreground/70 text-sm">
                      {courseDate}
                    </span>
                  </div>
                )}

                <div className="flex flex-row flex-wrap gap-4 items-center md:gap-5">
                  {videoProgress && (
                    <div className="flex flex-row gap-1.5 items-center">
                      <TbVideoFilled
                        size={24}
                        className="shrink-0 text-secondary"
                      />
                      <span className="font-normal font-prompt md:text-base text-foreground text-sm">
                        {videoProgress.current}/{videoProgress.total} Videos
                      </span>
                    </div>
                  )}
                  {bookProgress && (
                    <div className="flex flex-row gap-1.5 items-center">
                      <TbBookFilled
                        size={24}
                        className="shrink-0 text-secondary"
                      />
                      <span className="font-normal font-prompt md:text-base text-foreground text-sm">
                        {bookProgress.current}/{bookProgress.total} Books
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:w-auto w-full">
                <Button
                  text="เรียนต่อ"
                  variant="squareButton"
                  size="sm"
                  shape="square"
                  onClick={() => router.push(`${PagePath.COURSES}/${id}`)}
                  className="sm:w-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
