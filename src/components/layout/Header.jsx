import { Bell, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const tenants = ["Acme Corp", "TechStart", "Global Inc", "Demo Org"];

const Header = () => {
  const [isTenantOpen, setIsTenantOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTenant, setCurrentTenant] = useState("Acme Corp");

  return (
    <header className="fixed left-60 right-0 top-0 z-40 h-20 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4"></div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTenantOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={isTenantOpen}
              className="flex h-11 min-w-40 items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 transition hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <div className="flex flex-col items-start">
                <span className="text-[11px] text-slate-400">
                  Current Tenant
                </span>

                <span className="font-medium text-slate-900">
                  {currentTenant}
                </span>
              </div>

              <ChevronDown
                size={17}
                className={`text-slate-500 transition-transform ${
                  isTenantOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isTenantOpen && (
              <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                {tenants.map((tenant) => (
                  <button
                    key={tenant}
                    type="button"
                    onClick={() => {
                      setCurrentTenant(tenant);
                      setIsTenantOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      currentTenant === tenant
                        ? "bg-blue-50 font-medium text-blue-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {tenant}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-80">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              type="search"
              aria-label="Search workflows and executions"
              placeholder="Search workflows, executions..."
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <Bell size={21} strokeWidth={1.8} aria-hidden="true" />

            <span
              className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white"
              aria-hidden="true"
            >
              3
            </span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setIsTenantOpen(false);
              }}
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600 transition hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              YK
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <div className="border-b border-slate-100 px-3 py-2">
                  <p className="text-sm font-semibold text-slate-900">
                    Yogesh Kumar
                  </p>

                  <p className="text-xs text-slate-500">Developer</p>
                </div>

                <button
                  type="button"
                  className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  Profile
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  Settings
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
