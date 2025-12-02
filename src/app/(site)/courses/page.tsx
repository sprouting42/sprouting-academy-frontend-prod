import { fetchCoursesAndBanners } from "@/data/courses";

import { Courses } from "./courses.tsx";

export default async function CoursesPage() {
  const { courses, bannerImages } = await fetchCoursesAndBanners();

  return <Courses courses={courses} bannerImages={bannerImages} />;
}
