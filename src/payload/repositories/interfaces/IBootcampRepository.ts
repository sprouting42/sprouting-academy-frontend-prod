import type { PaginatedDocs } from "payload";

import type { BootcampPage } from "../../payload-types";

export interface IBootcampRepository {
  findById(id: string): Promise<BootcampPage | null>;
  findAll(page: number, limit: number): Promise<PaginatedDocs<BootcampPage>>;
}
