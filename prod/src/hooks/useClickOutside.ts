import { RefObject, useEffect, useRef } from "react";

interface UseClickOutsideOptions {
  enabled?: boolean;
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  options?: UseClickOutsideOptions,
) => {
  const { enabled = true } = options || {};
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const element = ref.current;
      if (element && !element.contains(e.target as Node)) {
        callbackRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, enabled]);
};
