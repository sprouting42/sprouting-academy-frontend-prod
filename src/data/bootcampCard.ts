import { Course } from "@/enum/course";
import type { BootcampCard } from "@/payload/payload-types";
import { cmsFetch } from "@/utils/ky";
import { transformToBootcampCardData } from "@/utils/payloadHelper";

export interface BootcampCardData {
  id: string;
  src: Course | string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageBadgeText: string;
  classType: string;
  textButton: string;
  link: string;
  price: number;
}

interface BootcampCardApiResponse {
  success: boolean;
  data: BootcampCard;
  message?: string;
}

interface BootcampCardListApiResponse {
  success: boolean;
  data: {
    bootcampCards: {
      docs: BootcampCard[];
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
    activeCards: string;
    singleCard: string;
  };
}

export async function fetchBootcampCards(options?: {
  page?: number;
  limit?: number;
}): Promise<{
  bootcampCards: BootcampCardData[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}> {
  const defaultResponse = {
    bootcampCards: [],
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

    const response = await cmsFetch.get<BootcampCardListApiResponse>(
      "routes/bootcampCard",
      Object.keys(searchParams).length > 0 ? searchParams : undefined,
    );

    if (response?.success && response?.data?.bootcampCards) {
      const transformedCards = response.data.bootcampCards.docs
        .map(transformToBootcampCardData)
        .filter((card): card is BootcampCardData => card !== null);

      return {
        bootcampCards: transformedCards,
        totalDocs: response.data.bootcampCards.totalDocs,
        totalPages: response.data.bootcampCards.totalPages,
        page: response.data.bootcampCards.page,
        limit: response.data.bootcampCards.limit,
        hasNextPage: response.data.bootcampCards.hasNextPage,
        hasPrevPage: response.data.bootcampCards.hasPrevPage,
      };
    }
  } catch (error) {
    console.error("Error fetching bootcamp cards:", error);
  }

  return defaultResponse;
}

export async function fetchBootcampCardById(
  id: string,
): Promise<BootcampCardData | null> {
  try {
    const response = await cmsFetch.get<BootcampCardApiResponse>(
      "routes/bootcampCard",
      { id },
    );

    if (response?.success && response?.data) {
      return transformToBootcampCardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching bootcamp card by id:", error);
  }

  return null;
}
