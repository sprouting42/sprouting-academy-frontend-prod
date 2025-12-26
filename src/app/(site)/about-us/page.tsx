import { fetchFounders } from "@/data/founders";

import AboutUs from "./aboutUs";

export default async function AboutUsPage() {
  const founders = await fetchFounders();

  return <AboutUs founders={founders} />;
}
