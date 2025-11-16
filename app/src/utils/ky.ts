import ky, { isHTTPError, type Options, type SearchParamsOption } from "ky";

import { HttpMethod } from "@/enum";

const API_BASE_URL = process.env.API_URL || "http://localhost:3000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("token");
};

const logHttpError = (method: HttpMethod, error: unknown) => {
  if (isHTTPError(error))
    console.error(`${method} HTTP error:`, error.response.status);
};

type RequestOptions = {
  body?: unknown;
  params?: SearchParamsOption;
};

const api = ky.create({
  headers: { "Content-Type": "application/json" },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          console.error("API Error:", errorBody);
        }
      },
    ],
    beforeRequest: [
      (request) => {
        const token = getToken();
        if (token) request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
  prefixUrl: API_BASE_URL,
});

const buildOptions = (
  method: HttpMethod,
  { body, params }: RequestOptions = {},
): Options => {
  const kyOptions: Options = { method };
  if (body !== undefined) kyOptions.json = body;
  if (params) kyOptions.searchParams = params;
  return kyOptions;
};

const send = async <T>(
  method: HttpMethod,
  path: string,
  requestOptions?: RequestOptions,
): Promise<T> => {
  try {
    const response = await api(path, buildOptions(method, requestOptions));
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

export const apiFetch = {
  delete: <T>(path: string, body?: unknown) => deleteRequest<T>(path, { body }),
  get: <T>(path: string, params?: SearchParamsOption) =>
    getRequest<T>(path, { params }),
  patch: <T>(path: string, body?: unknown) => patchRequest<T>(path, { body }),
  post: <T>(path: string, body?: unknown) => postRequest<T>(path, { body }),
  put: <T>(path: string, body?: unknown) => putRequest<T>(path, { body }),
};
