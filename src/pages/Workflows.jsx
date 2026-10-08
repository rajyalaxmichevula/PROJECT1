import { useState } from "react";

import WorkflowPageHeader from "../components/workflow/WorkflowPageHeader";
import NodeLibrary from "../components/workflow/NodeLibrary";
import WorkflowCanvas from "../components/workflow/WorkflowCanvas";
import NodeConfigPanel from "../components/workflow/NodeConfigPanel";
import validateWorkflow from "../components/workflow/workflowValidation";

const initialNodes = [
  {
    id: "trigger-1",
    type: "workflowNode",
    position: { x: 280, y: 80 },
    data: {
      type: "trigger",
      label: "Trigger",
      description: "Starts the workflow",
    },
  },
  {
    id: "http-1",
    type: "workflowNode",
    position: { x: 280, y: 250 },
    data: {
      type: "httpRequest",
      label: "HTTP Request",
      description: "Send an API request",
    },
  },
];

const initialEdges = [
  {
    id: "trigger-http",
    source: "trigger-1",
    target: "http-1",
  },
];

const Workflows = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasValidated, setHasValidated] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleWorkflowChange = () => {
    setIsDirty(true);
    setHasValidated(false);
    setValidationErrors([]);
  };

  const handleValidate = () => {
    const errors = validateWorkflow(nodes, edges);

    setValidationErrors(errors);
    setHasValidated(true);

    return errors.length === 0;
  };

  const handleSave = () => {
    const isValid = handleValidate();

    if (!isValid) {
      return;
    }

    setIsDirty(false);
  };

  const handleTestRun = () => {
    const isValid = handleValidate();

    if (!isValid) {
      return;
    }

    console.log("Test Run started");
  };

  const handleDeploy = () => {
    const isValid = handleValidate();

    if (!isValid) {
      return;
    }

    console.log("Workflow deployed");
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-slate-50">
      <WorkflowPageHeader
        onSave={handleSave}
        onTestRun={handleTestRun}
        onDeploy={handleDeploy}
        isDirty={isDirty}
      />

      {hasValidated && validationErrors.length > 0 && (
        <div className="border-b border-red-200 bg-red-50 px-5 py-3">
          <p className="text-sm font-semibold text-red-700">
            Workflow validation failed
          </p>

          <ul className="mt-1 list-disc pl-5 text-sm text-red-600">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {hasValidated && validationErrors.length === 0 && (
        <div className="border-b border-green-200 bg-green-50 px-5 py-2">
          <p className="text-xs font-medium text-green-700">
            Workflow is valid
          </p>
        </div>
      )}

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <NodeLibrary />

        <main className="min-w-0 flex-1 overflow-hidden">
          <WorkflowCanvas
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            onSelectNode={setSelectedNode}
            onWorkflowChange={handleWorkflowChange}
          />
        </main>

        <NodeConfigPanel
          selectedNode={selectedNode}
          setNodes={setNodes}
          onWorkflowChange={handleWorkflowChange}
        />
      </div>
    </div>
  );
};

export default Workflows;
