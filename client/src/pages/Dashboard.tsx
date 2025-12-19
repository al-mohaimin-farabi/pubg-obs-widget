import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Settings, BarChart3 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const Dashboard = () => {
  const [matchNumber, setMatchNumber] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(initialDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const sidebarItems = [
    {
      title: "Widgets",
      items: [
        {
          title: "Leaderboard",
          url: "/leaderboard",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "General",
          url: "#",
          icon: Settings,
        },
        {
          title: "API Configuration",
          url: "#",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <TooltipProvider>
      <div className={isDark ? "dark" : ""}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">Control Panel</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                {sidebarItems.map((group) => (
                  <SidebarGroup key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <SidebarMenuButton asChild>
                                  <Link to={item.url}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>{item.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
              <SidebarFooter>
                <div className="p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-full justify-start"
                  >
                    {isDark ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </Button>
                </div>
              </SidebarFooter>
            </Sidebar>

            <div className="flex-1">
              <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
                <SidebarTrigger />
                <div className="flex-1">
                  <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>
              </header>

              <main className="flex-1 space-y-6 p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Match Number Input */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Match Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="match-number"
                            className="mb-2 block text-sm font-medium"
                          >
                            Match Number
                          </label>
                          <Input
                            id="match-number"
                            type="number"
                            placeholder="Enter match number"
                            value={matchNumber}
                            onChange={(e) => setMatchNumber(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <Button className="w-full">Load Match Data</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Widget Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Widget Controls</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Leaderboard Widget
                          </span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Real-time Updates
                          </span>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
