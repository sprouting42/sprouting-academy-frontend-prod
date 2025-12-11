import { fetchBootcampCards } from "@/data/bootcampCard";
import { fetchPopup } from "@/data/popup";

import { BootcampsContent } from "./bootcampsContent";

export default async function BootcampsPage() {
  const result = await fetchBootcampCards();
  const popupImages = await fetchPopup("bootcamp");
  return (
    <BootcampsContent
      bootcampsData={result.bootcampCards}
      popupImages={popupImages}
    />
  );
}
