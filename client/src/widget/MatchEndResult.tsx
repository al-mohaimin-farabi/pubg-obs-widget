import Heading from "../components/Heading";
import ResultTable from "../components/ResultTable";
// import { useSocket } from "../hooks/useSocket";
// import { NAMESPACES } from "../utils/constants";
import { useAppDispatch } from "../hooks/redux";
import { setTeams } from "../store/features/MatchEndResult/MatchEndResultSlice";
import type { Team } from "../store/features/MatchEndResult/MatchEndResultSlice";
import { useEffect } from "react";
import { useGetMatchEndResultQuery } from "../services/MatchEndResultApi";

const MatchEndResult = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetMatchEndResultQuery({
    matchNumber: 85,
  });

  useEffect(() => {
    if (data && typeof data === "object" && data?.data?.teams) {
      const leaderboardData = data?.data?.teams as Team[];
      if (leaderboardData) {
        dispatch(setTeams(leaderboardData.slice(0, 16)));
      }
    }
  }, [data, dispatch]);

  // const data = useSocket({
  //   namespace: NAMESPACES.LEADERBOARD,
  // });

  // useEffect(() => {
  //   if (data && typeof data === "object" && "data" in data) {
  //     const leaderboardData = data as { data: { teams: Team[] } };
  //     if (leaderboardData.data?.teams) {
  //       dispatch(setTeams(leaderboardData.data.teams));
  //     }
  //   }
  // }, [data, dispatch]);

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="font-oswald h-svh w-full space-y-4 overflow-hidden">
      <div className="flex h-full items-end justify-items-end gap-6 p-4 pl-16">
        <ResultTable className="" />
        <div className="flex h-full w-full items-end justify-end">
          <Heading />
        </div>
      </div>
    </div>
  );
};

export default MatchEndResult;
