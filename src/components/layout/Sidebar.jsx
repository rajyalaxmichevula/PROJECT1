import {
  Activity,
  Bell,
  Building2,
  Files,
  LayoutDashboard,
  PlayCircle,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Workflows",
    icon: Workflow,
    path: "/workflows",
  },
  {
    label: "Executions",
    icon: PlayCircle,
    path: "/executions",
  },
  {
    label: "Templates",
    icon: Files,
    path: "/templates",
  },
  {
    label: "Tenants",
    icon: Building2,
    path: "/tenants",
  },
  {
    label: "Workers",
    icon: Users,
    path: "/workers",
  },
  {
    label: "Monitoring",
    icon: Activity,
    path: "/monitoring",
  },
  {
    label: "Alerts",
    icon: Bell,
    path: "/alerts",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#071525] text-white">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <h1 className="text-xl font-bold">FlowForge</h1>
      </div>

      <nav className="space-y-1 p-3" aria-label="Main navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
