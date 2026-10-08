import { CheckCircle, Database, GitBranch, Server, Users } from "lucide-react";

const systemServices = [
  {
    name: "API Server",
    icon: Server,
    responseTime: "120ms",
    status: "Healthy",
  },
  {
    name: "Database",
    icon: Database,
    responseTime: "45ms",
    status: "Healthy",
  },
  {
    name: "Message Queue",
    icon: GitBranch,
    responseTime: "32ms",
    status: "Healthy",
  },
  {
    name: "Workers (4)",
    icon: Users,
    responseTime: "98ms",
    status: "Healthy",
  },
];

const SystemHealth = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">System Health</h2>

        <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
          <span
            className="h-2 w-2 rounded-full bg-green-500"
            aria-hidden="true"
          />

          <span className="text-xs font-medium text-green-700">
            All Systems Operational
          </span>
        </div>
      </div>

      <div className="mt-5">
        {systemServices.map((service) => {
          const ServiceIcon = service.icon;

          return (
            <div
              key={service.name}
              className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <ServiceIcon
                  size={21}
                  className="shrink-0 text-slate-500"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="truncate text-sm font-medium text-slate-700">
                  {service.name}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    size={15}
                    className="text-green-500"
                    aria-hidden="true"
                  />

                  <span className="text-sm text-green-600">
                    {service.status}
                  </span>
                </div>

                <span className="w-12 text-right text-sm text-slate-500">
                  {service.responseTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemHealth;
