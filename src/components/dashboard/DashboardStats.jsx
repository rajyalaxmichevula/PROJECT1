import { CheckCircle, Play, Workflow, XCircle } from "lucide-react";

import StatCard from "./StatCard";

const stats = [
  {
    title: "Total Workflows",
    value: "24",
    change: "12%",
    description: "vs last week",
    icon: Workflow,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: "up",
  },
  {
    title: "Running",
    value: "6",
    change: "50%",
    description: "vs last week",
    icon: Play,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    trend: "up",
  },
  {
    title: "Completed",
    value: "142",
    change: "18%",
    description: "vs last week",
    icon: CheckCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    trend: "up",
  },
  {
    title: "Failed",
    value: "12",
    change: "8%",
    description: "vs last week",
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    trend: "down",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
