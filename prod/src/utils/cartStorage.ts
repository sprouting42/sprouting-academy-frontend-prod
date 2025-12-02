const CART_EXPIRY_MINUTES = 60 * 24;
const TIMESTAMP_KEY = "cart-storage-timestamp";

const isBrowser = typeof window !== "undefined";

export const checkCartExpiry = (): boolean => {
  if (!isBrowser) return false;

  const lastUpdated = localStorage.getItem(TIMESTAMP_KEY);
  if (lastUpdated) {
    const expiryTime = parseInt(lastUpdated) + CART_EXPIRY_MINUTES * 60 * 1000;
    if (Date.now() > expiryTime) {
      localStorage.removeItem("cart-storage");
      localStorage.removeItem(TIMESTAMP_KEY);
      return true;
    }
  }
  return false;
};

export const updateCartTimestamp = (): void => {
  if (isBrowser) {
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
  }
};

export const clearCartTimestamp = (): void => {
  if (isBrowser) {
    localStorage.removeItem(TIMESTAMP_KEY);
  }
};
