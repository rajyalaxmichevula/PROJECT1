import { useState } from "react";
import { Bell, Mail, Save, ShieldAlert, Workflow } from "lucide-react";

const NotificationsSettings = () => {
  const [notifications, setNotifications] = useState({
    workflowSuccess: true,
    workflowFailure: true,
    systemAlerts: true,
    securityAlerts: true,
    emailNotifications: true,
    browserNotifications: false,
  });

  const notificationItems = [
    {
      id: "workflowSuccess",
      title: "Workflow completed",
      description:
        "Receive notifications when a workflow completes successfully.",
      icon: Workflow,
    },
    {
      id: "workflowFailure",
      title: "Workflow failed",
      description: "Receive notifications when a workflow execution fails.",
      icon: ShieldAlert,
    },
    {
      id: "systemAlerts",
      title: "System alerts",
      description:
        "Get notified about important system and infrastructure events.",
      icon: Bell,
    },
    {
      id: "securityAlerts",
      title: "Security alerts",
      description:
        "Receive notifications about important account security events.",
      icon: ShieldAlert,
    },
  ];

  const handleToggle = (id) => {
    setNotifications((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Workflow and system notifications */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">
            Activity notifications
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Choose which workflow and system events should notify you.
          </p>
        </div>

        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
          {notificationItems.map((item) => {
            const Icon = item.icon;
            const enabled = notifications[item.id];

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-5 p-4"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Icon size={19} />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-slate-900">
                      {item.title}
                    </h4>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`relative h-6 w-11 cursor-pointer  shrink-0 rounded-full transition ${
                    enabled ? "bg-blue-600" : "bg-slate-300"
                  }`}
                  aria-label={`Toggle ${item.title}`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                      enabled ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">Delivery preferences</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Choose how you want to receive FlowForge notifications.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Mail size={19} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-900">
                  Email notifications
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Receive important notifications through email.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggle("emailNotifications")}
              className={`relative h-6 w-11 cursor-pointer  shrink-0 rounded-full transition ${
                notifications.emailNotifications
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
              aria-label="Toggle email notifications"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                  notifications.emailNotifications ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Bell size={19} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-900">
                  Browser notifications
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Receive notifications directly in your browser.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggle("browserNotifications")}
              className={`relative h-6 w-11 cursor-pointer shrink-0 rounded-full transition ${
                notifications.browserNotifications
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
              aria-label="Toggle browser notifications"
            >
              <span
                className={`absolute top-1  h-4 w-4 rounded-full bg-white shadow transition ${
                  notifications.browserNotifications ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-slate-200 pt-5">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NotificationsSettings;
