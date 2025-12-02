import { Card } from "@/components/common/card";

export const LoginCardSkeleton = () => {
  return (
    <div className="flex items-center justify-center py-48">
      <div className="max-w-160 mx-auto w-full">
        <Card
          variant="gradientDarkToLight"
          className="h-auto overflow-hidden w-full"
          cardContent={
            <div className="bg-linear-to-b flex flex-col from-background-light h-full justify-between p-4 rounded-2xl to-background w-full">
              <div className="flex flex-col gap-4 h-full justify-between lg:gap-6">
                <div className="flex items-center justify-between w-full">
                  <div className="animate-pulse bg-foreground/20 h-6 lg:h-8 mx-auto rounded w-32" />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-start">
                    <div className="animate-pulse bg-foreground/20 h-5 lg:h-6 lg:w-6 rounded w-5" />
                    <div className="animate-pulse bg-foreground/20 h-5 lg:h-6 rounded w-16" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="animate-pulse bg-foreground/20 h-12 rounded-full w-full" />
                  </div>
                </div>

                <div className="animate-pulse bg-foreground/20 h-12 rounded-full w-full" />

                <div className="flex gap-2 items-center lg:gap-4 w-full">
                  <div className="bg-foreground/25 flex-1 h-px" />
                  <div className="animate-pulse bg-foreground/20 h-5 lg:h-6 rounded w-32" />
                  <div className="bg-foreground/25 flex-1 h-px" />
                </div>

                <div className="flex gap-2 items-start lg:gap-4 w-full">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-foreground/20 flex-1 h-10 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};
