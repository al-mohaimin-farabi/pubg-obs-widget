import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHome from "@/pages/DashboardHome";
import DashboardWidgets from "@/pages/DashboardWidgets";
import DashboardPreview from "@/pages/DashboardPreview";
import DashboardSettings from "@/pages/DashboardSettings";
import MatchConfig from "@/pages/MatchConfig";
import MatchEndResult from "@/widget/MatchEndResult";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
  },
  {
    path: "/matchresult",
    element: <MatchEndResult />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "widgets",
        element: <DashboardWidgets />,
      },
      {
        path: "configs/leaderboard",
        element: <MatchConfig />,
      },
      {
        path: "preview",
        element: <DashboardPreview />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
]);
