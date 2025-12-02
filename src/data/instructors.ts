import { Instructor } from "@/payload/payload-types";
import { cmsFetch } from "@/utils/ky";
import { getInstructorImageUrl } from "@/utils/payloadHelper";

export interface InstructorData {
  id: string;
  instructorImage: string;
  instructorName: string;
  instructorDescription: string;
  instructorHighlight?: string;
}

interface InstructorApiResponse {
  data?: {
    instructors?: {
      docs: Instructor[];
    };
  };
}

function mapInstructorToData(instructor: Instructor): InstructorData {
  return {
    id: instructor.id,
    instructorImage: getInstructorImageUrl(instructor),
    instructorName: instructor.name,
    instructorDescription: instructor.information ?? "",
  };
}

export async function fetchInstructors(): Promise<InstructorData[]> {
  try {
    const response =
      await cmsFetch.get<InstructorApiResponse>("routes/instructor");
    const docs = response.data?.instructors?.docs ?? [];
    return docs.map(mapInstructorToData);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return [];
  }
}
