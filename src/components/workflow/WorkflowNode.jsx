import { Handle, Position } from "@xyflow/react";

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

const nodeIcons = {
  trigger: Zap,
  httpRequest: Globe,
  database: Database,
  condition: GitBranch,
  transform: Wand2,
  delay: Clock,
  customScript: Code2,
  notification: Bell,
  parallel: Split,
  merge: GitMerge,
};

const WorkflowNode = ({ data }) => {
  const { type, label, description } = data;

  const Icon = nodeIcons[type] || Zap;

  const showConditionHandles = type === "condition";
  const showParallelHandles = type === "parallel";
  const showMergeHandles = type === "merge";

  return (
    <div className="relative min-w-52 rounded-xl border border-slate-200 bg-white shadow-md">
      {showMergeHandles ? (
        <>
          <Handle
            id="path-1"
            type="target"
            position={Position.Top}
            style={{ left: "35%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
          />

          <Handle
            id="path-2"
            type="target"
            position={Position.Top}
            style={{ left: "65%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
          />

          <div className="absolute -top-5 left-0 right-0 flex justify-around text-[10px] font-medium">
            <span className="text-blue-600">PATH 1</span>
            <span className="text-blue-600">PATH 2</span>
          </div>
        </>
      ) : (
        <Handle
          type="target"
          position={Position.Top}
          className="!h-2.5 !w-2.5 !border-2 !border-white !bg-slate-400"
        />
      )}

      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Icon size={18} className="text-blue-600" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {label}
          </p>

          <p className="mt-0.5 truncate text-xs text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {showConditionHandles ? (
        <>
          <Handle
            id="true"
            type="source"
            position={Position.Bottom}
            style={{ left: "35%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-green-500"
          />

          <Handle
            id="false"
            type="source"
            position={Position.Bottom}
            style={{ left: "65%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-red-500"
          />

          <div className="flex justify-between px-5 pb-2 pt-1 text-[10px] font-medium">
            <span className="text-green-600">TRUE</span>
            <span className="text-red-500">FALSE</span>
          </div>
        </>
      ) : showParallelHandles ? (
        <>
          <Handle
            id="path-1"
            type="source"
            position={Position.Bottom}
            style={{ left: "35%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
          />

          <Handle
            id="path-2"
            type="source"
            position={Position.Bottom}
            style={{ left: "65%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
          />

          <div className="flex justify-between px-5 pb-2 pt-1 text-[10px] font-medium text-blue-600">
            <span>PATH 1</span>
            <span>PATH 2</span>
          </div>
        </>
      ) : (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!h-2.5 !w-2.5 !border-2 !border-white !bg-blue-500"
        />
      )}
    </div>
  );
};

export default WorkflowNode;
