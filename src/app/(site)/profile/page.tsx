"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { authApi, isApiSuccessResponse } from "@/apis/auth";
import { enrollmentApi, EnrollmentResponse } from "@/apis/enrollment";
import { CourseCard } from "@/components/card/courseCard";
import { EbookCard } from "@/components/card/ebookCard";
import { EnrolledCourseCard } from "@/components/card/enrolledCourseCard";
import { ProfileCard } from "@/components/card/profileCard";
import { Button } from "@/components/common/button";
import { LibraryTab, LibraryTabs } from "@/components/common/libraryTabs";
import { ProfileSidebar } from "@/components/layout/profileSidebar";
import { EditProfileModal } from "@/components/modal/editProfileModal";
import { CourseData, fetchCourses } from "@/data/courses";
import { fetchEbooksByEbookIds } from "@/data/ebookPayload";
import { ItemType, PagePath } from "@/enum";
import { useAddCourseToCart } from "@/hooks/useAddCourseToCart";
import { authKeys, useGetMe } from "@/hooks/useAuth";
import { type ProfileEditFormData } from "@/schemas/profile.schema";
import { formatThaiDateShort } from "@/utils/dateFormatter";

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

const COURSE_DATE_PREFIX = "เรียนวันที่ ";

interface UserEbook {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pages: number;
  downloadUrl: string | null;
}

const formatCourseDate = (dateString: string): string | undefined => {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    return undefined;
  }

  const dateFormatted = formatThaiDateShort(parsedDate);
  return dateFormatted ? `${COURSE_DATE_PREFIX}${dateFormatted}` : undefined;
};

const getCourseImageUrl = (
  coverImage: CourseData["coverImage"],
): string | undefined => {
  if (typeof coverImage === "string") {
    return coverImage;
  }
  return coverImage?.url || undefined;
};

const mapEnrollmentToCourse = (
  enrollment: EnrollmentResponse,
  courses: CourseData[],
): EnrolledCourse | null => {
  const course = courses.find(
    (c) => c.title === enrollment.course || c.id === enrollment.course,
  );

  if (!course) {
    return null;
  }

  return {
    id: enrollment.id,
    title: course.title,
    description: course.description,
    imageUrl: getCourseImageUrl(course.coverImage),
    instructorName: course.instructorName,
    courseDate: course.dateStart
      ? formatCourseDate(course.dateStart)
      : undefined,
    videoProgress: enrollment.videoProgress,
    bookProgress: enrollment.bookProgress,
  };
};

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useGetMe();
  const { addCourseToCart, isPending: isAddingToCart } = useAddCourseToCart();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [userEbooks, setUserEbooks] = useState<UserEbook[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingEbooks, setIsLoadingEbooks] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeLibraryTab, setActiveLibraryTab] = useState<LibraryTab>("ebook");

  const handleProfileUpdate = useCallback(
    async (data: ProfileEditFormData & { avatarFile?: File | null }) => {
      try {
        let avatarUrl = data.avatarUrl || null;

        if (data.avatarFile) {
          try {
            const uploadResponse = await authApi.uploadAvatar(data.avatarFile);
            if (isApiSuccessResponse(uploadResponse)) {
              avatarUrl = uploadResponse.responseContent.url;
            } else {
              const errorMessage =
                uploadResponse.errorMessage || "ไม่สามารถอัพโหลดรูปภาพได้";
              toast.error(errorMessage);
              return;
            }
          } catch (uploadError) {
            const { getApiErrorMessage } = await import("@/utils/api-error");
            const message = await getApiErrorMessage(uploadError);
            toast.error(message || "ไม่สามารถอัพโหลดรูปภาพได้");
            return;
          }
        }

        const updatePayload = {
          fullName: data.fullName,
          nickname: data.nickname || undefined,
          phone: data.phone || null,
          avatarUrl:
            avatarUrl && avatarUrl.trim() ? avatarUrl.trim() : undefined,
        };

        const hasFieldsToUpdate =
          updatePayload.fullName ||
          updatePayload.nickname !== undefined ||
          updatePayload.phone !== null ||
          updatePayload.avatarUrl !== undefined;

        if (!hasFieldsToUpdate) {
          toast.error("ไม่มีข้อมูลที่จะอัปเดต");
          return;
        }

        const response = await authApi.updateProfile(updatePayload);

        if (isApiSuccessResponse(response)) {
          toast.success("อัปเดตโปรไฟล์สำเร็จ");
          setIsEditModalOpen(false);
          queryClient.invalidateQueries({ queryKey: authKeys.me() });
        } else {
          const errorMessage =
            response.errorMessage || "เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์";
          const validationErrors =
            response.errorDetails?.validationErrors?.errors;
          const fullMessage =
            validationErrors && validationErrors.length > 0
              ? `${errorMessage}\n${validationErrors.join("\n")}`
              : errorMessage;
          toast.error(fullMessage);
        }
      } catch (error) {
        const { getApiErrorMessage } = await import("@/utils/api-error");
        const message = await getApiErrorMessage(error);
        toast.error(message || "เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์");
      }
    },
    [queryClient],
  );
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

    const loadData = async () => {
      try {
        const [fetchedCourses, enrollmentResponse] = await Promise.all([
          fetchCourses(),
          enrollmentApi.getMyEnrollments(),
        ]);

        setCourses(fetchedCourses);

        if (isApiSuccessResponse(enrollmentResponse)) {
          const enrollments = enrollmentResponse.responseContent;
          const mappedCourses = enrollments
            .map((enrollment) =>
              mapEnrollmentToCourse(enrollment, fetchedCourses),
            )
            .filter((course): course is EnrolledCourse => course !== null);

          setEnrolledCourses(mappedCourses);

          const ebookEnrollments = enrollments.filter(
            (enrollment) => enrollment.productType === ItemType.EBOOK,
          );

          if (ebookEnrollments.length > 0) {
            setIsLoadingEbooks(true);
            try {
              const ebookIds = ebookEnrollments.map(
                (enrollment) => enrollment.productId,
              );
              const ebooks = await fetchEbooksByEbookIds(ebookIds);

              const mappedEbooks: UserEbook[] = ebooks.map((ebook) => ({
                id: ebook.id,
                title: ebook.title,
                description: ebook.description,
                coverImage: ebook.coverImage?.src || "/e-book.png",
                pages: ebook.ebookpage || 0,
                downloadUrl: ebook.downloadUrl || null,
              }));

              setUserEbooks(mappedEbooks);
            } catch (error) {
              const { getApiErrorMessage } = await import("@/utils/api-error");
              const message = await getApiErrorMessage(error);
              toast.error(message || "เกิดข้อผิดพลาดในการโหลดข้อมูล ebook");
            }
          }
        } else {
          const errorMessage =
            enrollmentResponse.errorMessage ||
            "ไม่สามารถโหลดข้อมูลการลงทะเบียนได้";
          toast.error(errorMessage);
        }
      } catch (error) {
        const { getApiErrorMessage } = await import("@/utils/api-error");
        const message = await getApiErrorMessage(error);
        toast.error(message || "เกิดข้อผิดพลาดในการโหลดข้อมูลการลงทะเบียน");
      } finally {
        setIsLoadingCourses(false);
        setIsLoadingEbooks(false);
      }
    };

    loadData();
  }, [user, isMounted]);

  const suggestedCourses = useMemo(() => {
    if (courses.length === 0) return [];

    const enrolledCourseTitles = new Set(
      enrolledCourses.map((enrolled) => enrolled.title.toLowerCase().trim()),
    );

    return courses
      .filter((course) => {
        const courseTitle = course.title.toLowerCase().trim();
        return !enrolledCourseTitles.has(courseTitle);
      })
      .slice(0, 3);
  }, [courses, enrolledCourses]);

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
    <div className="flex flex-row gap-0 min-h-screen relative">
      <ProfileSidebar />
      <div className="flex flex-col gap-8 lg:gap-12 lg:ml-58.5 lg:pl-8 lg:w-[calc(100%-theme(spacing.58\.5))] md:gap-10 min-h-screen w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-8 items-center lg:gap-12 lg:pb-20 md:gap-10 md:pb-16 pb-12">
            <h1 className="font-bold font-prompt lg:text-4xl md:text-3xl text-2xl text-left text-secondary w-full">
              User profile
            </h1>

            <div className="flex justify-center w-full">
              <ProfileCard
                avatarUrl={user.avatarUrl}
                fullName={user.fullName}
                nickname={user.nickname}
                email={user.email}
                phone={user.phone}
                certificatesCount={0}
                enrolledCoursesCount={enrolledCourses.length}
                joinDate={user.createdAt}
                onEditClick={() => setIsEditModalOpen(true)}
                className="max-w-7xl w-full"
              />
            </div>

            <EditProfileModal
              open={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              initialData={{
                avatarUrl: user.avatarUrl,
                fullName: user.fullName,
                nickname: user.nickname,
                email: user.email,
                phone: user.phone,
              }}
              onSubmit={handleProfileUpdate}
            />

            <section className="flex flex-col gap-6 max-w-7xl w-full">
              <div className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
                <h2 className="font-bold font-prompt lg:text-2xl md:text-xl text-lg text-secondary">
                  Registered course
                </h2>
                <Button
                  onClick={() => router.push(PagePath.COURSES)}
                  text="View More"
                  variant="primaryGradientBorder"
                  size="sm"
                  shape="rounded"
                  className="lg:text-base md:text-sm sm:w-auto text-xs w-full"
                />
              </div>

              {isLoadingCourses ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin border-4 border-primary/30 border-t-primary h-10 rounded-full w-10" />
                </div>
              ) : enrolledCourses.length > 0 ? (
                <div className="gap-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full">
                  {enrolledCourses.map((course) => (
                    <EnrolledCourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <p className="font-prompt text-base text-center text-foreground/70">
                  ยังไม่มีคอร์สที่ลงทะเบียนไว้
                </p>
              )}
            </section>

            <section className="flex flex-col gap-6 max-w-7xl w-full">
              <div className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
                <h2 className="font-bold font-prompt lg:text-2xl md:text-xl text-lg text-secondary">
                  Suggestion courses
                </h2>
                {suggestedCourses.length > 0 && (
                  <Button
                    onClick={() => router.push(PagePath.COURSES)}
                    text="View More"
                    variant="primaryGradientBorder"
                    size="sm"
                    shape="rounded"
                    className="lg:text-base md:text-sm sm:w-auto text-xs w-full"
                  />
                )}
              </div>

              {suggestedCourses.length > 0 ? (
                <div className="gap-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full">
                  {suggestedCourses.map((course) => (
                    <div key={course.id} className="flex justify-center w-full">
                      <div className="*:max-w-full *:w-full **:max-w-full! w-full">
                        <CourseCard
                          id={course.id}
                          coverImage={course.coverImage}
                          alt={course.alt}
                          title={course.title}
                          description={course.description}
                          bulletPoints={course.bulletPoints}
                          price={course.price}
                          imageBadgeText={course.imageBadgeText}
                          date={course.dateStart || ""}
                          totalTime={course.totalTime || ""}
                          classType={course.classType || ""}
                          onButtonClick={() => addCourseToCart(course)}
                          isButtonLoading={isAddingToCart}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-prompt text-base text-center text-foreground/70">
                  ไม่มีคอร์สแนะนำในขณะนี้
                </p>
              )}
            </section>

            <section className="flex flex-col gap-6 max-w-7xl w-full">
              <h2 className="font-bold font-prompt leading-normal lg:leading-relaxed lg:text-2xl md:leading-relaxed md:text-xl text-lg text-secondary">
                Library
              </h2>

              <LibraryTabs
                activeTab={activeLibraryTab}
                onTabChange={setActiveLibraryTab}
                videoCount={0}
                ebookCount={userEbooks.length}
              />

              {activeLibraryTab === "ebook" ? (
                isLoadingEbooks ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin border-4 border-primary/30 border-t-primary h-10 rounded-full w-10" />
                  </div>
                ) : userEbooks.length > 0 ? (
                  <div className="gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full">
                    {userEbooks.map((ebook) => (
                      <EbookCard
                        key={ebook.id}
                        id={ebook.id}
                        title={ebook.title}
                        description={ebook.description}
                        coverImage={ebook.coverImage}
                        pages={ebook.pages}
                        alt={ebook.title}
                        onDownload={() => {
                          if (ebook.downloadUrl) {
                            window.open(ebook.downloadUrl, "_blank");
                            toast.success("กำลังดาวน์โหลด", {
                              description: `${ebook.title}`,
                            });
                          } else {
                            toast.error("ไม่พบลิงก์ดาวน์โหลด", {
                              description: "กรุณาติดต่อทีมงาน",
                            });
                          }
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="font-prompt text-base text-center text-foreground/70">
                    ยังไม่มี ebook ที่ซื้อแล้ว
                  </p>
                )
              ) : (
                <div className="flex items-center justify-center py-12">
                  <p className="font-prompt text-base text-center text-foreground/70">
                    ยังไม่มีวิดีโอในขณะนี้
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
