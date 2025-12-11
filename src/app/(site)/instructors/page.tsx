import { fetchInstructors } from "@/data/instructors";

import Instructors from "./instructors";

export default async function InstructorsPage() {
  const instructors = await fetchInstructors();

  return <Instructors instructors={instructors} />;
}
