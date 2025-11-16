const isBrowser = typeof window !== "undefined";

export const isAuthenticated = (): boolean => {
  if (!isBrowser) return false;
  const token = localStorage.getItem("token");
  return !!token;
};

export const getAuthToken = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem("token");
};

export const setAuthToken = (token: string): void => {
  if (!isBrowser) return;
  localStorage.setItem("token", token);
};

export const removeAuthToken = (): void => {
  if (!isBrowser) return;
  localStorage.removeItem("token");
};
