import type { BootcampPage } from "@/payload/payload-types";
import { cmsFetch } from "@/utils/ky";

interface BootcampApiResponse {
  success: boolean;
  data: BootcampPage;
  message?: string;
  usage?: {
    allBootcamps: string;
    withPagination: string;
    singleBootcamp: string;
  };
}

interface BootcampListApiResponse {
  success: boolean;
  data: {
    bootcamps: {
      docs: BootcampPage[];
      totalDocs: number;
      totalPages: number;
      page: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  message?: string;
  usage?: {
    allBootcamps: string;
    withPagination: string;
    singleBootcamp: string;
  };
}

export async function fetchBootcampById(
  id: string,
): Promise<BootcampPage | null> {
  try {
    const response = await cmsFetch.get<BootcampApiResponse>(
      "routes/bootcamp",
      { id },
    );

    if (response?.success && response?.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching bootcamp by id:", error);
  }

  return null;
}

export async function fetchBootcampBySlug(
  slug: string,
): Promise<BootcampPage | null> {
  try {
    const response =
      await cmsFetch.get<BootcampListApiResponse>("routes/bootcamp");

    if (response?.success && response?.data?.bootcamps?.docs) {
      const bootcamp = response.data.bootcamps.docs.find(
        (b) => b.slug === slug,
      );
      return bootcamp || null;
    }
  } catch (error) {
    console.error("Error fetching bootcamp by slug:", error);
  }

  return null;
}

export async function fetchBootcamps(options?: {
  page?: number;
  limit?: number;
}): Promise<{
  bootcamps: BootcampPage[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}> {
  const defaultResponse = {
    bootcamps: [],
    totalDocs: 0,
    totalPages: 0,
    page: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  };

  try {
    const searchParams: Record<string, string> = {};
    if (options?.page) {
      searchParams.page = options.page.toString();
    }
    if (options?.limit) {
      searchParams.limit = options.limit.toString();
    }

    const response = await cmsFetch.get<BootcampListApiResponse>(
      "routes/bootcamp",
      Object.keys(searchParams).length > 0 ? searchParams : undefined,
    );

    if (response?.success && response?.data?.bootcamps) {
      return {
        bootcamps: response.data.bootcamps.docs,
        totalDocs: response.data.bootcamps.totalDocs,
        totalPages: response.data.bootcamps.totalPages,
        page: response.data.bootcamps.page,
        limit: response.data.bootcamps.limit,
        hasNextPage: response.data.bootcamps.hasNextPage,
        hasPrevPage: response.data.bootcamps.hasPrevPage,
      };
    }
  } catch (error) {
    console.error("Error fetching bootcamps:", error);
  }

  return defaultResponse;
}
