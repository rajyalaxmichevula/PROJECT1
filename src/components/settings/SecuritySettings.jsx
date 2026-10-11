import { useState } from "react";
import { KeyRound, LogOut, ShieldCheck, Smartphone } from "lucide-react";

const Toggle = ({ enabled, onToggle, label }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-6 w-11  cursor-pointer 
         shrink-0 rounded-full transition ${
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

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sessions = [
    {
      id: 1,
      device: "Windows • Chrome",
      location: "Current session",
      lastActive: "Active now",
    },
    {
      id: 2,
      device: "Android • Chrome",
      location: "India",
      lastActive: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Two-factor authentication
              </h3>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                Add an extra layer of security to your FlowForge account.
              </p>
            </div>
          </div>

          <Toggle
            enabled={twoFactorEnabled}
            onToggle={() => setTwoFactorEnabled((current) => !current)}
            label="Toggle two-factor authentication"
          />
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <Smartphone size={19} className="mt-0.5 shrink-0 text-blue-600" />

              <div>
                <p className="text-sm font-medium text-blue-900">
                  Two-factor authentication enabled
                </p>

                <p className="mt-1 text-sm text-blue-700">
                  Your account will require an additional verification step when
                  signing in.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900">Active sessions</h3>

          <p className="mt-1 text-sm text-slate-500">
            Review devices that are currently signed in to your account.
          </p>
        </div>

        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {session.device}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {session.location} • {session.lastActive}
                </p>
              </div>

              <button
                type="button"
                disabled={session.id === 1}
                className="inline-flex items-center  cursor-pointer  gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={14} />
                {session.id === 1 ? "Current" : "Revoke"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <KeyRound size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">API keys</h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Manage API keys used to access FlowForge programmatically.
              </p>
            </div>
          </div>

          <button
            type="button"
            className=" cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Create key
          </button>
        </div>

        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
          <KeyRound size={24} className="mx-auto text-slate-400" />

          <p className="mt-3 text-sm font-medium text-slate-700">
            No API keys created
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Create an API key when you need programmatic access.
          </p>
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-4">
          <h3 className="font-semibold text-slate-900">Login history</h3>

          <p className="mt-1 text-sm text-slate-500">
            Review recent sign-in activity for your account.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Windows • Chrome
              </p>

              <p className="mt-1 text-xs text-slate-500">
                India • Successful login
              </p>
            </div>

            <span className="text-xs text-slate-400">Recently</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecuritySettings;
