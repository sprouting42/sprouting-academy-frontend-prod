import { useQuery } from "@tanstack/react-query";

import { type CourseData, fetchCourses } from "@/data/courses";

export function useCourses() {
  return useQuery<CourseData[], Error>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
}
