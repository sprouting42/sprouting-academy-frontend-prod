declare global {
  interface OmiseCard {
    name: string;
    number: string;
    expiration_month: string;
    expiration_year: string;
    security_code: string;
    city?: string;
    postal_code?: string;
  }

  interface OmiseTokenResponse {
    object: "token";
    id: string;
    livemode: boolean;
    location: string;
    used: boolean;
    card: {
      object: "card";
      id: string;
      livemode: boolean;
      location: string;
      country: string;
      city: string | null;
      postal_code: string | null;
      financing: string;
      bank: string;
      brand: string;
      fingerprint: string;
      first_digits: string | null;
      last_digits: string;
      name: string;
      expiration_month: number;
      expiration_year: number;
      security_code_check: boolean;
      created: string;
    };
    created: string;
  }

  interface OmiseError {
    object: "error";
    location: string;
    code: string;
    message: string;
  }

  interface Omise {
    setPublicKey(key: string): void;
    createToken(
      type: "card",
      card: OmiseCard,
      callback: (
        statusCode: number,
        response: OmiseTokenResponse | OmiseError,
      ) => void,
    ): void;
  }

  interface Window {
    Omise?: Omise;
  }
}

export {};
