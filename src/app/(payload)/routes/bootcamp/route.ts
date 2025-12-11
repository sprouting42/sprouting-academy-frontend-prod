import type { NextRequest } from "next/server";
import { getPayload } from "payload";

import config from "@/payload/payload.config";
import { BootcampRepository } from "@/payload/repositories/BootcampRepository";
import {
  getPaginationParams,
  type PaginationParams,
} from "@/payload/utils/pagination";

export const GET = async (request: NextRequest) => {
  try {
    const payload = await getPayload({ config });
    const bootcampRepository = BootcampRepository(payload);
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
      const bootcamp = await bootcampRepository.findById(id);

      if (!bootcamp) {
        return Response.json(
          {
            success: false,
            error: "Bootcamp not found",
          },
          { status: 404 },
        );
      }

      return Response.json({
        success: true,
        data: bootcamp,
      });
    }

    const bootcamps = await bootcampRepository.findAll(page, limit);

    return Response.json({
      success: true,
      message: "Successfully fetched bootcamps from Payload CMS",
      data: {
        bootcamps: {
          docs: bootcamps.docs,
          totalDocs: bootcamps.totalDocs,
          totalPages: bootcamps.totalPages,
          page: bootcamps.page,
          limit: bootcamps.limit,
          hasNextPage: bootcamps.hasNextPage,
          hasPrevPage: bootcamps.hasPrevPage,
        },
      },
      usage: {
        allBootcamps: "/bootcamp",
        withPagination: "/bootcamp?page=1&limit=5",
        singleBootcamp: "/bootcamp?id=bootcamp-uuid-here",
      },
    });
  } catch (error) {
    console.error("Error fetching bootcamps from Payload:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch bootcamps from Payload CMS",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
