import { cn } from "../lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?:
    | "widget-primary"
    | "widget-secondary"
    | "widget-accent"
    | "widget-muted";
  to?: "widget-primary" | "widget-secondary" | "widget-accent" | "widget-muted";
  direction?: "horizontal" | "vertical" | "diagonal";
  customGradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  from = "widget-secondary",
  to = "widget-primary",
  direction = "vertical",
  customGradient,
}) => {
  const getGradientDirection = {
    horizontal: "to right",
    vertical: "to bottom",
    diagonal: "to bottom right",
  };

  const colorMap = {
    "widget-primary": "4 86% 66%",
    "widget-secondary": "43 94% 72%",
    "widget-accent": "202 89% 24%",
    "widget-muted": "217 60% 11%",
  };

  const gradient =
    customGradient ||
    `linear-gradient(${getGradientDirection[direction]}, hsl(${colorMap[from]}) 0%, hsl(${colorMap[from]}) 5%, hsl(${colorMap[to]}) 100%)`;

  return (
    <div
      className={cn("gradient-text bg-clip-text text-transparent", className)}
      style={{
        display: "block",
        width: "fit-content",
        backgroundImage: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "100%",
        backgroundRepeat: "repeat",
      }}
    >
      {children}
    </div>
  );
};
