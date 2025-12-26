import { Founder } from "@/payload/payload-types";
import { cmsFetch } from "@/utils/ky";
import { getInstructorImageUrl } from "@/utils/payloadHelper";

export interface FounderData {
  id: string;
  founderImage: string;
  founderName: string;
  founderDescription: string;
  founderHighlight?: string;
}

interface FounderApiResponse {
  data?: {
    founders?: {
      docs: Founder[];
    };
  };
}

function mapFounderToData(founder: Founder): FounderData {
  return {
    id: founder.id,
    founderImage: getInstructorImageUrl(founder),
    founderName: founder.name,
    founderDescription: founder.information ?? "",
  };
}

export async function fetchFounders(): Promise<FounderData[]> {
  try {
    const response = await cmsFetch.get<FounderApiResponse>("routes/founders");
    const docs = response.data?.founders?.docs ?? [];
    return docs.map(mapFounderToData);
  } catch (error) {
    console.error("Error fetching founders:", error);
    return [];
  }
}
