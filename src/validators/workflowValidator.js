
const Joi = require("joi");

const supportedNodeTypes = [
  "trigger",
  "httpRequest",
  "database",
  "condition",
  "transform",
  "delay",
  "customScript",
  "notification",
  "parallel",
  "merge",
];

const requiredFieldsByType = {
  trigger: ["triggerEvent"],
  httpRequest: ["url", "method"],
  database: ["operation", "collection"],
  condition: ["conditionField", "operator"],
  transform: ["inputPath", "transformation"],
  delay: ["delayValue", "delayUnit"],
  customScript: ["script"],
  notification: ["channel", "recipient", "message"],
  parallel: ["parallelPaths"],
  merge: ["mergeStrategy"],
};

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

const validateGraph = (nodes = [], edges = []) => {
  const errors = [];

  if (!Array.isArray(nodes) || nodes.length === 0) {
    return ["Workflow must contain at least one node."];
  }

  if (!Array.isArray(edges)) {
    return ["Edges must be an array."];
  }

  const ids = new Set();
  const nodeById = new Map();
  const triggers = [];

  // Validate nodes and node-specific configuration.
  for (const node of nodes) {
    if (!node || typeof node !== "object" || Array.isArray(node)) {
      errors.push("Every node must be an object.");
      continue;
    }

    if (typeof node.id !== "string" || !node.id.trim()) {
      errors.push("Every node must have a non-empty string ID.");
      continue;
    }

    if (ids.has(node.id)) {
      errors.push(`Duplicate node ID: ${node.id}`);
      continue;
    }

    ids.add(node.id);
    nodeById.set(node.id, node);

    if (node.type !== "workflowNode") {
      errors.push(
        `Unsupported React Flow renderer type on node "${node.id}".`
      );
    }

    const data = node.data;

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      errors.push(`Node "${node.id}" must have a data object.`);
      continue;
    }

    const type = data.type;

    if (!supportedNodeTypes.includes(type)) {
      errors.push(`Unsupported node type on "${node.id}".`);
      continue;
    }

    if (type === "trigger") {
      triggers.push(node);
    }

    for (const field of requiredFieldsByType[type] || []) {
      if (isEmptyValue(data[field])) {
        errors.push(
          `${type} node "${node.id}" requires ${field}.`
        );
      }
    }

    if (
      data.backoffStrategy !== undefined &&
      !["fixed", "exponential"].includes(data.backoffStrategy)
    ) {
      errors.push(
        `Invalid backoffStrategy on node "${node.id}".`
      );
    }

    if (
      data.maxAttempts !== undefined &&
      (!Number.isInteger(data.maxAttempts) || data.maxAttempts < 1)
    ) {
      errors.push(
        `maxAttempts must be a positive integer on "${node.id}".`
      );
    }

    if (
      type === "httpRequest" &&
      data.url !== undefined &&
      data.url !== ""
    ) {
      try {
        const parsedUrl = new URL(data.url);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          errors.push(
            `HTTP Request node "${node.id}" must use HTTP or HTTPS.`
          );
        }
      } catch {
        errors.push(
          `HTTP Request node "${node.id}" must have a valid URL.`
        );
      }

      if (
        data.method !== undefined &&
        !["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]
          .includes(String(data.method).toUpperCase())
      ) {
        errors.push(
          `Invalid HTTP method on node "${node.id}".`
        );
      }
    }

    if (
      type === "delay" &&
      data.delayValue !== undefined &&
      (!Number.isFinite(Number(data.delayValue)) ||
        Number(data.delayValue) < 0)
    ) {
      errors.push(
        `Delay value on node "${node.id}" must be non-negative.`
      );
    }
  }

  if (triggers.length === 0) {
    errors.push("Workflow must contain at least one Trigger node.");
  }

  // Validate edges and build the directed graph.
  const adjacency = new Map(
    [...nodeById.keys()].map((id) => [id, []])
  );

  const incoming = new Map(
    [...nodeById.keys()].map((id) => [id, 0])
  );

  const edgeIds = new Set();

  for (const edge of edges) {
    if (!edge || typeof edge !== "object" || Array.isArray(edge)) {
      errors.push("Every edge must be an object.");
      continue;
    }

    if (
      typeof edge.source !== "string" ||
      typeof edge.target !== "string"
    ) {
      errors.push(
        `Edge "${edge.id || "unknown"}" must have string source and target IDs.`
      );
      continue;
    }

    if (!nodeById.has(edge.source) || !nodeById.has(edge.target)) {
      errors.push(
        `Edge "${edge.id || "unknown"}" references a missing node.`
      );
      continue;
    }

    if (edge.id !== undefined) {
      if (typeof edge.id !== "string" || !edge.id.trim()) {
        errors.push("Every supplied edge ID must be a non-empty string.");
      } else if (edgeIds.has(edge.id)) {
        errors.push(`Duplicate edge ID: ${edge.id}`);
      } else {
        edgeIds.add(edge.id);
      }
    }

    adjacency.get(edge.source).push(edge.target);
    incoming.set(
      edge.target,
      incoming.get(edge.target) + 1
    );

    // Check handles when they are explicitly supplied.
    const sourceHandle = edge.sourceHandle;
    const targetHandle = edge.targetHandle;

    if (
      sourceHandle !== undefined &&
      sourceHandle !== null &&
      typeof sourceHandle !== "string"
    ) {
      errors.push(
        `Invalid sourceHandle on edge "${edge.id || "unknown"}".`
      );
    }

    if (
      targetHandle !== undefined &&
      targetHandle !== null &&
      typeof targetHandle !== "string"
    ) {
      errors.push(
        `Invalid targetHandle on edge "${edge.id || "unknown"}".`
      );
    }
  }

  // Check reachability from all trigger nodes.
  const reachable = new Set();
  const queue = triggers
    .filter((node) => nodeById.has(node.id))
    .map((node) => node.id);

  while (queue.length > 0) {
    const id = queue.shift();

    if (reachable.has(id)) {
      continue;
    }

    reachable.add(id);

    for (const next of adjacency.get(id) || []) {
      queue.push(next);
    }
  }

  for (const node of nodeById.values()) {
    if (!reachable.has(node.id)) {
      errors.push(
        `Node "${node.id}" is not reachable from a Trigger.`
      );
    }
  }

  // Detect cycles using depth-first traversal.
  const visiting = new Set();
  const visited = new Set();
  let hasCycle = false;

  const visit = (id) => {
    if (visiting.has(id)) {
      return true;
    }

    if (visited.has(id)) {
      return false;
    }

    visiting.add(id);

    for (const next of adjacency.get(id) || []) {
      if (visit(next)) {
        return true;
      }
    }

    visiting.delete(id);
    visited.add(id);

    return false;
  };

  for (const id of nodeById.keys()) {
    if (visit(id)) {
      hasCycle = true;
      break;
    }
  }

  if (hasCycle) {
    errors.push("Workflow graph must not contain cycles.");
  }

  // A merge node should have multiple incoming paths.
  for (const node of nodeById.values()) {
    if (
      node.data?.type === "merge" &&
      incoming.get(node.id) < 2
    ) {
      errors.push(
        `Merge node "${node.id}" must have at least two incoming edges.`
      );
    }
  }

  return [...new Set(errors)];
};

const createWorkflowSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().max(500).allow("").optional(),
  nodes: Joi.array().items(Joi.object()).default([]),
  edges: Joi.array().items(Joi.object()).default([]),
}).unknown(false);

const updateWorkflowSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().max(500).allow(""),
  status: Joi.string().valid("Draft", "Active", "Inactive"),
  nodes: Joi.array().items(Joi.object()),
  edges: Joi.array().items(Joi.object()),
  expectedVersion: Joi.number().integer().min(1),
}).min(1).unknown(false);

const validateCreateWorkflow = (req, res, next) => {
  const { error, value } = createWorkflowSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((item) => item.message).join("; "),
    });
  }

  req.body = value;
  next();
};

const validateUpdateWorkflow = (req, res, next) => {
  const { error, value } = updateWorkflowSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((item) => item.message).join("; "),
    });
  }

  req.body = value;
  next();
};

const validateGraphRequest = (req, res, next) => {
  const { nodes, edges } = req.body || {};
  const errors = validateGraph(nodes, edges);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      valid: false,
      errors: errors.map((message) => ({
        code: "WORKFLOW_VALIDATION_ERROR",
        message,
      })),
    });
  }

  req.graphValid = true;
  next();
};

module.exports = {
  validateCreateWorkflow,
  validateUpdateWorkflow,
  validateGraph,
  validateGraphRequest,
};
