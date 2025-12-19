import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Moon,
  Sun,
  Home,
  Trophy,
  Settings,
  LayoutDashboard,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { title: "Overview", icon: Home, href: "/dashboard" },
  // { title: "Matches", icon: Trophy, href: "/dashboard/matches" }, // Removed matches
  { title: "Widgets", icon: LayoutDashboard, href: "/dashboard/widgets" },
  { title: "Preview", icon: Eye, href: "/dashboard/preview" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-black">
      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
        className={cn(
          "relative flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-black",
          isSidebarExpanded ? "w-48" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200 px-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span
              className={cn(
                "font-semibold whitespace-nowrap text-gray-900 transition-all duration-300 dark:text-white",
                isSidebarExpanded
                  ? "translate-x-0 opacity-100"
                  : "w-0 -translate-x-4 overflow-hidden opacity-0"
              )}
            >
              PUBG Widget
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    "whitespace-nowrap transition-all duration-300",
                    isSidebarExpanded
                      ? "translate-x-0 opacity-100"
                      : "w-0 -translate-x-4 overflow-hidden opacity-0"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-2 dark:border-gray-800">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
            )}
          >
            {isDark ? (
              <Sun className="h-5 w-5 shrink-0" />
            ) : (
              <Moon className="h-5 w-5 shrink-0" />
            )}
            <span
              className={cn(
                "whitespace-nowrap transition-all duration-300",
                isSidebarExpanded
                  ? "translate-x-0 opacity-100"
                  : "w-0 -translate-x-4 overflow-hidden opacity-0"
              )}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
        <Toaster position="top-right" />
      </main>
    </div>
  );
}
