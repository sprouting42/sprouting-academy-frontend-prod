"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "light";

const isValidTheme = (theme: string | null): theme is Theme => {
  return theme === "light" || theme === "dark";
};

const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return DEFAULT_THEME;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

const setDocumentTheme = (theme: Theme) => {
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const documentTheme = document.documentElement.getAttribute("data-theme");
      if (isValidTheme(documentTheme)) {
        return documentTheme;
      }
      return getStoredTheme();
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    const storedTheme = getStoredTheme();
    const documentTheme = document.documentElement.getAttribute("data-theme");

    if (isValidTheme(documentTheme) && documentTheme !== storedTheme) {
      localStorage.setItem(THEME_STORAGE_KEY, documentTheme);
      setTheme(documentTheme);
    } else if (storedTheme !== documentTheme) {
      setDocumentTheme(storedTheme);
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }

    setDocumentTheme(newTheme);
  }, [theme]);

  return (
    <label className="border-2 border-base-content has-[input:not(:checked)]:border-secondary has-checked:border-primary toggle">
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      <svg
        aria-label="sun"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="bg-secondary rounded-full"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="currentColor"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </g>
      </svg>

      <svg
        aria-label="moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="bg-primary rounded-full"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="currentColor"
          stroke="currentColor"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </g>
      </svg>
    </label>
  );
}
