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

const stringFieldsByType = {
  trigger: ["triggerEvent"],
  httpRequest: ["url", "method"],
  database: ["operation", "collection"],
  condition: ["conditionField", "operator"],
  transform: ["inputPath", "transformation"],
  delay: ["delayUnit"],
  customScript: ["script"],
  notification: ["channel", "recipient", "message"],
  merge: ["mergeStrategy"],
};

const isObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

const isEmptyValue = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && !value.trim()) ||
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

  // 1. Validate nodes and node configuration.
  for (const node of nodes) {
    if (!isObject(node)) {
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

    // React Flow renderer type must remain separate
    // from the actual workflow node type in node.data.type.
    if (node.type !== "workflowNode") {
      errors.push(
        `Unsupported React Flow renderer type on node "${node.id}".`
      );
    }

    // Validate node position.
    if (
      !isObject(node.position) ||
      !Number.isFinite(node.position.x) ||
      !Number.isFinite(node.position.y)
    ) {
      errors.push(
        `Node "${node.id}" must have a position with finite x and y coordinates.`
      );
    }

    if (!isObject(node.data)) {
      errors.push(`Node "${node.id}" must have a data object.`);
      continue;
    }

    const data = node.data;
    const type = data.type;

    if (!supportedNodeTypes.includes(type)) {
      errors.push(`Unsupported node type on "${node.id}".`);
      continue;
    }

    if (type === "trigger") {
      triggers.push(node);
    }

    // Verify required configuration fields.
    for (const field of requiredFieldsByType[type] || []) {
      if (isEmptyValue(data[field])) {
        errors.push(`${type} node "${node.id}" requires ${field}.`);
      }
    }

    // Fields that must contain strings.
    for (const field of stringFieldsByType[type] || []) {
      if (
        data[field] !== undefined &&
        data[field] !== null &&
        typeof data[field] !== "string"
      ) {
        errors.push(
          `${field} on ${type} node "${node.id}" must be a string.`
        );
      }
    }

    if (
      data.label !== undefined &&
      typeof data.label !== "string"
    ) {
      errors.push(`Label on node "${node.id}" must be a string.`);
    }

    // Validate retry settings.
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

    // Validate HTTP request URL.
    if (type === "httpRequest" && !isEmptyValue(data.url)) {
      if (typeof data.url !== "string") {
        errors.push(
          `HTTP Request node "${node.id}" must have a string URL.`
        );
      } else {
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
      }
    }

    // Validate HTTP method independently of the URL.
    if (
      type === "httpRequest" &&
      !isEmptyValue(data.method) &&
      typeof data.method === "string" &&
      ![
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS",
      ].includes(data.method.toUpperCase())
    ) {
      errors.push(`Invalid HTTP method on node "${node.id}".`);
    }

    // Delay values must be finite and non-negative.
    if (
      type === "delay" &&
      !isEmptyValue(data.delayValue) &&
      (
        !(
          typeof data.delayValue === "number" ||
          (
            typeof data.delayValue === "string" &&
            data.delayValue.trim() !== ""
          )
        ) ||
        !Number.isFinite(Number(data.delayValue)) ||
        Number(data.delayValue) < 0
      )
    ) {
      errors.push(
        `Delay value on node "${node.id}" must be non-negative.`
      );
    }
  }

  if (triggers.length === 0) {
    errors.push("Workflow must contain at least one Trigger node.");
  }

  // 2. Prepare graph information for edge validation.
  const adjacency = new Map(
    [...nodeById.keys()].map((id) => [id, []])
  );

  const incoming = new Map(
    [...nodeById.keys()].map((id) => [id, 0])
  );

  const edgeIds = new Set();
  const connections = new Set();

  // 3. Validate edges and their connections.
  for (const edge of edges) {
    if (!isObject(edge)) {
      errors.push("Every edge must be an object.");
      continue;
    }

    // React Flow edges should have unique, non-empty IDs.
    const edgeIdIsValid =
      typeof edge.id === "string" && edge.id.trim() !== "";

    if (!edgeIdIsValid) {
      errors.push("Every edge must have a non-empty string ID.");
    } else if (edgeIds.has(edge.id)) {
      errors.push(`Duplicate edge ID: ${edge.id}`);
    } else {
      edgeIds.add(edge.id);
    }

    const edgeLabel = edgeIdIsValid ? edge.id : "unknown";

    if (
      typeof edge.source !== "string" ||
      !edge.source.trim() ||
      typeof edge.target !== "string" ||
      !edge.target.trim()
    ) {
      errors.push(
        `Edge "${edgeLabel}" must have non-empty string source and target IDs.`
      );
      continue;
    }

    // Validate handle types while preserving the original values.
    for (const field of ["sourceHandle", "targetHandle"]) {
      if (
        edge[field] !== undefined &&
        edge[field] !== null &&
        typeof edge[field] !== "string"
      ) {
        errors.push(
          `Invalid ${field} on edge "${edgeLabel}".`
        );
      }
    }

    if (
      edge.type !== undefined &&
      typeof edge.type !== "string"
    ) {
      errors.push(`Invalid type on edge "${edgeLabel}".`);
    }

    if (
      edge.label !== undefined &&
      typeof edge.label !== "string" &&
      typeof edge.label !== "number"
    ) {
      errors.push(`Invalid label on edge "${edgeLabel}".`);
    }

    if (
      edge.animated !== undefined &&
      typeof edge.animated !== "boolean"
    ) {
      errors.push(`Invalid animated property on edge "${edgeLabel}".`);
    }

    if (
      edge.sourceHandle !== undefined &&
      edge.sourceHandle !== null &&
      typeof edge.sourceHandle !== "string"
    ) {
      continue;
    }

    if (
      edge.targetHandle !== undefined &&
      edge.targetHandle !== null &&
      typeof edge.targetHandle !== "string"
    ) {
      continue;
    }

    if (
      !nodeById.has(edge.source) ||
      !nodeById.has(edge.target)
    ) {
      errors.push(
        `Edge "${edgeLabel}" references a missing node.`
      );
      continue;
    }

    if (edge.source === edge.target) {
      errors.push(
        `Edge "${edgeLabel}" cannot connect a node to itself.`
      );
      continue;
    }

    // Detect duplicate connections even when their IDs differ.
    const connectionKey = JSON.stringify([
      edge.source,
      edge.target,
      edge.sourceHandle ?? null,
      edge.targetHandle ?? null,
    ]);

    if (connections.has(connectionKey)) {
      errors.push(
        `Duplicate connection from "${edge.source}" to "${edge.target}".`
      );
      continue;
    }

    connections.add(connectionKey);

    adjacency.get(edge.source).push(edge.target);
    incoming.set(
      edge.target,
      incoming.get(edge.target) + 1
    );
  }

  // 4. Check reachability from trigger nodes.
  const reachable = new Set();
  const queue = triggers.map((node) => node.id);

  while (queue.length > 0) {
    const id = queue.shift();

    if (reachable.has(id) || !nodeById.has(id)) {
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

  // 5. Detect cycles in the directed graph.
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

  // 6. Merge nodes must have at least two incoming connections.
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

// Request schemas.
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