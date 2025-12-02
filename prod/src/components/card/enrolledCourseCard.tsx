import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbBookFilled, TbVideoFilled } from "react-icons/tb";

import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { PagePath } from "@/enum";
import { cn } from "@/utils/cn";

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

  return (
    <Card
      variant="gradientDarkToLight"
      className={cn("w-full", className)}
      contentClassName={cn(
        "flex flex-col items-start p-4",
        "bg-linear-to-b from-background-light to-background",
      )}
      cardContent={
        <div className="flex flex-col gap-4 items-stretch lg:flex-row lg:h-76.75 w-full">
          {imageUrl && (
            <div className="bg-foreground/10 h-50 lg:h-76.75 lg:w-105 overflow-hidden relative rounded-lg shrink-0 w-full">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-4 items-stretch justify-between lg:flex-1 lg:h-76.75 w-full">
            <div className="flex flex-col gap-4 items-start w-full">
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <h3 className="flex-1 font-bold lg:text-xl line-clamp-1 overflow-hidden text-ellipsis text-lg text-secondary">
                  {title}
                </h3>
                {courseDate && (
                  <Badge
                    text={courseDate}
                    variant="courseDate"
                    shape="rounded"
                    size="sm"
                    className="shrink-0"
                  />
                )}
              </div>

              <p className="flex-1 font-normal lg:line-clamp-5 lg:text-base line-clamp-4 min-h-0 overflow-hidden text-foreground text-sm w-full">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-4 items-start w-full">
              {courseDate && (
                <div className="flex flex-row gap-3 items-center w-full">
                  <div className="bg-course-date-dot h-4 rounded-full shrink-0 w-4" />
                  <span className="flex-1 font-normal lg:text-base overflow-hidden text-ellipsis text-foreground text-sm whitespace-nowrap">
                    {courseDate}
                  </span>
                </div>
              )}

              <div className="flex flex-row flex-wrap gap-4 items-center w-full">
                {videoProgress && (
                  <div className="flex flex-row gap-1.5 items-center">
                    <TbVideoFilled
                      size={24}
                      className="shrink-0 text-secondary"
                    />
                    <span className="font-normal lg:text-base overflow-hidden text-ellipsis text-foreground text-sm whitespace-nowrap">
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
                    <span className="font-normal lg:text-base overflow-hidden text-ellipsis text-foreground text-sm whitespace-nowrap">
                      {bookProgress.current}/{bookProgress.total} Books
                    </span>
                  </div>
                )}
              </div>

              <div className="lg:w-auto w-full">
                <Button
                  text="Study now"
                  variant="squareButton"
                  size="sm"
                  shape="square"
                  onClick={() => router.push(`${PagePath.COURSES}/${id}`)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
