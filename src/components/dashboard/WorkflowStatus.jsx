import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

const statusColors = {
  Running: "#146BFF",
  Completed: "#20B26B",
  Failed: "#EF4444",
  Pending: "#F59E0B",
};

const WorkflowStatusShape = (props) => {
  const color = props.payload?.color || "#CBD5E1";

  return <Sector {...props} fill={color} />;
};

const WorkflowStatus = ({ data }) => {
  const workflowStatusData = [
    {
      name: "Running",
      value: data?.running ?? 0,
      color: statusColors.Running,
    },
    {
      name: "Completed",
      value: data?.completed ?? 0,
      color: statusColors.Completed,
    },
    {
      name: "Failed",
      value: data?.failed ?? 0,
      color: statusColors.Failed,
    },
    {
      name: "Pending",
      value: data?.pending ?? 0,
      color: statusColors.Pending,
    },
  ];

  const totalWorkflows = workflowStatusData.reduce(
    (total, status) => total + status.value,
    0,
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Workflows by Status
      </h2>

      {totalWorkflows === 0 ? (
        <div className="mt-5 flex h-40 items-center justify-center">
          <p className="text-sm text-slate-500">
            No workflow status data available.
          </p>
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-4">
          <div
            className="relative h-40 w-40 shrink-0"
            role="img"
            aria-label="Workflow status distribution"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workflowStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={70}
                  paddingAngle={1}
                  startAngle={90}
                  endAngle={-270}
                  shape={WorkflowStatusShape}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-slate-900">
                {totalWorkflows}
              </span>

              <span className="text-xs text-slate-500">Total</span>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            {workflowStatusData.map((status) => {
              const percentage = Math.round(
                (status.value / totalWorkflows) * 100,
              );

              return (
                <div
                  key={status.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: status.color }}
                      aria-hidden="true"
                    />

                    <span className="truncate text-sm text-slate-700">
                      {status.name}
                    </span>
                  </div>

                  <span className="shrink-0 whitespace-nowrap text-xs text-slate-500">
                    {status.value} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowStatus;
