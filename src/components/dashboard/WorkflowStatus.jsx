import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

const workflowStatusData = [
  {
    name: "Running",
    value: 6,
    color: "#146BFF",
  },
  {
    name: "Completed",
    value: 12,
    color: "#20B26B",
  },
  {
    name: "Failed",
    value: 4,
    color: "#EF4444",
  },
  {
    name: "Pending",
    value: 2,
    color: "#F59E0B",
  },
];

const WorkflowStatusShape = (props) => {
  const color = workflowStatusData[props.index]?.color;

  return <Sector {...props} fill={color} />;
};

const WorkflowStatus = () => {
  const totalWorkflows = workflowStatusData.reduce(
    (total, status) => total + status.value,
    0,
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Workflows by Status
      </h2>

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
    </div>
  );
};

export default WorkflowStatus;
