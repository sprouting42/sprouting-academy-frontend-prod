import ky, { isHTTPError, type Options, type SearchParamsOption } from "ky";

import { HttpMethod } from "@/enum";
import { getAuthToken } from "@/utils/auth";
import { getLanguage } from "@/utils/language";

const CMS_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

const logHttpError = (method: HttpMethod, error: unknown) => {
  if (isHTTPError(error) && process.env.NODE_ENV === "development") {
    console.error(`${method} HTTP error:`, error.response.status);
  }
};

type RequestOptions = {
  body?: unknown;
  params?: SearchParamsOption;
  language?: string;
};

const buildOptions = (
  method: HttpMethod,
  { body, params, language }: RequestOptions = {},
): Options => {
  const kyOptions: Options = { method };

  if (body !== undefined) {
    if (body instanceof FormData) {
      kyOptions.body = body;
    } else if (body !== null) {
      kyOptions.json = body;
    }
  }
  if (params) kyOptions.searchParams = params;
  if (language) kyOptions.context = { language };

  return kyOptions;
};

const createKyInstance = (prefixUrl: string) =>
  ky.create({
    hooks: {
      beforeRequest: [
        (request, options) => {
          const token = getAuthToken();
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }

          const language =
            (options.context as { language?: string } | undefined)?.language ||
            getLanguage();

          request.headers.set("x-language", language);

          if (options.body instanceof FormData) {
          } else if (options.body !== undefined && options.body !== null) {
            if (!request.headers.has("Content-Type")) {
              request.headers.set("Content-Type", "application/json");
            }
          }
        },
      ],
    },
    prefixUrl,
    retry: {
      limit: 2,
      methods: ["get"],
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
    },
  });

const createApiClient = (baseUrl: string) => {
  const client = createKyInstance(baseUrl);

  const send = async <T>(
    method: HttpMethod,
    path: string,
    requestOptions: RequestOptions = {},
  ): Promise<T> => {
    try {
      const response = await client(path, buildOptions(method, requestOptions));
      return response.json<T>();
    } catch (error) {
      logHttpError(method, error);
      throw error;
    }
  };

  const createMethod =
    (method: HttpMethod) =>
    <T>(path: string, requestOptions?: RequestOptions) =>
      send<T>(method, path, requestOptions);

  const deleteRequest = createMethod(HttpMethod.DELETE);
  const getRequest = createMethod(HttpMethod.GET);
  const patchRequest = createMethod(HttpMethod.PATCH);
  const postRequest = createMethod(HttpMethod.POST);
  const putRequest = createMethod(HttpMethod.PUT);

  return {
    delete: <T>(path: string, body?: unknown) =>
      deleteRequest<T>(path, { body }),
    get: <T>(path: string, params?: SearchParamsOption) =>
      getRequest<T>(path, { params }),
    patch: <T>(path: string, body?: unknown) => patchRequest<T>(path, { body }),
    post: <T>(path: string, body?: unknown) => postRequest<T>(path, { body }),
    put: <T>(path: string, body?: unknown) => putRequest<T>(path, { body }),
  };
};

export const cmsFetch = createApiClient(CMS_BASE_URL);

export const backendFetch = createApiClient(BACKEND_BASE_URL);
