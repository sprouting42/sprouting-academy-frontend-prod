import { fetchEbookBanner, fetchEbookPayload } from "@/data/ebookPayload";

import { EbookContent } from "./ebookContent";

export default async function EbookPage() {
  const [advancedAutomationEbooks, makeForBusinessEbooks, bannerImages] =
    await Promise.all([
      fetchEbookPayload("advanced-automation"),
      fetchEbookPayload("make-for-business"),
      fetchEbookBanner(),
    ]);

  return (
    <EbookContent
      advancedAutomationEbooks={advancedAutomationEbooks}
      makeForBusinessEbooks={makeForBusinessEbooks}
      bannerImages={bannerImages}
    />
  );
}
