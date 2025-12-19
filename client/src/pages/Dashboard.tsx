import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Moon, Sun, Settings, BarChart3 } from "lucide-react";
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
  useSidebar,
} from "../components/ui/sidebar";

const Dashboard = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const sidebarItems = [
    {
      title: "Widgets",
      items: [
        {
          title: "Leaderboard",
          url: "/dashboard/matchresult",
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

  const SidebarContentComponent = () => {
    const { setOpen } = useSidebar();

    return (
      <Sidebar
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
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
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="p-4">
            <button
              onClick={toggleTheme}
              className="flex w-full items-center justify-start rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              {isDark ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background">
        <SidebarContentComponent />

        <div className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </header>

          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
