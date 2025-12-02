"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isHTTPError } from "ky";
import { type ReactNode, useState } from "react";

import {
  QUERY_DISABLED_MUTATION_RETRY_STATUSES,
  QUERY_DISABLED_QUERY_RETRY_STATUSES,
  QUERY_GC_TIME_MS,
  QUERY_RETRY_FAILURE_LIMIT,
  QUERY_STALE_TIME_MS,
} from "@/constants/query";

const createRetryFn =
  (disabledStatuses: number[]) =>
  (failureCount: number, error: unknown): boolean => {
    if (isHTTPError(error)) {
      if (disabledStatuses.includes(error.response.status)) {
        return false;
      }
    }

    return failureCount < QUERY_RETRY_FAILURE_LIMIT;
  };

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME_MS,
            gcTime: QUERY_GC_TIME_MS,
            refetchOnWindowFocus: false,
            retry: createRetryFn(QUERY_DISABLED_QUERY_RETRY_STATUSES),
          },
          mutations: {
            retry: createRetryFn(QUERY_DISABLED_MUTATION_RETRY_STATUSES),
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
