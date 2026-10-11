import { useState } from "react";
import {
  Bell,
  Building2,
  CreditCard,
  Link2,
  Settings as SettingsIcon,
  Shield,
  SlidersHorizontal,
  User,
} from "lucide-react";

import GeneralSettings from "../components/settings/GeneralSettings";
import OrganizationSettings from "../components/settings/OrganizationSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import IntegrationsSettings from "../components/settings/IntegrationsSettings";
import NotificationsSettings from "../components/settings/NotificationsSettings";
import BillingSettings from "../components/settings/BillingSettings";
import AdvancedSettings from "../components/settings/AdvancedSettings";

const settingsTabs = [
  { id: "general", label: "General", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "advanced", label: "Advanced", icon: SlidersHorizontal },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const activeSettings = settingsTabs.find((tab) => tab.id === activeTab);

  const renderSettings = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;

      case "organization":
        return <OrganizationSettings />;

      case "security":
        return <SecuritySettings />;

      case "integrations":
        return <IntegrationsSettings />;

      case "notifications":
        return <NotificationsSettings />;

      case "billing":
        return <BillingSettings />;

      case "advanced":
        return <AdvancedSettings />;

      default:
        return (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">
            <SettingsIcon size={28} className="text-slate-400" />

            <h3 className="mt-4 text-sm font-semibold text-slate-700">
              {activeSettings?.label} settings
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              This section will be configured next.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <SettingsIcon size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your account, organization, security, and application
                preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-900">
                {activeSettings?.label}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure your {activeSettings?.label.toLowerCase()} settings.
              </p>
            </div>

            <div className="p-6">{renderSettings()}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
