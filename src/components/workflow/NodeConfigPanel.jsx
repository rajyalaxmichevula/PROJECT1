import { useState } from "react";

const nodeTypeLabels = {
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

const inputClass = (hasError = false) => {
  return `w-full rounded-lg border px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
  }`;
};

const selectClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const renderError = (error) => {
  if (!error) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-500">{error}</p>;
};

const validateNode = (nodeType, formData) => {
  const errors = {};

  if (!formData.label.trim()) {
    errors.label = "Node name is required";
  }

  switch (nodeType) {
    case "httpRequest":
      if (!formData.url.trim()) {
        errors.url = "URL is required";
      }
      break;

    case "database":
      if (!formData.collection.trim()) {
        errors.collection = "Collection is required";
      }
      break;

    case "condition":
      if (!formData.conditionField.trim()) {
        errors.conditionField = "Field is required";
      }

      if (!formData.conditionValue.trim()) {
        errors.conditionValue = "Value is required";
      }
      break;

    case "transform":
      if (!formData.inputPath.trim()) {
        errors.inputPath = "Input path is required";
      }

      if (!formData.transformation.trim()) {
        errors.transformation = "Transformation is required";
      }
      break;

    case "delay":
      if (formData.delayValue <= 0) {
        errors.delayValue = "Delay must be greater than 0";
      }
      break;

    case "customScript":
      if (!formData.script.trim()) {
        errors.script = "Script is required";
      }
      break;

    case "notification":
      if (!formData.recipient.trim()) {
        errors.recipient = "Recipient is required";
      }

      if (!formData.message.trim()) {
        errors.message = "Message is required";
      }
      break;

    case "parallel":
      if (formData.parallelPaths < 2) {
        errors.parallelPaths = "At least 2 paths are required";
      }
      break;

    default:
      break;
  }

  return errors;
};

const NodeConfigForm = ({ selectedNode, setNodes, onWorkflowChange }) => {
  const [activeTab, setActiveTab] = useState("general");

  const nodeData = selectedNode.data;
  const nodeType = nodeData.type;

  const [formData, setFormData] = useState({
    label: nodeData.label || "",
    triggerEvent: nodeData.triggerEvent || "New Order",

    url: nodeData.url || "",
    method: nodeData.method || "POST",

    operation: nodeData.operation || "Read",
    collection: nodeData.collection || "",
    query: nodeData.query || "",

    conditionField: nodeData.conditionField || "",
    operator: nodeData.operator || "Equals",
    conditionValue: nodeData.conditionValue || "",

    inputPath: nodeData.inputPath || "",
    transformation: nodeData.transformation || "",

    delayValue: nodeData.delayValue || 5,
    delayUnit: nodeData.delayUnit || "Seconds",

    script: nodeData.script || "",

    channel: nodeData.channel || "Email",
    recipient: nodeData.recipient || "",
    message: nodeData.message || "",

    parallelPaths: nodeData.parallelPaths || 2,
    mergeStrategy: nodeData.mergeStrategy || "Wait for all",

    maxAttempts: nodeData.maxAttempts || 3,
    initialDelay: nodeData.initialDelay || 1000,
    backoffStrategy: nodeData.backoffStrategy || "exponential",
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
  };

  const updateNumberField = (field, value) => {
    updateField(field, Number(value));
  };

  const handleSaveNode = () => {
    const validationErrors = validateNode(nodeType, formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setActiveTab("general");
      return;
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id !== selectedNode.id) {
          return node;
        }

        return {
          ...node,
          data: {
            ...node.data,
            ...formData,
          },
        };
      }),
    );

    setErrors({});
    onWorkflowChange();
  };

  const handleSaveRetry = () => {
    const retryErrors = {};

    if (formData.maxAttempts < 1) {
      retryErrors.maxAttempts = "Max attempts must be at least 1";
    }

    if (formData.initialDelay < 0) {
      retryErrors.initialDelay = "Initial delay cannot be negative";
    }

    if (Object.keys(retryErrors).length > 0) {
      setErrors(retryErrors);
      return;
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id !== selectedNode.id) {
          return node;
        }

        return {
          ...node,
          data: {
            ...node.data,
            maxAttempts: formData.maxAttempts,
            initialDelay: formData.initialDelay,
            backoffStrategy: formData.backoffStrategy,
          },
        };
      }),
    );

    setErrors({});
    onWorkflowChange();
  };

  const renderGeneralFields = () => {
    switch (nodeType) {
      case "trigger":
        return (
          <div>
            <label htmlFor="trigger-event" className={labelClass}>
              Trigger Event
            </label>

            <select
              id="trigger-event"
              value={formData.triggerEvent}
              onChange={(event) =>
                updateField("triggerEvent", event.target.value)
              }
              className={selectClass}
            >
              <option value="New Order">New Order</option>
              <option value="Webhook">Webhook</option>
              <option value="Schedule">Schedule</option>
            </select>
          </div>
        );

      case "httpRequest":
        return (
          <>
            <div>
              <label htmlFor="node-url" className={labelClass}>
                URL
              </label>

              <input
                id="node-url"
                type="url"
                value={formData.url}
                onChange={(event) => updateField("url", event.target.value)}
                placeholder="https://example.com/api"
                className={inputClass(Boolean(errors.url))}
              />

              {renderError(errors.url)}
            </div>

            <div>
              <label htmlFor="node-method" className={labelClass}>
                Method
              </label>

              <select
                id="node-method"
                value={formData.method}
                onChange={(event) => updateField("method", event.target.value)}
                className={selectClass}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </>
        );

      case "database":
        return (
          <>
            <div>
              <label htmlFor="database-operation" className={labelClass}>
                Operation
              </label>

              <select
                id="database-operation"
                value={formData.operation}
                onChange={(event) =>
                  updateField("operation", event.target.value)
                }
                className={selectClass}
              >
                <option value="Read">Read</option>
                <option value="Create">Create</option>
                <option value="Update">Update</option>
                <option value="Delete">Delete</option>
              </select>
            </div>

            <div>
              <label htmlFor="database-collection" className={labelClass}>
                Collection
              </label>

              <input
                id="database-collection"
                type="text"
                value={formData.collection}
                onChange={(event) =>
                  updateField("collection", event.target.value)
                }
                placeholder="orders"
                className={inputClass(Boolean(errors.collection))}
              />

              {renderError(errors.collection)}
            </div>

            <div>
              <label htmlFor="database-query" className={labelClass}>
                Query
              </label>

              <textarea
                id="database-query"
                value={formData.query}
                onChange={(event) => updateField("query", event.target.value)}
                placeholder='{"status": "pending"}'
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </>
        );

      case "condition":
        return (
          <>
            <div>
              <label htmlFor="condition-field" className={labelClass}>
                Field
              </label>

              <input
                id="condition-field"
                type="text"
                value={formData.conditionField}
                onChange={(event) =>
                  updateField("conditionField", event.target.value)
                }
                placeholder="order.status"
                className={inputClass(Boolean(errors.conditionField))}
              />

              {renderError(errors.conditionField)}
            </div>

            <div>
              <label htmlFor="condition-operator" className={labelClass}>
                Operator
              </label>

              <select
                id="condition-operator"
                value={formData.operator}
                onChange={(event) =>
                  updateField("operator", event.target.value)
                }
                className={selectClass}
              >
                <option value="Equals">Equals</option>
                <option value="Not Equals">Not Equals</option>
                <option value="Contains">Contains</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Less Than">Less Than</option>
              </select>
            </div>

            <div>
              <label htmlFor="condition-value" className={labelClass}>
                Value
              </label>

              <input
                id="condition-value"
                type="text"
                value={formData.conditionValue}
                onChange={(event) =>
                  updateField("conditionValue", event.target.value)
                }
                placeholder="paid"
                className={inputClass(Boolean(errors.conditionValue))}
              />

              {renderError(errors.conditionValue)}
            </div>
          </>
        );

      case "transform":
        return (
          <>
            <div>
              <label htmlFor="input-path" className={labelClass}>
                Input Path
              </label>

              <input
                id="input-path"
                type="text"
                value={formData.inputPath}
                onChange={(event) =>
                  updateField("inputPath", event.target.value)
                }
                placeholder="order.items"
                className={inputClass(Boolean(errors.inputPath))}
              />

              {renderError(errors.inputPath)}
            </div>

            <div>
              <label htmlFor="transformation" className={labelClass}>
                Transformation
              </label>

              <textarea
                id="transformation"
                value={formData.transformation}
                onChange={(event) =>
                  updateField("transformation", event.target.value)
                }
                placeholder="Map and transform the input data"
                rows={4}
                className={inputClass(Boolean(errors.transformation))}
              />

              {renderError(errors.transformation)}
            </div>
          </>
        );

      case "delay":
        return (
          <>
            <div>
              <label htmlFor="delay-value" className={labelClass}>
                Delay
              </label>

              <input
                id="delay-value"
                type="number"
                min="0"
                value={formData.delayValue}
                onChange={(event) =>
                  updateNumberField("delayValue", event.target.value)
                }
                className={inputClass(Boolean(errors.delayValue))}
              />

              {renderError(errors.delayValue)}
            </div>

            <div>
              <label htmlFor="delay-unit" className={labelClass}>
                Unit
              </label>

              <select
                id="delay-unit"
                value={formData.delayUnit}
                onChange={(event) =>
                  updateField("delayUnit", event.target.value)
                }
                className={selectClass}
              >
                <option value="Seconds">Seconds</option>
                <option value="Minutes">Minutes</option>
                <option value="Hours">Hours</option>
              </select>
            </div>
          </>
        );

      case "customScript":
        return (
          <div>
            <label htmlFor="custom-script" className={labelClass}>
              Script
            </label>

            <textarea
              id="custom-script"
              value={formData.script}
              onChange={(event) => updateField("script", event.target.value)}
              placeholder="// Write your transformation logic here"
              rows={8}
              className={`w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-xs text-slate-700 outline-none transition focus:ring-2 ${
                errors.script
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {renderError(errors.script)}
          </div>
        );

      case "notification":
        return (
          <>
            <div>
              <label htmlFor="notification-channel" className={labelClass}>
                Channel
              </label>

              <select
                id="notification-channel"
                value={formData.channel}
                onChange={(event) => updateField("channel", event.target.value)}
                className={selectClass}
              >
                <option value="Email">Email</option>
                <option value="Slack">Slack</option>
                <option value="Webhook">Webhook</option>
              </select>
            </div>

            <div>
              <label htmlFor="notification-recipient" className={labelClass}>
                Recipient
              </label>

              <input
                id="notification-recipient"
                type="text"
                value={formData.recipient}
                onChange={(event) =>
                  updateField("recipient", event.target.value)
                }
                placeholder="team@example.com"
                className={inputClass(Boolean(errors.recipient))}
              />

              {renderError(errors.recipient)}
            </div>

            <div>
              <label htmlFor="notification-message" className={labelClass}>
                Message
              </label>

              <textarea
                id="notification-message"
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Order processed successfully"
                rows={4}
                className={inputClass(Boolean(errors.message))}
              />

              {renderError(errors.message)}
            </div>
          </>
        );

      case "parallel":
        return (
          <div>
            <label htmlFor="parallel-paths" className={labelClass}>
              Number of Paths
            </label>

            <input
              id="parallel-paths"
              type="number"
              min="2"
              value={formData.parallelPaths}
              onChange={(event) =>
                updateNumberField("parallelPaths", event.target.value)
              }
              className={inputClass(Boolean(errors.parallelPaths))}
            />

            {renderError(errors.parallelPaths)}
          </div>
        );

      case "merge":
        return (
          <div>
            <label htmlFor="merge-strategy" className={labelClass}>
              Merge Strategy
            </label>

            <select
              id="merge-strategy"
              value={formData.mergeStrategy}
              onChange={(event) =>
                updateField("mergeStrategy", event.target.value)
              }
              className={selectClass}
            >
              <option value="Wait for all">Wait for all</option>
              <option value="Wait for first">Wait for first</option>
            </select>
          </div>
        );

      default:
        return (
          <p className="text-sm text-slate-400">
            No configuration is available for this node.
          </p>
        );
    }
  };

  const nodeTypeName = nodeTypeLabels[nodeType] || "Workflow Node";

  return (
    <>
      <div className="border-b border-slate-200 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Node Config
        </p>

        <h2 className="mt-1 text-base font-semibold text-slate-900">
          {formData.label || nodeTypeName}
        </h2>
      </div>

      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition ${
            activeTab === "general"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          General
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("retry")}
          className={`flex-1 px-4 py-3 text-sm font-medium transition ${
            activeTab === "retry"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Retry
        </button>
      </div>

      <div className="space-y-5 p-4">
        {activeTab === "general" && (
          <>
            <div>
              <label htmlFor="node-name" className={labelClass}>
                Name
              </label>

              <input
                id="node-name"
                type="text"
                value={formData.label}
                onChange={(event) => updateField("label", event.target.value)}
                className={inputClass(Boolean(errors.label))}
              />

              {renderError(errors.label)}
            </div>

            <div>
              <label htmlFor="node-type" className={labelClass}>
                Type
              </label>

              <input
                id="node-type"
                type="text"
                value={nodeTypeName}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 outline-none"
              />
            </div>

            {renderGeneralFields()}

            <button
              type="button"
              onClick={handleSaveNode}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              Save Node
            </button>
          </>
        )}

        {activeTab === "retry" && (
          <>
            <div>
              <label htmlFor="retry-attempts" className={labelClass}>
                Max Attempts
              </label>

              <input
                id="retry-attempts"
                type="number"
                min="1"
                value={formData.maxAttempts}
                onChange={(event) =>
                  updateNumberField("maxAttempts", event.target.value)
                }
                className={inputClass(Boolean(errors.maxAttempts))}
              />

              {renderError(errors.maxAttempts)}
            </div>

            <div>
              <label htmlFor="retry-delay" className={labelClass}>
                Initial Delay (ms)
              </label>

              <input
                id="retry-delay"
                type="number"
                min="0"
                value={formData.initialDelay}
                onChange={(event) =>
                  updateNumberField("initialDelay", event.target.value)
                }
                className={inputClass(Boolean(errors.initialDelay))}
              />

              {renderError(errors.initialDelay)}
            </div>

            <div>
              <label htmlFor="retry-backoff" className={labelClass}>
                Backoff Strategy
              </label>

              <select
                id="retry-backoff"
                value={formData.backoffStrategy}
                onChange={(event) =>
                  updateField("backoffStrategy", event.target.value)
                }
                className={selectClass}
              >
                <option value="fixed">Fixed</option>
                <option value="exponential">Exponential</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleSaveRetry}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              Save Retry Policy
            </button>
          </>
        )}
      </div>
    </>
  );
};

const NodeConfigPanel = ({ selectedNode, setNodes, onWorkflowChange }) => {
  if (!selectedNode) {
    return (
      <aside className="w-72 shrink-0 overflow-y-auto border-l border-slate-200 bg-white">
        <div className="flex h-full items-center justify-center p-6 text-center">
          <div>
            <p className="text-sm font-medium text-slate-700">Select a node</p>

            <p className="mt-1 text-xs text-slate-400">
              Choose a node from the canvas to configure it.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 shrink-0 overflow-y-auto border-l border-slate-200 bg-white">
      <NodeConfigForm
        key={selectedNode.id}
        selectedNode={selectedNode}
        setNodes={setNodes}
        onWorkflowChange={onWorkflowChange}
      />
    </aside>
  );
};

export default NodeConfigPanel;
