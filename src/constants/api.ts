export const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
export const DEFAULT_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN || "";

export const ENDPOINTS = {
  COUNTRY: {
    DEFAULT: "/api/country",
    DETAIL: "/api/country/:id",
  },
  BOARD: {
    DEFAULT: "/api/boardtype",
  },
  BOOKING: {
    DEFAULT: "/api/booking",
  },
};
