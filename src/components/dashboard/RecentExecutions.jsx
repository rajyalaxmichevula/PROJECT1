import { CheckCircle, Clock, XCircle } from "lucide-react";

const recentExecutions = [
  {
    id: "EX-1001",
    workflow: "Order Processing",
    status: "Completed",
    duration: "2.4s",
    time: "2 min ago",
  },
  {
    id: "EX-1002",
    workflow: "User Onboarding",
    status: "Running",
    duration: "8.1s",
    time: "5 min ago",
  },
  {
    id: "EX-1003",
    workflow: "Inventory Sync",
    status: "Completed",
    duration: "4.7s",
    time: "12 min ago",
  },
  {
    id: "EX-1004",
    workflow: "Payment Processing",
    status: "Failed",
    duration: "1.8s",
    time: "18 min ago",
  },
  {
    id: "EX-1005",
    workflow: "Notification Workflow",
    status: "Completed",
    duration: "1.2s",
    time: "25 min ago",
  },
];

const statusStyles = {
  Completed: {
    icon: CheckCircle,
    text: "text-green-600",
    background: "bg-green-50",
  },
  Running: {
    icon: Clock,
    text: "text-blue-600",
    background: "bg-blue-50",
  },
  Failed: {
    icon: XCircle,
    text: "text-red-500",
    background: "bg-red-50",
  },
};

const RecentExecutions = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Executions
        </h2>

        <button
          type="button"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View All
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {recentExecutions.map((execution) => {
          const status = statusStyles[execution.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={execution.id}
              className="flex items-center justify-between rounded-lg border border-slate-100 p-3 transition hover:bg-slate-50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${status.background}`}
                >
                  <StatusIcon
                    size={18}
                    className={status.text}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {execution.workflow}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    {execution.id}
                  </p>
                </div>
              </div>

              <div className="ml-4 shrink-0 text-right">
                <p className={`text-xs font-medium ${status.text}`}>
                  {execution.status}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {execution.duration} · {execution.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentExecutions;
