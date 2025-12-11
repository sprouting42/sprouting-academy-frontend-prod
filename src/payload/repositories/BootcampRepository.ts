import type { BasePayload, PaginatedDocs } from "payload";

import type { BootcampPage } from "../payload-types";
import type { IBootcampRepository } from "./interfaces/IBootcampRepository";

export const BootcampRepository = (
  payload: BasePayload,
): IBootcampRepository => {
  const findById = async (id: string): Promise<BootcampPage | null> => {
    try {
      const bootcamp = (await payload.findByID({
        collection: "bootcamp-page",
        id,
        depth: 2,
      })) as BootcampPage;

      return bootcamp || null;
    } catch {
      return null;
    }
  };

  const findAll = async (
    page: number,
    limit: number,
  ): Promise<PaginatedDocs<BootcampPage>> => {
    return (await payload.find({
      collection: "bootcamp-page",
      limit,
      page,
      depth: 2,
      sort: "-createdAt",
    })) as PaginatedDocs<BootcampPage>;
  };

  return {
    findById,
    findAll,
  };
};
