import type { NextRequest } from "next/server";
import { getPayload } from "payload";

import config from "@/payload/payload.config";
import { BootcampCardRepository } from "@/payload/repositories/BootcampCardRepository";
import {
  getPaginationParams,
  type PaginationParams,
} from "@/payload/utils/pagination";

export const GET = async (request: NextRequest) => {
  try {
    const payload = await getPayload({ config });
    const bootcampCardRepository = BootcampCardRepository(payload);
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
      const bootcampCard = await bootcampCardRepository.findById(id);

      if (!bootcampCard) {
        return Response.json(
          {
            success: false,
            error: "Bootcamp Card not found",
          },
          { status: 404 },
        );
      }

      return Response.json({
        success: true,
        data: bootcampCard,
      });
    }

    const bootcampCards = await bootcampCardRepository.findActive(page, limit);

    return Response.json({
      success: true,
      message: "Successfully fetched active bootcamp cards from Payload CMS",
      data: {
        bootcampCards: {
          docs: bootcampCards.docs,
          totalDocs: bootcampCards.totalDocs,
          totalPages: bootcampCards.totalPages,
          page: bootcampCards.page,
          limit: bootcampCards.limit,
          hasNextPage: bootcampCards.hasNextPage,
          hasPrevPage: bootcampCards.hasPrevPage,
        },
      },
      usage: {
        activeCards: "/bootcampCard",
        singleCard: "/bootcampCard?id=bootcamp-card-uuid-here",
      },
    });
  } catch (error) {
    console.error("Error fetching bootcamp cards from Payload:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch bootcamp cards from Payload CMS",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
