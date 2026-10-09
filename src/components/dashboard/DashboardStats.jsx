import { CheckCircle, Play, Workflow, XCircle } from "lucide-react";

import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Workflows",
      value: stats?.totalWorkflows ?? 0,
      change: `${stats?.changes?.totalWorkflows ?? 0}%`,
      description: "vs last week",
      icon: Workflow,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "up",
    },
    {
      title: "Running",
      value: stats?.running ?? 0,
      change: `${stats?.changes?.running ?? 0}%`,
      description: "vs last week",
      icon: Play,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
      trend: "up",
    },
    {
      title: "Completed",
      value: stats?.completed ?? 0,
      change: `${stats?.changes?.completed ?? 0}%`,
      description: "vs last week",
      icon: CheckCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      trend: "up",
    },
    {
      title: "Failed",
      value: stats?.failed ?? 0,
      change: `${stats?.changes?.failed ?? 0}%`,
      description: "vs last week",
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      trend: "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {statCards.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
