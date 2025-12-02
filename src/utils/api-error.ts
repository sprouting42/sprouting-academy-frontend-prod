import { isHTTPError } from "ky";

import type { ApiErrorResponse } from "@/apis/auth";

export const getApiErrorMessage = async (error: unknown): Promise<string> => {
  if (isHTTPError(error)) {
    try {
      const data: ApiErrorResponse = await error.response.json();
      const validationErrors =
        data.errorDetails?.validationErrors?.errors?.filter(Boolean) ?? [];

      const message =
        data.errorMessage ||
        data.errorDetails?.message ||
        validationErrors.join("\n") ||
        "";

      return message;
    } catch (parseError) {
      return String(parseError);
    }
  }

  if (error instanceof Error) {
    const message = error.message || String(error);
    if (
      message.includes("ERR_CONNECTION_REFUSED") ||
      message.includes("Failed to fetch")
    ) {
      return "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง";
    }
    return message;
  }

  return String(error);
};
