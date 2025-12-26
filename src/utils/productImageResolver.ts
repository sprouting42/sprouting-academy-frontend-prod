import type { BootcampCardData } from "@/data/bootcampCard";
import { fetchBootcampCards } from "@/data/bootcampCard";
import type { CourseData } from "@/data/courses";
import { fetchCourses } from "@/data/courses";
import { fetchEbookPayload } from "@/data/ebookPayload";
import { ItemType } from "@/enum/itemType";

/**
 * Resolve product image URL from productId and productType
 * Uses local data from CMS instead of backend API
 */
export async function resolveProductImageUrl(
  productId: string,
  productType: ItemType,
): Promise<string | undefined> {
  try {
    switch (productType) {
      case ItemType.COURSE:
        return await resolveCourseImage(productId);

      case ItemType.EBOOK:
        return await resolveEbookImage(productId);

      case ItemType.BOOTCAMP:
        return await resolveBootcampImage(productId);

      default:
        return undefined;
    }
  } catch (error) {
    console.error(
      `Error resolving image for ${productType} ${productId}:`,
      error,
    );
    return undefined;
  }
}

/**
 * Resolve course image URL from productId
 */
async function resolveCourseImage(
  productId: string,
): Promise<string | undefined> {
  try {
    const courses = await fetchCourses();
    const course = courses.find((c) => c.id === productId);

    if (!course) {
      return undefined;
    }

    return getCourseImageUrl(course.coverImage);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return undefined;
  }
}

/**
 * Resolve ebook image URL from productId
 */
async function resolveEbookImage(
  productId: string,
): Promise<string | undefined> {
  try {
    // Try both categories
    const [advancedEbooks, businessEbooks] = await Promise.all([
      fetchEbookPayload("advanced-automation").catch(() => []),
      fetchEbookPayload("make-for-business").catch(() => []),
    ]);

    const allEbooks = [...advancedEbooks, ...businessEbooks];
    // Match by ebookId (which is the productId in backend)
    const ebook = allEbooks.find(
      (e) => e.id === productId || e.ebookId === productId,
    );

    if (!ebook || !ebook.coverImage) {
      // Fallback to default image
      return "/courses/basicHTML.png";
    }

    return ebook.coverImage.src || "/courses/basicHTML.png";
  } catch (error) {
    console.error("Error fetching ebooks:", error);
    // Fallback to default image
    return "/courses/basicHTML.png";
  }
}

/**
 * Resolve bootcamp image URL from productId
 */
async function resolveBootcampImage(
  productId: string,
): Promise<string | undefined> {
  try {
    const { bootcampCards } = await fetchBootcampCards();
    const bootcamp = bootcampCards.find((b) => b.id === productId);

    if (!bootcamp) {
      return undefined;
    }

    return getBootcampImageUrl(bootcamp.src);
  } catch (error) {
    console.error("Error fetching bootcamp cards:", error);
    return undefined;
  }
}

/**
 * Convert course coverImage (MediaCourse | string) to URL string
 */
function getCourseImageUrl(
  coverImage: CourseData["coverImage"],
): string | undefined {
  if (typeof coverImage === "string") {
    return coverImage;
  }
  return coverImage?.url || undefined;
}

/**
 * Convert bootcamp src (Course | string) to URL string
 */
function getBootcampImageUrl(src: BootcampCardData["src"]): string | undefined {
  if (typeof src === "string") {
    return src;
  }
  // If it's a Course enum or object, try to extract URL
  if (typeof src === "object" && src !== null && "url" in src) {
    return (src as { url?: string }).url || undefined;
  }
  return undefined;
}
