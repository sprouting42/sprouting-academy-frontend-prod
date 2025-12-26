import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isHTTPError } from "ky";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  authApi,
  isApiErrorResponse,
  isApiSuccessResponse,
  type RefreshTokenRequest,
  type SignInWithOtpRequest,
  type VerifyOtpRequest,
} from "@/apis/auth";
import { PagePath } from "@/enum";
import { useCartStore } from "@/store/cartStore";
import { getApiErrorMessage } from "@/utils/api-error";
import {
  hasAuthCredentials,
  isAuthenticated,
  removeAuthToken,
  setAuthTokens,
} from "@/utils/auth";

import { cartKeys, syncCartOnLogin } from "./useCart";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const useSignInWithOtp = () => {
  return useMutation({
    mutationFn: (payload: SignInWithOtpRequest) =>
      authApi.signInWithOtp(payload),
    onError: async (error) => {
      const message = await getApiErrorMessage(error);
      toast.error(message);
    },
  });
};

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const localItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: async (payload: VerifyOtpRequest) => {
      const response = await authApi.verifyOtp(payload);

      if (isApiErrorResponse(response)) {
        const errorMessage =
          response.errorMessage || response.errorDetails?.message || "";
        throw new Error(errorMessage);
      }

      return response;
    },
    onSuccess: async (response) => {
      if (!response.responseContent) {
        toast.error("ไม่พบข้อมูล response");
        return;
      }

      const { accessToken, refreshToken, user } = response.responseContent;
      if (!accessToken || !refreshToken) {
        toast.error("ไม่พบ token");
        return;
      }

      setAuthTokens(accessToken, refreshToken);

      try {
        await syncCartOnLogin(localItems, clearCart);
        queryClient.invalidateQueries({ queryKey: cartKeys.all });
      } catch (error) {
        if (error instanceof Error && process.env.NODE_ENV === "development") {
          console.error("Failed to sync cart on login:", error);
        }
      }

      queryClient.invalidateQueries({ queryKey: authKeys.me() });

      toast.success("เข้าสู่ระบบสำเร็จ", {
        description: `ยินดีต้อนรับ ${user.fullName || user.email}`,
      });
    },
    onError: async (error) => {
      const message = await getApiErrorMessage(error);
      toast.error(message);
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      sessionStorage.setItem("isLoggingOut", "true");

      removeAuthToken();
      queryClient.clear();
      clearCart();

      toast.success("ออกจากระบบสำเร็จ");

      router.push(PagePath.HOME);

      setTimeout(() => {
        sessionStorage.removeItem("isLoggingOut");
      }, 500);
    },
    onError: async (error) => {
      const message = await getApiErrorMessage(error);
      toast.error(message);
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RefreshTokenRequest) => authApi.refreshToken(payload),
    onSuccess: (response) => {
      if (isApiSuccessResponse(response) && response.responseContent) {
        const { accessToken, refreshToken } = response.responseContent;
        setAuthTokens(accessToken, refreshToken);
        queryClient.invalidateQueries({ queryKey: authKeys.me() });
      }
    },
    onError: async () => {
      removeAuthToken();
      queryClient.removeQueries({ queryKey: authKeys.all });
      toast.info("เซสชันหมดอายุ", {
        description: "กรุณาเข้าสู่ระบบอีกครั้ง",
      });
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await authApi.getMe();
      if (isApiSuccessResponse(response) && response.responseContent) {
        return response.responseContent;
      }
      throw new Error("Failed to get user");
    },
    enabled:
      typeof window !== "undefined" &&
      (isAuthenticated() || hasAuthCredentials()),
    retry: (failureCount, error) => {
      if (isHTTPError(error) && error.response.status === 401) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
