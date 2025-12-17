import { useAppSelector } from "../hooks/redux";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";

const LeaderBoardTable = () => {
  const leaderboard = useAppSelector((state) => state.leaderboard.teams);

  const getRankRowColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-black bg-[linear-gradient(90deg,theme(colors.widget-secondary)_0%,rgba(255,235,184,1)_50%,theme(colors.widget-secondary)_100%)]";
      case 2:
        return "text-black bg-[linear-gradient(90deg,theme(colors.gray.200)_0%,theme(colors.slate.50)_50%,theme(colors.gray.200)_100%)]";
      case 3:
        return "text-black bg-[linear-gradient(90deg,theme(colors.widget-primary)_0%,rgba(252,221,207,1)_50%,theme(colors.widget-primary)_100%)]";
      default:
        return "text-white bg-linear-to-tr from-widget-accent to-widget-muted/20";
    }
  };

  // const getRankIndicator = (position: number) => {
  //   if (position === 1) return "▲";
  //   if (position === 2) return "▲";
  //   if (position === 3) return "▼";
  //   return "▼";
  // };

  return (
    <div className="font-oswald w-full overflow-x-auto">
      <table className="relative table-auto border-separate border-spacing-y-1">
        <thead>
          <tr className="text-nowrap text-white">
            <th className="px-1 py-1 text-left text-sm">RANK</th>
            {/* flag */}
            <th className="px-2 py-1 text-left text-sm"></th>
            <th className="px-2 py-1 text-left text-sm">TEAM</th>
            <th className="px-2 py-1 text-center text-sm">PLACE PTS</th>
            <th className="px-2 py-1 text-center text-sm">ELIMS</th>
            <th className="px-2 py-1 text-center text-sm text-widget-primary">
              TOTAL PTS
            </th>
            <th className="px-2 py-1 text-center text-sm">
              <img
                src="/chicken.png"
                className="max-h-16 w-full max-w-16 overflow-hidden"
                alt=""
              />
            </th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {leaderboard.map((team) => (
            <tr
              key={team.team_id}
              className={cn("", getRankRowColor(team.position))}
            >
              <td className=" py-3 text-center text-nowrap">
                <span className="text-lg font-bold"> #{team.position}</span>

                {/* {getRankIndicator(team.position)}  */}
              </td>
              <td className="relative px-2 py-3">
                <div className="relative flex items-center">
                  <img src="/bd-flag.webp" className="w-14" alt="" />
                </div>
                <Separator
                  className={cn(
                    "absolute top-1/2 right-0 bottom-0 w-2 -translate-y-1/2 rounded data-[orientation=vertical]:h-[70%] data-[orientation=vertical]:w-0.5",
                    team?.position > 3 ? "bg-white" : "bg-widget-accent"
                  )}
                  orientation="vertical"
                />
              </td>
              <td className="px-2 py-3 text-sm">
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
              <td className="px-2 py-3 text-center text-base">
                {team.placement_point || 0}
              </td>
              <td className="px-2 py-3 text-center text-base">
                {team.kills || 0}
              </td>
              <td className="px-2 py-3 text-center text-base">
                {team.total_points || 0}
              </td>
              <td className="px-2 py-3 text-center text-base">
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
