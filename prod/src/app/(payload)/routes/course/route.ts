import type { NextRequest } from "next/server";
import { getPayload } from "payload";

import config from "@/payload/payload.config";
import { CourseRepository } from "@/payload/repositories/CourseRepository";
import {
  getPaginationParams,
  type PaginationParams,
} from "@/payload/utils/pagination";

const FEATURED_DETAILS_LIMIT = 6;

export const GET = async (request: NextRequest) => {
  try {
    const payload = await getPayload({ config });
    const courseRepository = CourseRepository(payload);
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    let pagination: PaginationParams;
    try {
      pagination = getPaginationParams(searchParams);
    } catch {
      return Response.json(
        { success: false, error: "Invalid pagination parameters" },
        { status: 400 },
      );
    }

    const { limit, page } = pagination;

    if (id) {
      const course = await courseRepository.findById(id);

      if (!course) {
        return Response.json(
          {
            success: false,
            error: "Course not found",
          },
          { status: 404 },
        );
      }

      return Response.json({
        success: true,
        data: course,
      });
    }

    const courses = await courseRepository.findAll(page, limit);
    const courseDetails = await courseRepository.findDetails(
      FEATURED_DETAILS_LIMIT,
    );

    return Response.json({
      success: true,
      message: "Successfully fetched data from Payload CMS",
      data: {
        courses: {
          docs: courses.docs,
          totalDocs: courses.totalDocs,
          totalPages: courses.totalPages,
          page: courses.page,
          limit: courses.limit,
          hasNextPage: courses.hasNextPage,
          hasPrevPage: courses.hasPrevPage,
        },
        featuredDetails: courseDetails.docs,
      },
      usage: {
        allCourses: "/course",
        withPagination: "/course?page=1&limit=5",
        singleCourse: "/course?id=course-uuid-here",
      },
    });
  } catch (error) {
    console.error("Error fetching data from Payload:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch data from Payload CMS",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
