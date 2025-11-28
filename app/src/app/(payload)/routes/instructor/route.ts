import type { NextRequest } from "next/server";
import { getPayload } from "payload";

import config from "@/payload/payload.config";
import {
  getPaginationParams,
  type PaginationParams,
} from "@/payload/utils/pagination";

export const GET = async (request: NextRequest) => {
  try {
    const payload = await getPayload({ config });
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
      try {
        const instructor = await payload.findByID({
          collection: "instructors",
          id,
          depth: 2,
        });

        if (!instructor) {
          return Response.json(
            {
              success: false,
              error: "Instructor not found",
            },
            { status: 404 },
          );
        }

        return Response.json({
          success: true,
          data: instructor,
        });
      } catch {
        return Response.json(
          {
            success: false,
            error: "Instructor not found",
          },
          { status: 404 },
        );
      }
    }

    const instructors = await payload.find({
      collection: "instructors",
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    });

    return Response.json({
      success: true,
      message: "Successfully fetched instructors from Payload CMS",
      data: {
        instructors: {
          docs: instructors.docs,
          totalDocs: instructors.totalDocs,
          totalPages: instructors.totalPages,
          page: instructors.page,
          limit: instructors.limit,
          hasNextPage: instructors.hasNextPage,
          hasPrevPage: instructors.hasPrevPage,
        },
      },
      usage: {
        allInstructors: "/instructor",
        withPagination: "/instructor?page=1&limit=5",
        singleInstructor: "/instructor?id=instructor-uuid-here",
      },
    });
  } catch (error) {
    console.error("Error fetching instructors from Payload:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch instructors from Payload CMS",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
