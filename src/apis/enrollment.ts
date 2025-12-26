import { interceptedApiFetch } from "@/utils/api-interceptor";

import type { ApiResponse } from "./auth";

export type EnrollmentResponse = {
  id: string;
  userId: string;
  course: string;
  paymentId: string | null;
  productType: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  videoProgress?: {
    current: number;
    total: number;
  };
  bookProgress?: {
    current: number;
    total: number;
  };
};

export const enrollmentApi = {
  getMyEnrollments: async (): Promise<ApiResponse<EnrollmentResponse[]>> => {
    return interceptedApiFetch.get<ApiResponse<EnrollmentResponse[]>>(
      "enrollment",
    );
  },

  getEnrollmentById: async (
    id: string,
  ): Promise<ApiResponse<EnrollmentResponse>> => {
    return interceptedApiFetch.get<ApiResponse<EnrollmentResponse>>(
      `enrollment/${id}`,
    );
  },
};
