import {
  Course,
  CourseDetail,
  Instructor,
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

export function getCoverImageValue(course: Course): MediaCourse | string {
  return course.coursesCoverImage.value;
}

export function getCoverImageAlt(course: Course): string {
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
