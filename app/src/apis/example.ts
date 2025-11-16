import { type SearchParamsOption } from "ky";

import { apiFetch } from "@/utils/ky";

type ExampleItem = {
  description: string;
  id: string;
  updatedAt: string;
};

type ExamplePayload = {
  description: string;
};

export const exampleApi = {
  delete: (itemId: string) => apiFetch.delete<void>(`/examples/${itemId}`),
  getAll: (params?: SearchParamsOption) =>
    apiFetch.get<ExampleItem[]>("/examples", params),
  update: (itemId: string, payload: ExamplePayload) =>
    apiFetch.patch<ExampleItem>(`/examples/${itemId}`, payload),
  create: (payload: ExamplePayload) =>
    apiFetch.post<ExampleItem>("/examples", payload),
};
