import { useState } from "react";
import {
  Code2,
  Database,
  RotateCcw,
  Save,
  Trash2,
  TriangleAlert,
} from "lucide-react";

const Toggle = ({ enabled, onToggle, label }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-slate-300"
      }`}
      aria-label={label}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
};

const preferenceItems = [
  {
    id: "developerMode",
    title: "Developer mode",
    description: "Show additional workflow and development information.",
    icon: Code2,
  },
  {
    id: "workflowLogs",
    title: "Workflow logs",
    description: "Keep detailed logs for workflow executions.",
    icon: Database,
  },
  {
    id: "executionHistory",
    title: "Execution history",
    description:
      "Keep execution records available for monitoring and debugging.",
    icon: Database,
  },
];

const PreferenceItem = ({ item, enabled, onToggle }) => {
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-between gap-5 p-4">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {item.description}
          </p>
        </div>
      </div>

      <Toggle
        enabled={enabled}
        onToggle={onToggle}
        label={`Toggle ${item.title}`}
      />
    </div>
  );
};

const AdvancedSettings = () => {
  const [settings, setSettings] = useState({
    developerMode: false,
    workflowLogs: true,
    executionHistory: true,
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (id) => {
    setSettings((current) => ({
      ...current,
      [id]: !current[id],
    }));

    setSaved(false);
  };
  const handleReset = () => {
    setSettings({
      developerMode: false,
      workflowLogs: true,
      executionHistory: true,
    });

    setSaved(false);
  };
  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">
            Application preferences
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Configure advanced behavior for your FlowForge workspace.
          </p>
        </div>

        <div className=" divide-y divide-slate-200 rounded-xl border border-slate-200">
          {preferenceItems.map((item) => (
            <PreferenceItem
              key={item.id}
              item={item}
              enabled={settings[item.id]}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">Workspace actions</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Actions that affect your workspace configuration.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <RotateCcw size={19} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-900">
                  Reset preferences
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Restore application preferences to their default values.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Reset preferences
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">Danger zone</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            These actions can permanently affect your workspace.
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <TriangleAlert size={19} />
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-700">
                Delete workspace
              </h4>

              <p className="mt-1 text-sm leading-6 text-red-600/80">
                Permanently delete this workspace and its associated data. This
                action cannot be undone.
              </p>

              <button
                type="button"
                className="cursor-pointer mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col justify-end gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
        {saved && (
          <span className="text-sm font-medium text-emerald-600">
            Changes saved successfully.
          </span>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save changes
        </button>
      </div>
    </div>
  );
};

export default AdvancedSettings;
