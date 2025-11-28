import { fetchInstructors } from "@/data/instructors";

import AboutUs from "./aboutUs";

export default async function AboutUsPage() {
  const instructors = await fetchInstructors();

  return <AboutUs instructors={instructors} />;
}
