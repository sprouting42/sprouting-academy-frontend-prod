import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  useLanguageStore,
} from "@/store/languageStore";

const isBrowser = typeof window !== "undefined";

export const getLanguage = (): string => {
  if (!isBrowser) {
    return DEFAULT_LANGUAGE;
  }
  return useLanguageStore.getState().language || DEFAULT_LANGUAGE;
};

export const setLanguage = (language: string): void => {
  if (!isBrowser) {
    return;
  }
  useLanguageStore.getState().setLanguage(language);
};

export { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY };
