import { createBrowserRouter, Navigate } from "react-router-dom";
import LeaderBoard from "../widget/MatchEndResult";
import Dashboard from "../pages/Dashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/leaderboard",
    element: <LeaderBoard />,
  },
]);
