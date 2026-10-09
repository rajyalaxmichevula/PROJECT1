import Shimmer from "./Shimmer";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <Shimmer className="h-7 w-40" />
          <Shimmer className="mt-2 h-4 w-64" />
        </div>

        <Shimmer className="h-10 w-32" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Shimmer className="h-4 w-28" />
                <Shimmer className="h-8 w-20" />
                <Shimmer className="h-3 w-24" />
              </div>

              <Shimmer className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Recent Executions */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Shimmer className="h-6 w-56" />
            <Shimmer className="h-9 w-32" />
          </div>

          <Shimmer className="mt-5 h-80 w-full" />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Shimmer className="h-6 w-40" />
            <Shimmer className="h-4 w-16" />
          </div>

          <div className="mt-5 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shimmer className="h-9 w-9 rounded-lg" />

                  <div className="space-y-2">
                    <Shimmer className="h-4 w-28" />
                    <Shimmer className="h-3 w-16" />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <Shimmer className="h-3 w-14" />
                  <Shimmer className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Workflow Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <Shimmer className="h-6 w-40" />

          <div className="mt-5 flex items-center gap-5">
            <Shimmer className="h-40 w-40 rounded-full" />

            <div className="flex-1 space-y-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Shimmer className="h-4 w-20" />
                  <Shimmer className="h-4 w-14" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Shimmer className="h-6 w-32" />
            <Shimmer className="h-7 w-20 rounded-full" />
          </div>

          <div className="mt-5 space-y-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Shimmer className="h-5 w-5 rounded" />
                  <Shimmer className="h-4 w-24" />
                </div>

                <div className="flex items-center gap-6">
                  <Shimmer className="h-4 w-16" />
                  <Shimmer className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tenants */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Shimmer className="h-6 w-32" />
            <Shimmer className="h-4 w-16" />
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <Shimmer className="h-3 w-14" />
              <Shimmer className="h-3 w-16" />
              <Shimmer className="h-3 w-16" />
            </div>

            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <Shimmer className="h-4 w-24" />
                <Shimmer className="h-4 w-28" />
                <Shimmer className="h-5 w-14 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
