import { fetchBootcampCards } from "@/data/bootcampCard";
import { fetchCourses } from "@/data/courses";
import { fetchEbookPayload } from "@/data/ebookPayload";
import { ItemType } from "@/enum/itemType";

/**
 * Resolved product data from local CMS data
 */
export interface ResolvedCourseData {
  totalTime?: string;
  classType?: string;
  availableDates?: string[];
}

export interface ResolvedEbookData {
  pageCount?: number;
}

export interface ResolvedBootcampData {
  duration?: string;
  startDate?: string;
  schedule?: string;
  features?: string[];
}

export type ResolvedProductData =
  | ({ type: "course" } & ResolvedCourseData)
  | ({ type: "ebook" } & ResolvedEbookData)
  | ({ type: "bootcamp" } & ResolvedBootcampData);

/**
 * Resolve product data from productId and productType
 * Uses local data from CMS instead of backend API
 */
export async function resolveProductData(
  productId: string,
  productType: ItemType,
): Promise<ResolvedProductData | null> {
  try {
    switch (productType) {
      case ItemType.COURSE:
        return await resolveCourseData(productId);

      case ItemType.EBOOK:
        return await resolveEbookData(productId);

      case ItemType.BOOTCAMP:
        return await resolveBootcampData(productId);

      default:
        return null;
    }
  } catch (error) {
    console.error(
      `Error resolving data for ${productType} ${productId}:`,
      error,
    );
    return null;
  }
}

/**
 * Resolve course data from productId
 */
async function resolveCourseData(
  productId: string,
): Promise<({ type: "course" } & ResolvedCourseData) | null> {
  try {
    const courses = await fetchCourses();
    const course = courses.find((c) => c.id === productId);

    if (!course) {
      return null;
    }

    return {
      type: "course",
      totalTime: course.totalTime,
      classType: course.classType,
      availableDates: course.dateOptions,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return null;
  }
}

/**
 * Resolve ebook data from productId
 * Note: pageCount is not available in EbookPayload, so we return empty object
 * The component should use cart item's pageCount as fallback
 */
async function resolveEbookData(
  productId: string,
): Promise<({ type: "ebook" } & ResolvedEbookData) | null> {
  try {
    // Try both categories
    const [advancedEbooks, businessEbooks] = await Promise.all([
      fetchEbookPayload("advanced-automation").catch(() => []),
      fetchEbookPayload("make-for-business").catch(() => []),
    ]);

    const allEbooks = [...advancedEbooks, ...businessEbooks];
    // Match by id or ebookId
    const ebook = allEbooks.find(
      (e) => e.id === productId || e.ebookId === productId,
    );

    if (!ebook) {
      return null;
    }

    // EbookPayload doesn't have pageCount, return empty object
    // Component should use cart item's pageCount
    return {
      type: "ebook",
    };
  } catch (error) {
    console.error("Error fetching ebooks:", error);
    return null;
  }
}

/**
 * Resolve bootcamp data from productId
 * Note: BootcampCardData doesn't have duration, startDate, schedule, features
 * These should come from BootcampPage, but for now we return empty object
 * Component should use cart item's data as fallback
 */
async function resolveBootcampData(
  productId: string,
): Promise<({ type: "bootcamp" } & ResolvedBootcampData) | null> {
  try {
    const { bootcampCards } = await fetchBootcampCards();
    const bootcamp = bootcampCards.find((b) => b.id === productId);

    if (!bootcamp) {
      return null;
    }

    // BootcampCardData doesn't have these fields
    // Return empty object, component will use cart item's data
    return {
      type: "bootcamp",
    };
  } catch (error) {
    console.error("Error fetching bootcamp cards:", error);
    return null;
  }
}
