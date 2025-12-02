import { fetchCourses } from "@/data/courses";
import { fetchInstructors } from "@/data/instructors";

import { HomeContent } from "./homeContent";

export default async function Home() {
  const [courses, instructors] = await Promise.all([
    fetchCourses(),
    fetchInstructors(),
  ]);

  return <HomeContent courses={courses} instructors={instructors} />;
}
