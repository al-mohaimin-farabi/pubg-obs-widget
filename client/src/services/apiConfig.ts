import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiConfig {
  baseURL: string;
  headers: Record<string, string>;
}

const config: ApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiConfig = createApi({
  reducerPath: "apiConfig",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseURL,
    prepareHeaders: (headers) => {
      // Add any auth headers here if needed
      return headers;
    },
  }),
  endpoints: () => ({}), // Will be injected later
});

export default apiConfig;
