import { isHTTPError } from "ky";

import { getRefreshToken, removeAuthToken, setAuthTokens } from "@/utils/auth";
import { backendFetch } from "@/utils/ky";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  refreshPromise = (async () => {
    try {
      const response = await backendFetch.post<{
        isSuccessful: boolean;
        responseContent?: {
          accessToken: string;
          refreshToken: string;
          expiresIn: number;
          tokenType: string;
        };
      }>("/auth/refresh", { refreshToken });

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
  isRefreshing = true;

  try {
    await refreshAccessToken();
    return await originalMethod(path, ...args);
  } catch {
    removeAuthToken();
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
        error.response.status === 401 &&
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
