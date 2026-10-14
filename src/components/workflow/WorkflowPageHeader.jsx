import { Pencil, Play, Rocket, Save } from "lucide-react";

const WorkflowPageHeader = ({ onSave, onTestRun, onDeploy, isDirty }) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Workflow Builder
          </p>

          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-slate-900">
              Order Processing Workflow
            </h1>

            {isDirty && (
              <span className="text-xs font-medium text-amber-600">
                Unsaved changes
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label="Edit workflow name"
          className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <Pencil size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Save size={16} aria-hidden="true" />
          Save
        </button>

        <button
          type="button"
          onClick={onTestRun}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Play size={16} aria-hidden="true" />
          Test Run
        </button>

        <button
          type="button"
          onClick={onDeploy}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Rocket size={16} aria-hidden="true" />
          Deploy
        </button>
      </div>
    </div>
  );
};

export default WorkflowPageHeader;
