import { useState } from "react";
import { Bell, Mail, Save, ShieldAlert, Workflow } from "lucide-react";

const Toggle = ({ enabled, onToggle, label }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-6 w-11  cursor-pointer  shrink-0 rounded-full transition ${
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

const NotificationItem = ({ item, enabled, onToggle }) => {
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-between gap-5 p-4">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>

          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
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

const DeliveryOption = ({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-900">{title}</h4>

          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <Toggle enabled={enabled} onToggle={onToggle} label={`Toggle ${title}`} />
    </div>
  );
};

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

const NotificationsSettings = () => {
  const [notifications, setNotifications] = useState({
    workflowSuccess: true,
    workflowFailure: true,
    systemAlerts: true,
    securityAlerts: true,
    emailNotifications: true,
    browserNotifications: false,
  });

  const handleToggle = (id) => {
    setNotifications((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div className="space-y-8">
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
          {notificationItems.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              enabled={notifications[item.id]}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
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
          <DeliveryOption
            icon={Mail}
            title="Email notifications"
            description="Receive important notifications through email."
            enabled={notifications.emailNotifications}
            onToggle={() => handleToggle("emailNotifications")}
          />

          <DeliveryOption
            icon={Bell}
            title="Browser notifications"
            description="Receive notifications directly in your browser."
            enabled={notifications.browserNotifications}
            onToggle={() => handleToggle("browserNotifications")}
          />
        </div>
      </section>

      <div className="flex justify-end border-t border-slate-200 pt-5">
        <button
          type="button"
          className=" cursor-pointer inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Save size={16} />
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NotificationsSettings;
