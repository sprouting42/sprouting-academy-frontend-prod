import { create } from "zustand";
import { persist } from "zustand/middleware";

export const DEFAULT_LANGUAGE = "TH";
export const LANGUAGE_STORAGE_KEY = "language";

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,

      setLanguage: (language: string) => {
        set({ language });
      },
    }),
    {
      name: LANGUAGE_STORAGE_KEY,
    },
  ),
);
