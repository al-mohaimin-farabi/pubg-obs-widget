import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardHome from "../pages/DashboardHome";
import DashboardLeaderboard from "../pages/DashboardLeaderboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "matchresult",
        element: <DashboardLeaderboard />,
      },
    ],
  },
]);
