import { interceptedApiFetch } from "@/utils/api-interceptor";

export type SignInWithOtpRequest = {
  email: string;
  fullName?: string;
  phone?: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type ApiSuccessResponse<T> = {
  isSuccessful: true;
  correlationId: string;
  responseDate: string;
  responseContent: T;
  statusCode: number;
  status: string;
};

export type ApiErrorResponse = {
  isSuccessful: false;
  correlationId: string;
  responseDate: string;
  statusCode: number;
  status: string;
  errorMessage: string;
  errorDetails?: {
    message: string;
    code: string;
    validationErrors?: {
      errors: string[];
    };
  };
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const isApiErrorResponse = (
  response: ApiResponse<unknown>,
): response is ApiErrorResponse => {
  return response.isSuccessful === false;
};

export const isApiSuccessResponse = <T>(
  response: ApiResponse<T>,
): response is ApiSuccessResponse<T> => {
  return response.isSuccessful === true;
};

export type SignInWithOtpResponse = {
  message: string;
  email: string;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  avatarUrl: string | null;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VerifyOtpResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: number;
  refreshToken: string;
  user: User;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
};

export type SignOutResponse = {
  message: string;
};

export const authApi = {
  signInWithOtp: async (
    payload: SignInWithOtpRequest,
  ): Promise<ApiResponse<SignInWithOtpResponse>> => {
    return interceptedApiFetch.post<ApiResponse<SignInWithOtpResponse>>(
      "auth/sign-in-with-otp",
      payload,
    );
  },

  verifyOtp: async (
    payload: VerifyOtpRequest,
  ): Promise<ApiResponse<VerifyOtpResponse>> => {
    return interceptedApiFetch.post<ApiResponse<VerifyOtpResponse>>(
      "auth/verify-otp",
      payload,
    );
  },

  signOut: async (): Promise<ApiResponse<SignOutResponse>> => {
    return interceptedApiFetch.post<ApiResponse<SignOutResponse>>(
      "auth/sign-out",
    );
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    return interceptedApiFetch.get<ApiResponse<User>>("auth/me");
  },

  refreshToken: async (
    payload: RefreshTokenRequest,
  ): Promise<ApiResponse<RefreshTokenResponse>> => {
    return interceptedApiFetch.post<ApiResponse<RefreshTokenResponse>>(
      "auth/refresh",
      payload,
    );
  },
};
