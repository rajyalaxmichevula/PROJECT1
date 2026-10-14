const statusStyles = {
  Active: "bg-green-50 text-green-700",
  Trial: "bg-blue-50 text-blue-700",
};

const ActiveTenants = ({ tenants = [] }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Active Tenants</h2>

        <button
          type="button"
          className="shrink-0 text-sm font-medium text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View All
        </button>
      </div>

      <div className="mt-5 overflow-x-auto">
        {tenants.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-slate-500">No active tenants found.</p>
          </div>
        ) : (
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th
                  scope="col"
                  className="pb-3 text-xs font-medium text-slate-400"
                >
                  Name
                </th>

                <th
                  scope="col"
                  className="pb-3 text-xs font-medium text-slate-400"
                >
                  Domain
                </th>

                <th
                  scope="col"
                  className="pb-3 text-center text-xs font-medium text-slate-400"
                >
                  Workflows
                </th>

                <th
                  scope="col"
                  className="pb-3 text-right text-xs font-medium text-slate-400"
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {tenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="py-3 text-sm font-medium text-slate-800">
                    {tenant.name}
                  </td>

                  <td className="py-3 text-sm text-slate-500">
                    {tenant.domain}
                  </td>

                  <td className="py-3 text-center text-sm text-slate-600">
                    {tenant.workflows}
                  </td>

                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[tenant.status] ||
                        "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {tenant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ActiveTenants;
