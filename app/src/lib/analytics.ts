/* eslint-disable @typescript-eslint/no-explicit-any */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

export const IS_ANALYTICS_ENV =
  process.env.NEXT_PUBLIC_APP_ENV === "production";

type GtagFunction = {
  (command: "js", date: Date): void;
  (command: "config", targetId: string, config?: Record<string, any>): void;
  (command: "event", eventName: string, params?: Record<string, any>): void;
};

type FbqFunction = {
  (command: "init", pixelId: string, options?: Record<string, any>): void;
  (
    command: "track" | "trackCustom",
    eventName: string,
    options?: Record<string, any>,
  ): void;
};

declare global {
  interface Window {
    gtag?: GtagFunction;
    fbq?: FbqFunction;
  }
}

const IS_BROWSER = typeof window !== "undefined";
const HAS_GA = Boolean(GA_ID) && IS_ANALYTICS_ENV;
const HAS_PIXEL = Boolean(FB_PIXEL_ID) && IS_ANALYTICS_ENV;

const withGA = (callback: (gtag: GtagFunction) => void) => {
  if (!IS_BROWSER || !HAS_GA) return;
  const gtag = window.gtag;
  if (!gtag) return;
  callback(gtag);
};

const withPixel = (callback: (fbq: FbqFunction) => void) => {
  if (!IS_BROWSER || !HAS_PIXEL) return;
  const fbq = window.fbq;
  if (!fbq) return;
  callback(fbq);
};

export const trackPageView = (url: string) => {
  withGA((gtag) => {
    gtag("config", GA_ID, { page_path: url });
  });

  withPixel((fbq) => {
    fbq("track", "PageView", { url });
  });
};

export const trackEvent = (
  name: string,
  params?: Record<string, any>,
): void => {
  withGA((gtag) => {
    gtag("event", name, params);
  });

  withPixel((fbq) => {
    fbq("trackCustom", name, params);
  });
};

export const trackLead = (params?: Record<string, any>) => {
  withGA((gtag) => {
    gtag("event", "Lead", params);
  });

  withPixel((fbq) => {
    fbq("track", "Lead", params);
  });
};
