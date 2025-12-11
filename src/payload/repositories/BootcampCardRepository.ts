import type { BasePayload, PaginatedDocs } from "payload";

import type { BootcampCard } from "../payload-types";

export interface IBootcampCardRepository {
  findById(id: string): Promise<BootcampCard | null>;
  findAll(page: number, limit: number): Promise<PaginatedDocs<BootcampCard>>;
  findActive(page: number, limit: number): Promise<PaginatedDocs<BootcampCard>>;
}

export const BootcampCardRepository = (
  payload: BasePayload,
): IBootcampCardRepository => {
  const findById = async (id: string): Promise<BootcampCard | null> => {
    try {
      const bootcampCard = (await payload.findByID({
        collection: "bootcamp-cards",
        id,
        depth: 2,
      })) as BootcampCard;

      return bootcampCard || null;
    } catch {
      return null;
    }
  };

  const findAll = async (
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<BootcampCard>> => {
    return (await payload.find({
      collection: "bootcamp-cards",
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    })) as PaginatedDocs<BootcampCard>;
  };

  const findActive = async (
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<BootcampCard>> => {
    return (await payload.find({
      collection: "bootcamp-cards",
      where: {
        cardStatus: {
          equals: true,
        },
      },
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    })) as PaginatedDocs<BootcampCard>;
  };

  return {
    findById,
    findAll,
    findActive,
  };
};
