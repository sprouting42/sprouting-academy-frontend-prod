/**
 * Parse price string to number
 * Handles formats like "1,000 บาท", "1000", "฿1,000", etc.
 * @param priceString - Price string to parse
 * @returns Parsed number or 0 if invalid
 */
export const parsePriceString = (priceString: string | number): number => {
  if (typeof priceString === "number") {
    return priceString;
  }

  if (!priceString || typeof priceString !== "string") {
    return 0;
  }

  // Remove all non-numeric characters except decimal point
  const cleanedString = priceString.replace(/[^0-9.]/g, "");

  const parsed = parseFloat(cleanedString);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Format number to Thai Baht string
 * @param price - Price number
 * @returns Formatted string like "1,000 บาท"
 */
export const formatPriceThai = (price: number): string => {
  return `${price.toLocaleString("th-TH")} บาท`;
};
