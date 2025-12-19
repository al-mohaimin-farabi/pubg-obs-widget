import { configureStore } from "@reduxjs/toolkit";
import MatchEndResultReducer from "./features/MatchEndResult/MatchEndResultSlice";
import apiConfig from "../services/apiConfig";

import ConfigurationApi from "../services/ConfigurationApi";

export const store = configureStore({
  reducer: {
    leaderboard: MatchEndResultReducer,
    [apiConfig.reducerPath]: apiConfig.reducer,
    [ConfigurationApi.reducerPath]: ConfigurationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(apiConfig.middleware, ConfigurationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppSelector, useAppDispatch } from "../hooks/redux";
