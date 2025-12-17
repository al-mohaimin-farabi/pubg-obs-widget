import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "./features/leaderboard/leaderboardSlice";

export const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppSelector, useAppDispatch } from "../hooks/redux";
