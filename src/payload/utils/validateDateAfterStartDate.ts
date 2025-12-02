import type { Validate } from "payload";

const parseDate = (dateValue: unknown): Date | null => {
  if (!dateValue) return null;
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === "string") {
    const parsed = new Date(dateValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
};

const getValueByPath = <T = unknown>(
  obj: Record<string, unknown> | undefined,
  path: string,
): T | undefined => {
  if (!obj) return undefined;

  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj) as T | undefined;
};

export const validateDateAfter = (
  compareField: string,
  errorMessage: string,
): Validate => {
  return (value, { siblingData }) => {
    if (!value) return true;

    const data = siblingData as Record<string, unknown>;
    const compareValue = getValueByPath(data, compareField);

    const dateToCompare = parseDate(compareValue);
    const currentDate = parseDate(value);

    if (!dateToCompare || !currentDate) return true;

    if (currentDate <= dateToCompare) {
      return errorMessage;
    }

    return true;
  };
};
