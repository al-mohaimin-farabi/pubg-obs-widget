import { useAppSelector } from "../hooks/redux";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";

const LeaderBoardTable = () => {
  const leaderboard = useAppSelector((state) => state.leaderboard.teams);

  return (
    <div className="font-oswald fixed bottom-4 left-16 w-196.25 overflow-hidden">
      <table className="leaderboard-table relative w-full border-separate border-spacing-0">
        <thead className="bg-linear-to-r from-widget-muted from-30% to-widget-accent">
          <tr className="text-nowrap text-widget-secondary">
            <th className="px-2 py-1 text-center text-sm">RANK</th>
            <th className="px-2 py-1 text-left text-sm"></th>
            <th className="py-1 pr-2 pl-4 text-left text-sm">TEAM</th>
            <th className="px-2 py-1 text-center text-sm">PLACE PTS</th>
            <th className="px-2 py-1 text-center text-sm">ELIMS</th>
            <th className="px-2 py-1 text-center text-sm">TOTAL PTS</th>
            <th className="px-2 py-1 text-center text-sm">
              <img
                src="/chicken.png"
                className="mx-auto max-h-16 w-full max-w-16 overflow-hidden"
                alt=""
              />
            </th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {leaderboard.map((team) => (
            <tr
              key={team.team_id}
              className={cn(
                "bg-linear-to-r from-widget-accent from-60% to-widget-muted/80 text-white"
              )}
            >
              <td className="max-h-11.5 overflow-hidden bg-widget-muted py-3 text-center text-nowrap">
                <span className="text-lg font-bold">#{team.position}</span>
              </td>
              <td className="relative max-h-11.5 overflow-hidden py-3 pl-4">
                <img src="/bd-flag.webp" className="w-14" alt="" />

                <Separator
                  className={cn(
                    "absolute top-1/2 right-0 bottom-0 w-2 -translate-y-1/2 rounded bg-white data-[orientation=vertical]:h-[70%] data-[orientation=vertical]:w-0.5"
                  )}
                  orientation="vertical"
                />
              </td>
              <td className="max-h-11.5 overflow-hidden py-3 pr-2 pl-4 text-sm">
                <div className="flex items-center gap-2">
                  <img
                    className="h-12 w-12 object-cover"
                    src={`${team?.team_logo}`}
                  />
                  <span className="shrink-0 text-lg uppercase">
                    {team.team_name}
                  </span>
                </div>
              </td>
              <td className="max-h-11.5 overflow-hidden px-2 py-3 text-center text-base">
                {team.placement_point || 0}
              </td>
              <td className="max-h-11.5 overflow-hidden px-2 py-3 text-center text-base">
                {team.kills || 0}
              </td>
              <td className="max-h-11.5 overflow-hidden px-2 py-3 text-center text-base">
                {team.total_points || 0}
              </td>
              <td className="max-h-11.5 overflow-hidden px-2 py-3 text-center text-base">
                {team.games_won || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardTable;
