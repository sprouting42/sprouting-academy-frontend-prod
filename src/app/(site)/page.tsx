import { fetchBootcampCards } from "@/data/bootcampCard";
import { fetchCourses } from "@/data/courses";
import { fetchInstructors } from "@/data/instructors";

import { HomeContent } from "./homeContent";

export default async function Home() {
  const [courses, instructors, bootcampsResult] = await Promise.all([
    fetchCourses(),
    fetchInstructors(),
    fetchBootcampCards(),
  ]);

  return (
    <HomeContent
      courses={courses}
      instructors={instructors}
      bootcamps={bootcampsResult.bootcampCards}
    />
  );
}
