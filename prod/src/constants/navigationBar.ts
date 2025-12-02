export const NAV_VARIANTS = {
  visible: { y: 0 },
  hidden: { y: "-100%" },
};

export const NAV_TRANSITION = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

export const HAMBURGER_LINE_VARIANTS = {
  topBottom: {
    closed: { width: "100%" },
    open: { width: "0%" },
  },
  middleTop: {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  },
  middleBottom: {
    closed: { rotate: 0 },
    open: { rotate: -45 },
  },
};

export const HAMBURGER_TRANSITION = {
  duration: 0.25,
  ease: "easeInOut" as const,
};

export const MOBILE_MENU_VARIANTS = {
  closed: {
    opacity: 0,
    y: -20,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

export const MOBILE_MENU_TRANSITION = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

export const NAVIGATION_Z_INDEX = 9999;

export const MOBILE_MENU_TOP_OFFSET = "top-28";

export const AVATAR_ALT_TEXT = "Profile";
