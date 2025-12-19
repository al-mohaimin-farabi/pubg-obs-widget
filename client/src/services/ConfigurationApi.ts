import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Skin {
  name: string;
  value: string;
  url: string;
}

export interface Config {
  matchNumber: number;
  skin: string;
}

const baseUrl = (
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"
).replace(/\/$/, "");

export const ConfigurationApi = createApi({
  reducerPath: "configurationApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Skins", "Config"],
  endpoints: (builder) => ({
    getSkins: builder.query<Skin[], void>({
      query: () => "/api/skins",
      providesTags: ["Skins"],
    }),
    uploadSkin: builder.mutation<{ url: string; filename: string }, FormData>({
      query: (formData) => ({
        url: "/api/upload/skin",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Skins"],
    }),
    getConfig: builder.query<Config, void>({
      query: () => "/api/config",
      providesTags: ["Config"],
    }),
    updateConfig: builder.mutation<Config, Partial<Config>>({
      query: (newConfig) => ({
        url: "/api/config",
        method: "POST",
        body: newConfig,
      }),
      invalidatesTags: ["Config"],
    }),
  }),
});

export const {
  useGetSkinsQuery,
  useUploadSkinMutation,
  useGetConfigQuery,
  useUpdateConfigMutation,
} = ConfigurationApi;

export default ConfigurationApi;
