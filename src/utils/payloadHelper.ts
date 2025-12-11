import type { BootcampCardData } from "@/data/bootcampCard";
import { Course } from "@/enum/course";
import type {
  BootcampCard,
  BootcampPage,
  Course as CourseType,
  CourseDetail,
  Instructor,
  MediaBootcamp,
  MediaCourse,
} from "@/payload/payload-types";

function isMediaCourse(value: unknown): value is MediaCourse {
  return (
    !!value && typeof value === "object" && "alt" in value && "url" in value
  );
}

export function isInstructor(value: unknown): value is Instructor {
  return (
    !!value && typeof value === "object" && "name" in value && "id" in value
  );
}

export function getCoverImageValue(course: CourseType): MediaCourse | string {
  return course.coursesCoverImage.value;
}

export function getCoverImageAlt(course: CourseType): string {
  const { value } = course.coursesCoverImage;
  if (isMediaCourse(value)) {
    return value.alt;
  }
  return course.coursesTitle;
}

export function getInstructorImageUrl(
  instructor?: CourseDetail["instructor"],
): string {
  if (!instructor || typeof instructor === "string") {
    return "";
  }

  const { image } = instructor;
  if (!image || typeof image === "string") {
    return "";
  }

  return image.url || "";
}

function isMediaBootcamp(value: unknown): value is MediaBootcamp {
  return (
    !!value &&
    typeof value === "object" &&
    "id" in value &&
    "url" in value &&
    "alt" in value
  );
}

export function getBootcampCoverImageUrl(bootcamp: BootcampPage): string {
  const { value } = bootcamp.hero.bootcampCoverImage;
  if (isMediaBootcamp(value)) {
    return value.url || "";
  }
  return "";
}

export function getBootcampCoverImageAlt(bootcamp: BootcampPage): string {
  const { value } = bootcamp.hero.bootcampCoverImage;
  if (isMediaBootcamp(value)) {
    return value.alt || "";
  }
  return bootcamp.hero.title;
}

export function getToolStackImageUrl(
  image: BootcampPage["toolStack"]["stackImages"][number]["src"],
): string {
  const { value } = image;
  if (isMediaBootcamp(value)) {
    return value.url || "";
  }
  return "";
}

export function getToolStackImageAlt(
  image: BootcampPage["toolStack"]["stackImages"][number]["src"],
): string {
  const { value } = image;
  if (isMediaBootcamp(value)) {
    return value.alt || "";
  }
  return "";
}

export function getCoursePlannerImageUrls(bootcamp: BootcampPage): string[] {
  const { coursePlanner } = bootcamp as unknown as {
    coursePlanner?:
      | {
          profileImage?: { value?: unknown };
        }
      | {
          profileImage?: { value?: unknown };
        }[];
  };

  if (!coursePlanner) {
    return [];
  }

  const planners = Array.isArray(coursePlanner)
    ? coursePlanner
    : [coursePlanner];

  return planners
    .map((planner) => {
      if (
        !planner ||
        typeof planner !== "object" ||
        !("profileImage" in planner)
      ) {
        return "";
      }

      const { value } = (planner as { profileImage: { value?: unknown } })
        .profileImage;

      if (isMediaBootcamp(value)) {
        return value.url || "";
      }
      return "";
    })
    .filter((url) => url !== "");
}

export function transformToBootcampCardData(
  card: BootcampCard,
): BootcampCardData | null {
  if (!card.BootcampImage || typeof card.BootcampImage === "string")
    return null;

  return {
    id: card.id,
    src: card.BootcampImage.url as unknown as Course,
    alt: (card.BootcampImage.alt as string) || "",
    title: card.BootcampTitle || "",
    description: card.BootcampDescription || "",
    bulletPoints:
      card.BootcampBulletPoints?.map((bp) => bp.BootcampBulletText) || [],
    imageBadgeText: card.imageBadgeText || "",
    classType: card.classType || "",
    textButton: "ดูรายละเอียด",
    link:
      typeof card.link === "object" && card.link?.slug
        ? `/bootcamps/${card.link.slug}`
        : "#",
  };
}
