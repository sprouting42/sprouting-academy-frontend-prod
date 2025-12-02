import type { ReactNode } from "react";

import {
  Course,
  CourseDetail,
  MediaBanner,
  MediaCourse,
} from "@/payload/payload-types";
import { formatDate } from "@/utils/dateFormatter";
import { cmsFetch } from "@/utils/ky";
import {
  getCoverImageAlt,
  getCoverImageValue,
  getInstructorImageUrl,
  isInstructor,
} from "@/utils/payloadHelper";

export interface CourseCardProps {
  coverImage: MediaCourse | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  price: string;
  dateBadgeText: string;
  imageBadgeText: string;
  dateStart?: string;
}

export interface CourseDetailProps {
  courseBenefit?: string;
  courseTopics?: ReactNode[];
  caseStudies?: ReactNode[];
  classType?: string;
  totalTime?: string;
  startDate?: string;
  instructorImage?: string;
  instructorName?: string;
  instructorInformation?: string;
}

export interface CourseData extends CourseCardProps, CourseDetailProps {
  id: string;
}

interface CourseWithDetail extends Course {
  courseDetail?: CourseDetail;
}

interface CourseApiResponse {
  data: {
    courses: {
      docs: CourseWithDetail[];
    };
  };
}

interface BannerApiResponse {
  success: boolean;
  data: {
    banners: {
      docs: MediaBanner[];
    };
  };
}

function mapCourseToData(course: CourseWithDetail): CourseData {
  const detail = course.courseDetail;
  const instructor = detail?.instructor;
  const instructorData = isInstructor(instructor) ? instructor : undefined;

  return {
    id: course.id,
    coverImage: getCoverImageValue(course),
    alt: getCoverImageAlt(course),
    title: course.coursesTitle,
    description: course.coursesSubtitle,
    bulletPoints: course.detailsBulletPoints?.map((b) => b.bulletPoint) || [],
    price: course.normalPrice
      ? `${Number(course.normalPrice).toLocaleString()} บาท`
      : "",
    dateBadgeText: formatDate(course.coursesDate)
      ? `เรียนวันที่ ${formatDate(course.coursesDate)}`
      : "",
    imageBadgeText: course.coverBadgeText || "",
    courseBenefit: detail?.courseBenefit || "",
    courseTopics: detail?.courseTopics?.map((t) => t.topic) || [],
    caseStudies: detail?.caseStudies?.map((s) => s.caseStudy) || [],
    classType: detail?.classType || undefined,
    totalTime: detail?.totalTimesCourse
      ? `${detail.totalTimesCourse} ชั่วโมง`
      : "",
    instructorImage: getInstructorImageUrl(instructorData),
    instructorName: instructorData?.name || "",
    instructorInformation: instructorData?.information || "",
    dateStart: course.coursesDate,
  };
}

export async function fetchCourses(): Promise<CourseData[]> {
  let mappedCourses: CourseData[] = [];

  try {
    const courseResponse =
      await cmsFetch.get<CourseApiResponse>("routes/course");

    if (courseResponse?.data?.courses?.docs) {
      mappedCourses = courseResponse.data.courses.docs.map(mapCourseToData);
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  return mappedCourses;
}

export async function fetchCoursesAndBanners(): Promise<{
  courses: CourseData[];
  bannerImages: { src: string; alt?: string }[];
}> {
  let mappedCourses: CourseData[] = [];
  let bannerImages: { src: string; alt?: string }[] = [];

  try {
    const [courseResponse, bannerResponse] = await Promise.all([
      cmsFetch.get<CourseApiResponse>("routes/course"),
      cmsFetch.get<BannerApiResponse>("routes/banner"),
    ]);

    if (courseResponse?.data?.courses?.docs) {
      mappedCourses = courseResponse.data.courses.docs.map(mapCourseToData);
    }

    if (bannerResponse?.success && bannerResponse?.data?.banners?.docs) {
      bannerImages = bannerResponse.data.banners.docs
        .filter((banner) => banner.url)
        .map((banner) => ({
          src: banner.url || "",
          alt: banner.alt || undefined,
        }));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return { courses: mappedCourses, bannerImages };
}
