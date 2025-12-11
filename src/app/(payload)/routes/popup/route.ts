import type { NextRequest } from "next/server";
import { getPayload } from "payload";

import config from "@/payload/payload.config";
import { MediaPopupRepository } from "@/payload/repositories/MediaPopupRepositort";
import {
  getPaginationParams,
  type PaginationParams,
} from "@/payload/utils/pagination";

export const GET = async (request: NextRequest) => {
  try {
    const payload = await getPayload({ config });
    const popupRepository = MediaPopupRepository(payload);
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const content = searchParams.get("content");

    if (id) {
      const popup = await popupRepository.findById(id);

      if (!popup) {
        return Response.json(
          {
            success: false,
            error: "Popup not found",
          },
          { status: 404 },
        );
      }

      // Check if activePopup is true
      if (!popup.activePopup) {
        return Response.json(
          {
            success: false,
            error: "Popup is not enabled",
          },
          { status: 404 },
        );
      }

      return Response.json({
        success: true,
        data: popup,
      });
    }

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

    // Fetch popups based on content filter
    const popups = content
      ? await popupRepository.findByContent(content, page, limit)
      : await popupRepository.findActive(page, limit);

    return Response.json({
      success: true,
      message: "Successfully fetched popups from Payload CMS",
      data: {
        popups: {
          docs: popups.docs,
          totalDocs: popups.totalDocs,
          totalPages: popups.totalPages,
          page: popups.page,
          limit: popups.limit,
          hasNextPage: popups.hasNextPage,
          hasPrevPage: popups.hasPrevPage,
        },
      },
      usage: {
        allPopups: "/popup",
        withPagination: "/popup?page=1&limit=5",
        filterByContent: "/popup?content=bootcamp",
        singlePopup: "/popup?id=popup-uuid-here",
      },
    });
  } catch (error) {
    console.error("Error fetching popups from Payload:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch popups from Payload CMS",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
