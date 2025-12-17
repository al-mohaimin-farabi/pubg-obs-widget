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
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  from = "widget-secondary",
  to = "widget-primary",
  direction = "vertical",
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

  return (
    <span
      className={cn("gradient-text", className)}
      style={{
        background: `linear-gradient(${getGradientDirection[direction]}, hsl(${colorMap[from]}) 0%, hsl(${colorMap[from]}) 5%, hsl(${colorMap[to]}) 100%)`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
};
