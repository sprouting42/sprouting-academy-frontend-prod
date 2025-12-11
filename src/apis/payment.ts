import { interceptedApiFetch } from "@/utils/api-interceptor";

import type { ApiResponse } from "./auth";

export type CreateChargeRequest = {
  orderId: string;
  token: string;
  description?: string;
};

export type CreateChargeResponse = {
  id: string;
  enrollmentId?: string | null;
  omiseChargeId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  failureCode?: string | null;
  failureMessage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RetrieveChargeRequest = {
  chargeId: string;
};

export type RetrieveChargeResponse = CreateChargeResponse;

export type CreateBankTransferRequest = {
  orderId: string;
  file: File;
};

export type BankTransferResponse = {
  id: string;
  enrollmentId: string | null;
  paymentType: string;
  amount: number;
  status: string;
  slipImage: string;
  couponId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetBankTransfersQuery = {
  status?: string;
  type?: string;
};

export type GetMyPaymentsResponse =
  | BankTransferResponse[]
  | CreateChargeResponse[];

export const paymentApi = {
  createCharge: async (
    payload: CreateChargeRequest,
  ): Promise<ApiResponse<CreateChargeResponse>> => {
    return interceptedApiFetch.post<ApiResponse<CreateChargeResponse>>(
      "payment/charge",
      payload,
    );
  },

  retrieveCharge: async (
    chargeId: string,
  ): Promise<ApiResponse<RetrieveChargeResponse>> => {
    return interceptedApiFetch.get<ApiResponse<RetrieveChargeResponse>>(
      `payment/charge/${chargeId}`,
    );
  },

  createBankTransfer: async (
    payload: CreateBankTransferRequest,
  ): Promise<ApiResponse<BankTransferResponse>> => {
    const formData = new FormData();
    formData.append("orderId", payload.orderId);
    formData.append("file", payload.file);

    const BACKEND_BASE_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
    const { getAuthToken } = await import("@/utils/auth");
    const { getLanguage } = await import("@/utils/language");
    const ky = (await import("ky")).default;

    const token = getAuthToken();
    const language = getLanguage();

    const baseUrl = BACKEND_BASE_URL.endsWith("/")
      ? BACKEND_BASE_URL.slice(0, -1)
      : BACKEND_BASE_URL;

    const response = await ky.post(`${baseUrl}/payment/bank-transfer`, {
      body: formData,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "x-language": language,
      },
    });

    return response.json<ApiResponse<BankTransferResponse>>();
  },

  getBankTransfers: async (
    query?: GetBankTransfersQuery,
  ): Promise<ApiResponse<BankTransferResponse[]>> => {
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.type) params.append("type", query.type);

    const path = `payment/bank-transfer${params.toString() ? `?${params.toString()}` : ""}`;
    return interceptedApiFetch.get<ApiResponse<BankTransferResponse[]>>(path);
  },

  getBankTransfersByStatus: async (
    status: string,
  ): Promise<ApiResponse<BankTransferResponse[]>> => {
    return interceptedApiFetch.get<ApiResponse<BankTransferResponse[]>>(
      `payment/bank-transfer/status/${status}`,
    );
  },

  getBankTransfersByEnrollmentCourse: async (
    enrollmentCourseId: string,
  ): Promise<ApiResponse<BankTransferResponse[]>> => {
    return interceptedApiFetch.get<ApiResponse<BankTransferResponse[]>>(
      `payment/bank-transfer/enrollment-course/${enrollmentCourseId}`,
    );
  },

  getBankTransferById: async (
    id: string,
  ): Promise<ApiResponse<BankTransferResponse>> => {
    return interceptedApiFetch.get<ApiResponse<BankTransferResponse>>(
      `payment/bank-transfer/${id}`,
    );
  },

  getPayments: async (
    query?: GetBankTransfersQuery,
  ): Promise<ApiResponse<unknown[]>> => {
    const params = new URLSearchParams();
    if (query?.status) params.append("status", query.status);
    if (query?.type) params.append("type", query.type);

    const path = `payment${params.toString() ? `?${params.toString()}` : ""}`;
    return interceptedApiFetch.get<ApiResponse<unknown[]>>(path);
  },

  getMyPayments: async (): Promise<ApiResponse<GetMyPaymentsResponse>> => {
    return interceptedApiFetch.get<ApiResponse<GetMyPaymentsResponse>>(
      "payment/my-payments",
    );
  },
};

export type DiscordNotificationRequest = {
  courseName: string;
  userName: string;
  orderId: string;
  paymentId: string;
  paymentType: string;
};

export const notificationApi = {
  sendDiscordNotification: async (
    payload: DiscordNotificationRequest,
  ): Promise<void> => {
    const WEBHOOK_URL =
      process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL ||
      "https://n8n-autometion.onrender.com/webhook/Notificate-Course-Academy-Automation-3c13a4d3-8eaf-4f54-bb1b-a1c38cf7d82b";

    try {
      const ky = (await import("ky")).default;
      await ky.post(WEBHOOK_URL, {
        json: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to send Discord notification:", error);
      }
    }
  },
};
