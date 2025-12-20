import type { QuotationFormData } from "@/schemas/quotation.schema";
import { cmsFetch } from "@/utils/ky";

interface QuotationSubmissionResponse {
  doc: {
    id: string;
    companyName: string;
    contactPersonName: string;
    phone: string;
    email: string;
    courses: { courseId: string }[];
    numberOfStudents: string;
    budget?: string;
    additionalDetails?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export const submitQuotation = async (
  data: QuotationFormData,
): Promise<QuotationSubmissionResponse> => {
  return cmsFetch.post<QuotationSubmissionResponse>(
    "api/quotation-submissions",
    {
      companyName: data.companyName,
      contactPersonName: data.contactPersonName,
      phone: data.phone,
      email: data.email,
      courses: data.courses.map((courseId) => ({ courseId })),
      numberOfStudents: data.numberOfStudents,
      budget: data.budget || "",
      additionalDetails: data.additionalDetails || "",
      status: "pending",
    },
  );
};
