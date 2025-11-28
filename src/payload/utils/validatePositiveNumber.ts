import type { Validate } from "payload";

export const validatePositiveNumber = (
  errorMessage: string = "ค่าต้องเป็นค่าบวกเท่านั้น",
): Validate => {
  return (value: number | null | undefined) => {
    if (value !== null && value !== undefined && value < 0) {
      return errorMessage;
    }
    return true;
  };
};
