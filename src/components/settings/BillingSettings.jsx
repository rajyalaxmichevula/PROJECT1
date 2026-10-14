import { Check, CreditCard, Download, Receipt } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For getting started with workflow automation.",
    features: [
      "Up to 5 workflows",
      "100 executions per month",
      "Basic monitoring",
      "Community support",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For teams that need more automation power.",
    features: [
      "Unlimited workflows",
      "10,000 executions per month",
      "Advanced monitoring",
      "Priority support",
    ],
    current: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced requirements.",
    features: [
      "Unlimited workflows",
      "Custom execution limits",
      "Advanced security",
      "Dedicated support",
    ],
    current: false,
  },
];

const PlanCard = ({ plan }) => {
  const isEnterprise = plan.name === "Enterprise";

  return (
    <div
      className={`rounded-xl border p-5 ${
        plan.current ? "border-blue-200 bg-blue-50/40" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-slate-900">{plan.name}</h4>

          <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
        </div>

        {plan.current && (
          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-600">
            Current
          </span>
        )}
      </div>

      <div className="mt-5">
        <span className="text-2xl font-bold text-slate-900">{plan.price}</span>

        {!isEnterprise && (
          <span className="ml-1 text-sm text-slate-500">/ month</span>
        )}
      </div>

      <div className="my-5 border-t border-slate-200" />

      <ul className="space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-slate-600"
          >
            <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={plan.current}
        className={`mt-6 w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition ${
          plan.current
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {plan.current
          ? "Current plan"
          : isEnterprise
            ? "Contact sales"
            : "Upgrade"}
      </button>
    </div>
  );
};

const BillingSettings = () => {
  return (
    <div className="space-y-8">
      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">Current plan</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Manage your FlowForge subscription and plan limits.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-5">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <CreditCard size={20} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900">Free Plan</h4>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    Active
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Your current FlowForge subscription.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Manage plan
            </button>
          </div>

          <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Workflows
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">3 / 5</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Executions
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                42 / 100
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Billing cycle
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                Monthly
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">Available plans</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Choose the plan that best fits your workflow automation needs.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-5">
          <h3 className="font-semibold text-slate-900">Billing history</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            View your previous invoices and billing records.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200">
          <div className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Receipt size={19} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-900">
                  No billing history
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Your invoices will appear here once billing is enabled.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-400"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BillingSettings;
