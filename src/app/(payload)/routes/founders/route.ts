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
        const founder = await payload.findByID({
          collection: "founders",
          id,
          depth: 2,
        });

        if (!founder) {
          return Response.json(
            {
              success: false,
              error: "Founder not found",
            },
            { status: 404 },
          );
        }

        return Response.json({
          success: true,
          data: founder,
        });
      } catch {
        return Response.json(
          {
            success: false,
            error: "Founder not found",
          },
          { status: 404 },
        );
      }
    }

    const founders = await payload.find({
      collection: "founders",
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    });

    return Response.json({
      success: true,
      message: "Successfully fetched founders from Payload CMS",
      data: {
        founders: {
          docs: founders.docs,
          totalDocs: founders.totalDocs,
          totalPages: founders.totalPages,
          page: founders.page,
          limit: founders.limit,
          hasNextPage: founders.hasNextPage,
          hasPrevPage: founders.hasPrevPage,
        },
      },
      usage: {
        allFounders: "/founders",
        withPagination: "/founders?page=1&limit=5",
        singleFounder: "/founders?id=founder-uuid-here",
      },
    });
  } catch (error) {
    console.error("Error fetching founders from Payload:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch founders from Payload CMS",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
