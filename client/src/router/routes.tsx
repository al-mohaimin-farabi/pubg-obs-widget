import { createBrowserRouter, Navigate } from "react-router-dom";
import LeaderBoard from "../widget/LeaderBoard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/leaderboard"} />,
  },
  {
    path: "/leaderboard",
    element: <LeaderBoard />,
  },
]);
