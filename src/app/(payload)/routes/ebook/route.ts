import type { NextRequest } from "next/server";
import { getPayload } from "payload";

import config from "@/payload/payload.config";
import { getPaginationParams } from "@/payload/utils/pagination";

export const GET = async (request: NextRequest) => {
  try {
    const payload = await getPayload({ config });
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const ebookId = searchParams.get("ebookId");
    const category = searchParams.get("category");

    if (!id && !ebookId) {
      try {
        getPaginationParams(searchParams);
      } catch {
        return Response.json(
          { success: false, error: "Invalid pagination parameters" },
          { status: 400 },
        );
      }
    }

    let limit = 10;
    let page = 1;
    if (!id && !ebookId) {
      try {
        const pagination = getPaginationParams(searchParams);
        limit = pagination.limit;
        page = pagination.page;
      } catch {}
    }

    if (id) {
      const ebook = await payload.findByID({
        collection: "ebooks",
        id: id,
        depth: 2,
      });

      if (!ebook) {
        return Response.json(
          {
            success: false,
            error: "Ebook not found",
          },
          { status: 404 },
        );
      }

      if (!ebook.isActive) {
        return Response.json(
          {
            success: false,
            error: "Ebook is not active",
          },
          { status: 404 },
        );
      }

      return Response.json({
        success: true,
        data: ebook,
      });
    }

    if (ebookId) {
      const ebooks = await payload.find({
        collection: "ebooks",
        where: {
          and: [
            {
              isActive: {
                equals: true,
              },
            },
            {
              ebookId: {
                equals: ebookId,
              },
            },
          ],
        },
        limit: 1,
        depth: 2,
      });

      if (!ebooks.docs || ebooks.docs.length === 0) {
        return Response.json(
          {
            success: false,
            error: "Ebook not found",
          },
          { status: 404 },
        );
      }

      return Response.json({
        success: true,
        data: ebooks.docs[0],
      });
    }

    const ebooks = category
      ? await payload.find({
          collection: "ebooks",
          where: {
            and: [
              {
                isActive: {
                  equals: true,
                },
              },
              {
                category: {
                  equals: category,
                },
              },
            ],
          },
          limit,
          page,
          depth: 2,
          sort: "-createdAt",
        })
      : await payload.find({
          collection: "ebooks",
          where: {
            isActive: {
              equals: true,
            },
          },
          limit,
          page,
          depth: 2,
          sort: "-createdAt",
        });

    return Response.json({
      success: true,
      message: "Successfully fetched data from Payload CMS",
      data: {
        ebooks: {
          docs: ebooks.docs,
          totalDocs: ebooks.totalDocs,
          totalPages: ebooks.totalPages,
          page: ebooks.page,
          limit: ebooks.limit,
          hasNextPage: ebooks.hasNextPage,
          hasPrevPage: ebooks.hasPrevPage,
        },
      },
      usage: {
        allEbooks: "/ebook",
        withPagination: "/ebook?page=1&limit=5",
        filterByCategory: "/ebook?category=advanced-automation",
        singleEbook: "/ebook?id=ebook-uuid-here",
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
