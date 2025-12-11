import { fetchCoursesAndBanners } from "@/data/courses";
import { fetchPopup } from "@/data/popup";

import { Courses } from "./courses.tsx";

export default async function CoursesPage() {
  const { courses, bannerImages } = await fetchCoursesAndBanners();
  const popupImages = await fetchPopup("course");

  return (
    <Courses
      courses={courses}
      bannerImages={bannerImages}
      popupImages={popupImages}
    />
  );
}
