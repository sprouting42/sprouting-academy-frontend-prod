import type { BasePayload, PaginatedDocs } from "payload";

import type { MediaPopup } from "../payload-types";

export interface IMediaPopupRepository {
  findById(id: string): Promise<MediaPopup | null>;
  findActive(page: number, limit: number): Promise<PaginatedDocs<MediaPopup>>;
  findByContent(
    content: string,
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<MediaPopup>>;
}

export const MediaPopupRepository = (
  payload: BasePayload,
): IMediaPopupRepository => {
  const findById = async (id: string): Promise<MediaPopup | null> => {
    try {
      const popup = (await payload.findByID({
        collection: "media-popup",
        id,
        depth: 2,
      })) as MediaPopup;

      return popup || null;
    } catch {
      return null;
    }
  };

  const findActive = async (
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<MediaPopup>> => {
    return (await payload.find({
      collection: "media-popup",
      where: {
        activePopup: {
          equals: true,
        },
      },
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    })) as PaginatedDocs<MediaPopup>;
  };

  const findByContent = async (
    content: string,
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<MediaPopup>> => {
    return (await payload.find({
      collection: "media-popup",
      where: {
        and: [
          {
            activePopup: {
              equals: true,
            },
          },
          {
            content: {
              equals: content,
            },
          },
        ],
      },
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    })) as PaginatedDocs<MediaPopup>;
  };

  return {
    findById,
    findActive,
    findByContent,
  };
};
