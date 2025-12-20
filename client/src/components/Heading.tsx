import { useAppSelector } from "@/hooks/redux";
import { GradientText } from "./GradientText";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface Config {
  matchNumber: number;
  skin: string;
  tournamentName?: string;
  title?: string;
  headerBg?: string;
  headerText?: string;
  headerIsGradient?: boolean;
  headerGradient?: string;
  titleText?: string;
  titleIsGradient?: boolean;
  titleGradient?: string;
}

const Heading = ({ config }: { config?: Config }) => {
  const leaderboard = useAppSelector((state) => state.leaderboard.teams);
  const firstTeam = leaderboard[0];

  const tournamentBgStyle = config?.headerIsGradient
    ? { background: config.headerGradient }
    : { backgroundColor: config?.headerBg || "var(--widget-secondary)" };

  const tournamentTextStyle = {
    color: config?.headerText || "var(--widget-muted)",
  };

  return (
    <div className="relative w-full uppercase">
      <div className="relative w-full">
        <div className="relative flex w-full justify-center">
          <div
            className="relative flex w-full justify-center"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 75%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 75%, transparent 100%)",
            }}
          >
            {firstTeam?.players.map((p, i) => {
              const isLast = i === 3;

              return (
                <img
                  key={p.id}
                  src={p.image}
                  alt={p.in_game_name}
                  className={`h-[calc(100vh-400px)] ${i !== 0 ? "-ml-52" : ""} relative`}
                  style={{
                    zIndex: isLast ? 10 : 10 + i,
                  }}
                />
              );
            })}
          </div>

          <div className="absolute bottom-0 z-100 w-full">
            <div className={cn("mx-auto flex w-max items-center")}>
              <p className="text-9xl font-extrabold text-widget-secondary">
                #{firstTeam?.position}
              </p>

              <img src="/bd-flag.webp" className="ml-6 w-26" alt="" />

              <Separator
                className="mx-4 rounded bg-widget-accent data-[orientation=vertical]:h-30 data-[orientation=vertical]:w-1"
                orientation="vertical"
              />

              <div className="flex items-center gap-2">
                <img
                  className="h-26 w-26 object-cover"
                  src={`${firstTeam?.team_logo}`}
                />
                <span className="shrink-0 text-7xl font-extrabold text-widget-accent uppercase">
                  {firstTeam?.team_clan_tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-max pb-16">
        <div className="mt-1 flex justify-end font-semibold">
          <div
            className="flex items-center p-1 px-2 font-normal"
            style={{ ...tournamentBgStyle, ...tournamentTextStyle }}
          >
            {config?.tournamentName || "Grand Finals Day 3 M13 /18"}
          </div>
        </div>
        {config?.titleIsGradient ? (
          <GradientText
            customGradient={config.titleGradient}
            className="text-6xl font-bold"
          >
            {config?.title || "Overall Rankings"}
          </GradientText>
        ) : (
          <span
            className="block text-6xl font-bold"
            style={{ color: config?.titleText || "var(--widget-primary)" }}
          >
            {config?.title || "Overall Rankings"}
          </span>
        )}
      </div>
    </div>
  );
};

export default Heading;
