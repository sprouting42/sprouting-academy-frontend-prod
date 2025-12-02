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
      const banner = await payload.findByID({
        collection: "media-banner",
        id: id,
        depth: 2,
      });

      if (!banner) {
        return Response.json(
          {
            success: false,
            error: "Banner not found",
          },
          { status: 404 },
        );
      }

      return Response.json({
        success: true,
        data: banner,
      });
    }

    const banners = await payload.find({
      collection: "media-banner",
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    });

    return Response.json({
      success: true,
      message: "Successfully fetched data from Payload CMS",
      data: {
        banners: {
          docs: banners.docs,
          totalDocs: banners.totalDocs,
          totalPages: banners.totalPages,
          page: banners.page,
          limit: banners.limit,
          hasNextPage: banners.hasNextPage,
          hasPrevPage: banners.hasPrevPage,
        },
      },
      usage: {
        allBanners: "/banner",
        withPagination: "/banner?page=1&limit=5",
        singleBanner: "/banner?id=banner-uuid-here",
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
