import type { BasePayload, PaginatedDocs } from "payload";

import type { CourseDetail } from "../payload-types";
import type {
  CourseWithDetail,
  ICourseRepository,
} from "./interfaces/ICourseRepository";

export const CourseRepository = (payload: BasePayload): ICourseRepository => {
  const findById = async (id: string): Promise<CourseWithDetail | null> => {
    const course = (await payload.findByID({
      collection: "courses",
      id: id,
      depth: 3,
    })) as CourseWithDetail;

    if (!course) return null;

    if (!course.courseDetail) {
      const relatedDetail = (await payload.find({
        collection: "course-detail",
        where: {
          courses: {
            contains: id,
          },
        },
        depth: 2,
        limit: 1,
      })) as PaginatedDocs<CourseDetail>;

      if (relatedDetail.docs.length > 0) {
        course.courseDetail = relatedDetail.docs[0];
      }
    }

    return course;
  };

  const findAll = async (
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<CourseWithDetail>> => {
    const courses = (await payload.find({
      collection: "courses",
      where: {
        courseStatus: {
          equals: true,
        },
      },
      limit,
      page,
      depth: 3,
      sort: "-createdAt",
    })) as PaginatedDocs<CourseWithDetail>;

    const missingCourseIds = courses.docs
      .filter((course) => !course.courseDetail)
      .map((course) => course.id);

    if (missingCourseIds.length === 0) {
      return courses;
    }

    const relatedCourseDetails = (await payload.find({
      collection: "course-detail",
      where: {
        courses: {
          in: missingCourseIds,
        },
      },
      depth: 2,
      limit: missingCourseIds.length,
    })) as PaginatedDocs<CourseDetail>;

    const courseDetailMap = new Map<string, CourseDetail>();

    const collectCourseIds = (
      relatedCourses: CourseDetail["courses"],
    ): string[] => {
      if (Array.isArray(relatedCourses)) {
        return relatedCourses.map((course) =>
          typeof course === "object" && course !== null ? course.id : course,
        );
      }

      const course = relatedCourses as unknown as string | CourseWithDetail;
      const courseId =
        typeof course === "object" && course !== null ? course.id : course;
      return [courseId];
    };

    relatedCourseDetails.docs.forEach((detail) => {
      collectCourseIds(detail.courses).forEach((courseId) => {
        if (courseId) {
          courseDetailMap.set(courseId, detail);
        }
      });
    });

    const coursesWithDetails = courses.docs.map((course) => {
      if (course.courseDetail) {
        return course;
      }

      const detail = courseDetailMap.get(course.id);

      if (detail) {
        return {
          ...course,
          courseDetail: detail,
        };
      }

      return course;
    });

    return {
      ...courses,
      docs: coursesWithDetails,
    };
  };

  const findDetails = async (
    limit: number,
  ): Promise<PaginatedDocs<CourseDetail>> => {
    return (await payload.find({
      collection: "course-detail",
      limit,
    })) as PaginatedDocs<CourseDetail>;
  };

  return {
    findById,
    findAll,
    findDetails,
  };
};
