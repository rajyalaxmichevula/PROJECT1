import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import WorkflowNode from "./WorkflowNode";

const nodeTypes = {
  workflowNode: WorkflowNode,
};

const nodeLabels = {
  trigger: "Trigger",
  httpRequest: "HTTP Request",
  database: "Database",
  condition: "Condition",
  transform: "Transform",
  delay: "Delay",
  customScript: "Custom Script",
  notification: "Send Notification",
  parallel: "Parallel",
  merge: "Merge",
};

const nodeDescriptions = {
  trigger: "Starts the workflow",
  httpRequest: "Send an API request",
  database: "Read or write database data",
  condition: "Evaluate a condition",
  transform: "Transform workflow data",
  delay: "Wait before continuing",
  customScript: "Run custom logic",
  notification: "Send a notification",
  parallel: "Run multiple paths",
  merge: "Merge workflow paths",
};

const WorkflowCanvasContent = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  onSelectNode,
  onWorkflowChange,
}) => {
  const { screenToFlowPosition } = useReactFlow();

  const handleNodesChange = (changes) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
    onWorkflowChange();
  };

  const handleEdgesChange = (changes) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
    onWorkflowChange();
  };

  const handleConnect = (connection) => {
    let edgeLabel = "";

    if (connection.sourceHandle === "true") {
      edgeLabel = "TRUE";
    } else if (connection.sourceHandle === "false") {
      edgeLabel = "FALSE";
    } else if (connection.sourceHandle === "path-1") {
      edgeLabel = "PATH 1";
    } else if (connection.sourceHandle === "path-2") {
      edgeLabel = "PATH 2";
    }

    const newEdge = {
      ...connection,
      label: edgeLabel,
    };

    setEdges((currentEdges) => addEdge(newEdge, currentEdges));
    onWorkflowChange();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const nodeType = event.dataTransfer.getData("application/reactflow");

    if (!nodeType) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${nodeType}-${crypto.randomUUID()}`,
      type: "workflowNode",
      position,
      data: {
        type: nodeType,
        label: nodeLabels[nodeType] || "Workflow Node",
        description: nodeDescriptions[nodeType] || "Workflow step",
      },
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
    onWorkflowChange();
  };

  const handleNodeClick = (_, node) => {
    onSelectNode(node);
  };

  const handlePaneClick = () => {
    onSelectNode(null);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onNodeClick={handleNodeClick}
      onPaneClick={handlePaneClick}
      deleteKeyCode={["Delete", "Backspace"]}
      defaultEdgeOptions={{
        selectable: true,
        deletable: true,
        interactionWidth: 20,
      }}
      fitView
    >
      <Background gap={20} size={1} />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

const WorkflowCanvas = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  onSelectNode,
  onWorkflowChange,
}) => {
  return (
    <div className="h-full w-full bg-slate-50">
      <ReactFlowProvider>
        <WorkflowCanvasContent
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          onSelectNode={onSelectNode}
          onWorkflowChange={onWorkflowChange}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowCanvas;
