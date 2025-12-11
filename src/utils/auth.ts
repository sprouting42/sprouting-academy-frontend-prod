const isBrowser = typeof window !== "undefined";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const TOKEN_EXPIRY_KEY = "tokenExpiry";

const decodeJWT = (token: string): { exp?: number } | null => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const getTokenExpiry = (token: string | null): number | null => {
  if (!token) return null;
  const decoded = decodeJWT(token);
  return decoded?.exp ? decoded.exp * 1000 : null;
};

export const isAuthenticated = (): boolean => {
  if (!isBrowser) return false;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return false;

  const expiry = getTokenExpiry(token);
  if (expiry && Date.now() >= expiry) {
    return false;
  }

  return true;
};

export const isTokenExpiringSoon = (bufferSeconds = 300): boolean => {
  if (!isBrowser) return false;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return false;

  const expiry = getTokenExpiry(token);
  if (!expiry) return false;

  const buffer = bufferSeconds * 1000;
  return Date.now() >= expiry - buffer;
};

export const getAuthToken = (): string | null => {
  if (!isBrowser) return null;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;

  const expiry = getTokenExpiry(token);
  if (expiry && Date.now() >= expiry) {
    return null;
  }

  return token;
};

export const getRefreshToken = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setAuthTokens = (
  accessToken: string,
  refreshToken: string,
): void => {
  if (!isBrowser) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  const expiry = getTokenExpiry(accessToken);
  if (expiry) {
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
  }
};

export const setAuthToken = (token: string): void => {
  if (!isBrowser) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);

  const expiry = getTokenExpiry(token);
  if (expiry) {
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
  }
};

export const removeAuthToken = (): void => {
  if (!isBrowser) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};
