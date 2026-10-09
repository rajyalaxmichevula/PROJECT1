import {
  Bell,
  Clock,
  Code2,
  Database,
  GitBranch,
  GitMerge,
  Globe,
  Split,
  Wand2,
  Zap,
} from "lucide-react";

const nodeItems = [
  {
    label: "Trigger",
    type: "trigger",
    icon: Zap,
  },
  {
    label: "HTTP Request",
    type: "httpRequest",
    icon: Globe,
  },
  {
    label: "Database",
    type: "database",
    icon: Database,
  },
  {
    label: "Condition",
    type: "condition",
    icon: GitBranch,
  },
  {
    label: "Transform",
    type: "transform",
    icon: Wand2,
  },
  {
    label: "Delay",
    type: "delay",
    icon: Clock,
  },
  {
    label: "Custom Script",
    type: "customScript",
    icon: Code2,
  },
  {
    label: "Send Notification",
    type: "notification",
    icon: Bell,
  },
];

const flowControlItems = [
  {
    label: "Parallel",
    type: "parallel",
    icon: Split,
  },
  {
    label: "Merge",
    type: "merge",
    icon: GitMerge,
  },
];

const NodeLibrary = () => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const renderNode = (item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.type}
        draggable
        onDragStart={(event) => handleDragStart(event, item.type)}
        className="flex cursor-grab items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm text-slate-700 transition hover:border-slate-200 hover:bg-slate-50 active:cursor-grabbing"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100">
          <Icon
            size={17}
            className="text-slate-600"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        <span>{item.label}</span>
      </div>
    );
  };

  return (
    <aside className="w-56 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Nodes</h2>

        <p className="mt-1 text-xs text-slate-400">
          Drag nodes onto the canvas
        </p>
      </div>

      <div className="space-y-6 p-3">
        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Actions
          </p>

          <div className="space-y-1.5">{nodeItems.map(renderNode)}</div>
        </div>

        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Flow Control
          </p>

          <div className="space-y-1.5">{flowControlItems.map(renderNode)}</div>
        </div>
      </div>
    </aside>
  );
};

export default NodeLibrary;
