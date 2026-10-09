import {
  CheckCircle,
  Database,
  GitBranch,
  Server,
  Users,
  XCircle,
} from "lucide-react";

const serviceIcons = {
  "API Server": Server,
  Database,
  "Message Queue": GitBranch,
  Workers: Users,
};

const SystemHealth = ({ data }) => {
  const services = data?.services || [];
  const isHealthy = data?.overallStatus === "Healthy";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">System Health</h2>

        <div
          className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 ${
            isHealthy ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isHealthy ? "bg-green-500" : "bg-red-500"
            }`}
            aria-hidden="true"
          />

          <span
            className={`text-xs font-medium ${
              isHealthy ? "text-green-700" : "text-red-700"
            }`}
          >
            {data?.overallStatus || "Unknown"}
          </span>
        </div>
      </div>

      <div className="mt-5">
        {services.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-slate-500">
              No system health data available.
            </p>
          </div>
        ) : (
          services.map((service) => {
            const ServiceIcon = serviceIcons[service.name] || Server;
            const serviceHealthy = service.status === "Healthy";

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
                    {serviceHealthy ? (
                      <CheckCircle
                        size={15}
                        className="text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircle
                        size={15}
                        className="text-red-500"
                        aria-hidden="true"
                      />
                    )}

                    <span
                      className={`text-sm ${
                        serviceHealthy ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>

                  <span className="w-12 text-right text-sm text-slate-500">
                    {service.responseTimeMs}ms
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SystemHealth;
