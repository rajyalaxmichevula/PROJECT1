import { CheckCircle, Clock, XCircle } from "lucide-react";

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

const formatDuration = (durationMs) => {
  if (durationMs == null) {
    return "-";
  }

  return `${(durationMs / 1000).toFixed(1)}s`;
};

const formatRelativeTime = (executedAt) => {
  if (!executedAt) {
    return "-";
  }

  const difference = Date.now() - new Date(executedAt).getTime();

  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const RecentExecutions = ({ executions = [] }) => {
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
        {executions.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-500">
              No recent executions found.
            </p>
          </div>
        ) : (
          executions.map((execution) => {
            const status =
              statusStyles[execution.status] || statusStyles.Running;

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
                      {execution.workflowName}
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
                    {formatDuration(execution.durationMs)} ·{" "}
                    {formatRelativeTime(execution.executedAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentExecutions;
