import { useState } from "react";
import { Save } from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const selectClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    name: "Yogesh Kumar",
    email: "yogesh@example.com",
    timezone: "Asia/Kolkata",
    language: "English",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSaved(false);

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Profile information
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Manage your basic account information and preferences.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={settings.name}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={settings.email}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="timezone"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Timezone
          </label>

          <select
            id="timezone"
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
            className={selectClassName}
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Language
          </label>

          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
            className={selectClassName}
          >
            <option value="English">English</option>
          </select>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            {saved && (
              <p className="text-sm font-medium text-emerald-600">
                Changes saved successfully.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSave}
            className=" cursor-pointer inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Save size={16} />
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
