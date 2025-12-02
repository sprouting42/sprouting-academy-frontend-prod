import type { PaginatedDocs } from "payload";

import type { Course, CourseDetail } from "../../payload-types";

export type CourseWithDetail = Course & {
  courseDetail?: CourseDetail | string | null;
};

export interface ICourseRepository {
  findById(id: string): Promise<CourseWithDetail | null>;
  findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<CourseWithDetail>>;
  findDetails(limit: number): Promise<PaginatedDocs<CourseDetail>>;
}
