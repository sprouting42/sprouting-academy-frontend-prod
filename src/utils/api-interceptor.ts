import { isHTTPError } from "ky";

import { getRefreshToken, removeAuthToken, setAuthTokens } from "@/utils/auth";
import { backendFetch } from "@/utils/ky";

interface RefreshTokenResponse {
  isSuccessful: boolean;
  responseContent?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
}

const HTTP_UNAUTHORIZED = 401;
const REFRESH_ENDPOINT = "auth/refresh";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  refreshPromise = (async (): Promise<string> => {
    try {
      const response = await backendFetch.post<RefreshTokenResponse>(
        REFRESH_ENDPOINT,
        { refreshToken },
      );

      if (response.isSuccessful && response.responseContent) {
        const { accessToken, refreshToken: newRefreshToken } =
          response.responseContent;
        setAuthTokens(accessToken, newRefreshToken);
        return accessToken;
      }
      throw new Error("Failed to refresh token");
    } catch (error) {
      removeAuthToken();
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
const handleUnauthorizedError = async <TArgs extends unknown[]>(
  originalMethod: <T>(path: string, ...args: TArgs) => Promise<T>,
  path: string,
  args: TArgs,
  originalError: unknown,
): Promise<never> => {
  if (isRefreshing) {
    throw originalError;
  }

  isRefreshing = true;

  try {
    await refreshAccessToken();
    return await originalMethod(path, ...args);
  } catch (refreshError) {
    removeAuthToken();
    if (refreshError instanceof Error) {
      throw refreshError;
    }
    throw originalError;
  } finally {
    isRefreshing = false;
  }
};
const createInterceptedMethod = <TArgs extends unknown[]>(
  originalMethod: <T>(path: string, ...args: TArgs) => Promise<T>,
) => {
  return async <T>(path: string, ...args: TArgs): Promise<T> => {
    try {
      return await originalMethod<T>(path, ...args);
    } catch (error) {
      if (
        isHTTPError(error) &&
        error.response.status === HTTP_UNAUTHORIZED &&
        !isRefreshing
      ) {
        return handleUnauthorizedError(originalMethod, path, args, error);
      }

      throw error;
    }
  };
};

export const interceptedApiFetch = {
  delete: createInterceptedMethod(backendFetch.delete),
  get: createInterceptedMethod(backendFetch.get),
  patch: createInterceptedMethod(backendFetch.patch),
  post: createInterceptedMethod(backendFetch.post),
  put: createInterceptedMethod(backendFetch.put),
};
