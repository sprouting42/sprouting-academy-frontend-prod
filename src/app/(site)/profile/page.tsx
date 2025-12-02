"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { CourseCard } from "@/components/card/courseCard";
import { EnrolledCourseCard } from "@/components/card/enrolledCourseCard";
import { ProfileCard } from "@/components/card/profileCard";
import { Button } from "@/components/common/button";
import { CourseData, fetchCourses } from "@/data/courses";
import { PagePath } from "@/enum";
import { useGetMe } from "@/hooks/useAuth";
import { useAddItemToCart } from "@/hooks/useCart";

interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  instructorName?: string;
  courseDate?: string;
  videoProgress?: { current: number; total: number };
  bookProgress?: { current: number; total: number };
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useGetMe();
  const { mutate: addItemToCart, isPending: isAddingToCart } =
    useAddItemToCart();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const MOCK_LOADING_DELAY = 500;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const isLoggingOut = sessionStorage.getItem("isLoggingOut") === "true";

    if (!isLoading && !user && !isLoggingOut) {
      router.push(PagePath.LOGIN);
    }
  }, [user, isLoading, router, isMounted]);

  useEffect(() => {
    if (!isMounted || !user) return;

    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);

        // TODO: [PROFILE-001] Replace with actual API call when backend endpoint is ready
        // Implementation needed:
        // - Create enrolledCoursesApi.getEnrolledCourses() in src/apis/enrollment.ts
        // - Call API to fetch user's enrolled courses
        // - Update setEnrolledCourses with API response
        // - Handle loading and error states
        // const fetchEnrolledCourses = async () => {
        //   try {
        //     const response = await enrolledCoursesApi.getEnrolledCourses();
        //     setEnrolledCourses(response.responseContent);
        //   } catch (error) {
        //     console.error("Failed to fetch enrolled courses:", error);
        //   } finally {
        //     setIsLoadingCourses(false);
        //   }
        // };
        // fetchEnrolledCourses();

        // Mock data from courses data
        const mockEnrolledCourses: EnrolledCourse[] = fetchedCourses
          .slice(0, 2)
          .map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            imageUrl:
              typeof course.coverImage === "string"
                ? course.coverImage
                : undefined,
            instructorName: course.instructorName,
            courseDate: course.dateBadgeText.replace("เรียนวันที่ ", ""),
            videoProgress: { current: 2, total: 5 },
            bookProgress: { current: 2, total: 5 },
          }));

        setTimeout(() => {
          setEnrolledCourses(mockEnrolledCourses);
          setIsLoadingCourses(false);
        }, MOCK_LOADING_DELAY);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
  }, [user, isMounted]);

  const enrolledCourseIds = new Set(enrolledCourses.map((course) => course.id));
  const suggestedCourses = courses
    .filter((course) => !enrolledCourseIds.has(course.id))
    .slice(0, 3);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin border-4 border-primary/30 border-t-primary h-12 rounded-full w-12" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 lg:gap-12 md:gap-10 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8 items-center lg:gap-12 md:gap-10">
          <h1 className="font-bold font-prompt lg:text-4xl md:text-3xl text-2xl text-left text-secondary w-full">
            User profile
          </h1>

          <div className="flex justify-center w-full">
            <ProfileCard
              avatarUrl={user.avatarUrl}
              fullName={user.fullName}
              email={user.email}
              phone={user.phone}
              onEditClick={undefined}
              className="max-w-7xl w-full"
            />
          </div>

          <section className="flex flex-col gap-6 max-w-7xl w-full">
            <div className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
              <h2 className="font-bold font-prompt md:text-2xl text-secondary text-xl">
                Registered course
              </h2>
              <Button
                onClick={() => router.push(PagePath.COURSES)}
                text="View More"
                variant="primaryGradientBorder"
                size="sm"
                shape="rounded"
                className="sm:w-auto w-full"
              />
            </div>

            {isLoadingCourses ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin border-4 border-primary/30 border-t-primary h-10 rounded-full w-10" />
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="flex flex-col gap-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id}>
                    <EnrolledCourseCard {...course} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-prompt text-base text-center text-foreground/70">
                ยังไม่มีคอร์สที่ลงทะเบียนไว้
              </p>
            )}
          </section>

          <section className="flex flex-col gap-6 max-w-7xl w-full">
            <h2 className="font-bold font-prompt md:text-2xl text-left text-secondary text-xl">
              Suggestion courses
            </h2>

            {suggestedCourses.length > 0 ? (
              <div className="flex flex-col gap-6 items-center lg:gap-8 md:flex-row md:gap-6 md:items-stretch w-full">
                {suggestedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex justify-center md:flex-1 w-full"
                  >
                    <CourseCard
                      id={course.id}
                      coverImage={course.coverImage}
                      alt={course.alt}
                      title={course.title}
                      description={course.description}
                      bulletPoints={course.bulletPoints}
                      price={course.price}
                      dateBadgeText={course.dateBadgeText}
                      imageBadgeText={course.imageBadgeText}
                      date={course.dateStart || ""}
                      totalTime={course.totalTime || ""}
                      classType={course.classType || ""}
                      onButtonClick={() => {
                        const priceNum =
                          parseFloat(
                            (course.price || "0").replace(/[^0-9.]/g, ""),
                          ) || 0;
                        addItemToCart({
                          courseId: course.id,
                          courseName: course.title,
                          price: priceNum,
                          date: course.dateStart || "",
                          totalTime: course.totalTime || "",
                          classType: course.classType || "",
                        });
                      }}
                      isButtonLoading={isAddingToCart}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-prompt text-base text-center text-foreground/70">
                ไม่มีคอร์สแนะนำในขณะนี้
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
