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

const chartData = [
  {
    day: "Oct 1",
    successful: 30,
    running: 18,
    failed: 12,
  },
  {
    day: "Oct 2",
    successful: 62,
    running: 37,
    failed: 10,
  },
  {
    day: "Oct 3",
    successful: 50,
    running: 25,
    failed: 12,
  },
  {
    day: "Oct 4",
    successful: 80,
    running: 48,
    failed: 18,
  },
  {
    day: "Oct 5",
    successful: 88,
    running: 60,
    failed: 23,
  },
  {
    day: "Oct 6",
    successful: 75,
    running: 51,
    failed: 19,
  },
  {
    day: "Oct 7",
    successful: 96,
    running: 70,
    failed: 27,
  },
];

const ExecutionChart = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Workflow Executions (Last 7 Days)
        </h2>

        <select
          aria-label="Select execution time range"
          defaultValue="7"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      <div className="mt-5 h-80">
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
      </div>
    </div>
  );
};

export default ExecutionChart;
