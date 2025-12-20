import { motion } from "framer-motion";
import Heading from "../components/Heading";
import ResultTable from "../components/ResultTable";
import { useSocket } from "../hooks/useSocket";
import { useAppDispatch } from "../hooks/redux";
import { setTeams } from "../store/features/MatchEndResult/MatchEndResultSlice";
import type { Team } from "../store/features/MatchEndResult/MatchEndResultSlice";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useGetMatchEndResultQuery } from "../services/MatchEndResultApi";
import { EVENTS, NAMESPACES } from "../utils/constants";

interface Config {
  matchNumber: number;
  skin: string;
}

const MatchEndResult = () => {
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState<Config>({
    matchNumber: 85,
    skin: "default",
  });

  const socketEvents = useMemo(
    () => ({
      [EVENTS.CONFIG.UPDATE]: (newConfig: any) => {
        setConfig(newConfig as Config);
      },
    }),
    []
  );

  const onConnect = useCallback((s: any) => {
    s.emit(EVENTS.CONFIG.REQUEST);
  }, []);

  useSocket({
    namespace: NAMESPACES.LEADERBOARD,
    events: socketEvents,
    onConnect,
  });

  const { data, isLoading, error } = useGetMatchEndResultQuery({
    matchNumber: config.matchNumber,
  });

  useEffect(() => {
    if (data && typeof data === "object" && data?.data?.teams) {
      const leaderboardData = data?.data?.teams as Team[];
      if (leaderboardData) {
        dispatch(setTeams(leaderboardData.slice(0, 16)));
      }
    }
  }, [data, dispatch]);

  const getSkinUrl = (skin: string) => {
    if (skin === "default") return "/skin.png";
    if (skin.startsWith("/uploads")) {
      const baseUrl =
        import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
      return `${baseUrl}${skin}`;
    }
    return skin;
  };

  if (isLoading) return null;
  if (error) {
    console.log(error);
    return <div>Some Error Occurred, check console</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="font-oswald h-svh w-full space-y-4 overflow-hidden"
    >
      <div className="flex h-full items-end justify-items-end gap-6 p-4 pl-16">
        <ResultTable className="" skin={getSkinUrl(config.skin)} />
        <div className="flex h-full w-full items-end justify-end">
          <Heading />
        </div>
      </div>
    </motion.div>
  );
};

export default MatchEndResult;
