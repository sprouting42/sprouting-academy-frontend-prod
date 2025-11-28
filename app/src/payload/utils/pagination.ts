export type PaginationParams = {
  limit: number;
  page: number;
};

export function getPaginationParams(
  searchParams: URLSearchParams,
  options?: {
    defaultLimit?: number;
    defaultPage?: number;
  },
): PaginationParams {
  const { defaultLimit = 10, defaultPage = 1 } = options || {};

  const minLimit = 1;
  const maxLimit = 100;

  const rawLimit = searchParams.get("limit") ?? String(defaultLimit);
  const rawPage = searchParams.get("page") ?? String(defaultPage);

  const limit = parseInt(rawLimit, 10);
  const page = parseInt(rawPage, 10);

  if (
    Number.isNaN(limit) ||
    Number.isNaN(page) ||
    limit < minLimit ||
    limit > maxLimit ||
    page < 1 ||
    !Number.isInteger(limit) ||
    !Number.isInteger(page)
  ) {
    throw new Error("Invalid pagination parameters");
  }

  return { limit, page };
}
