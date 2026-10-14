import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const rangeLabels = {
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
};

const formatDate = (date) => {
  const [year, month, day] = date.split("-");

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

const ExecutionChart = ({
  data = [],
  range = "7d",
  loading = false,
  error = "",
  onRangeChange,
}) => {
  const chartData = data.map((item) => ({
    day: formatDate(item.date),
    successful: item.successful,
    running: item.running,
    failed: item.failed,
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Workflow Executions ({rangeLabels[range]})
        </h2>

        <select
          aria-label="Select execution time range"
          value={range.replace("d", "")}
          onChange={(event) => {
            onRangeChange(`${event.target.value}d`);
          }}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      <div className="relative mt-5 h-80">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
            <div className="shimmer h-full w-full rounded-lg" />
          </div>
        )}

        {error ? (
          <div className="flex h-full items-center justify-center rounded-lg bg-red-50">
            <div className="text-center">
              <p className="text-sm font-medium text-red-700">
                Failed to load execution data
              </p>

              <p className="mt-1 text-xs text-red-600">{error}</p>
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-200">
            <p className="text-sm text-slate-500">
              No execution data available for this range.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />

              <Tooltip />

              <Legend position="top" height={36} />

              <Area
                type="monotone"
                dataKey="successful"
                name="Successful"
                stroke="#20B26B"
                fill="#20B26B"
                fillOpacity={0.08}
              />

              <Area
                type="monotone"
                dataKey="running"
                name="Running"
                stroke="#146BFF"
                fill="#146BFF"
                fillOpacity={0.08}
              />

              <Area
                type="monotone"
                dataKey="failed"
                name="Failed"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.08}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExecutionChart;
