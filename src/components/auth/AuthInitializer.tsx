"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { authKeys } from "@/hooks/useAuth";
import { refreshAccessToken } from "@/utils/api-interceptor";
import { getRefreshToken, isAuthenticated } from "@/utils/auth";

export function AuthInitializer(): null {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window === "undefined" || isAuthenticated()) {
      return;
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return;
    }

    const initializeAuth = async (): Promise<void> => {
      try {
        await refreshAccessToken();
        queryClient.invalidateQueries({ queryKey: authKeys.me() });
      } catch (error) {
        if (error instanceof Error) {
          queryClient.removeQueries({ queryKey: authKeys.all });
        }
      }
    };

    void initializeAuth();
  }, [queryClient]);

  return null;
}
