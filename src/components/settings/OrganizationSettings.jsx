import { useState } from "react";
import { Building2, Save, Users } from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const OrganizationSettings = () => {
  const [organization, setOrganization] = useState({
    name: "Acme Corp",
    slug: "acme-corp",
    description: "Acme Corp workflow automation workspace.",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSaved(false);

    setOrganization((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Building2 size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Organization information
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Manage the basic information for your FlowForge organization.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="organization-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Organization name
            </label>

            <input
              id="organization-name"
              name="name"
              type="text"
              value={organization.name}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="organization-slug"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Organization slug
            </label>

            <input
              id="organization-slug"
              name="slug"
              type="text"
              value={organization.slug}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="organization-description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="organization-description"
            name="description"
            value={organization.description}
            onChange={handleChange}
            rows={4}
            className={`${inputClassName} resize-none`}
          />
        </div>
      </section>

      <div className="border-t border-slate-200" />

      <section>
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Users size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Organization members
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Manage people who have access to this organization.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200">
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="text-sm font-medium text-slate-900">Yogesh Kumar</p>

              <p className="mt-1 text-xs text-slate-500">
                Developer • Organization member
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Active
            </span>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
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
  );
};

export default OrganizationSettings;
