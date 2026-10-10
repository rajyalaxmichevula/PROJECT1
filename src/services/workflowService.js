
const { randomUUID } = require("crypto");

const workflows = new Map();
const workflowVersions = new Map();

// Resolve the authenticated user's scope.
// Prefer a trusted tenant ID supplied by authentication middleware.
const getScope = (user) => {
  const scope = user?.tenantId || user?.userId;

  if (!scope) {
    const error = new Error("Authenticated user context is missing.");
    error.status = 401;
    error.code = "AUTH_CONTEXT_MISSING";
    throw error;
  }

  return scope;
};

const belongsToScope = (workflow, scope) =>
  workflow.scope === scope;

// Clone data before returning it or saving version snapshots.
const clone = (value) => structuredClone(value);

const snapshot = (workflow) => ({
  id: workflow.id,
  name: workflow.name,
  description: workflow.description,
  status: workflow.status,
  currentVersion: workflow.currentVersion,
  deployedVersion: workflow.deployedVersion,
  nodes: clone(workflow.nodes),
  edges: clone(workflow.edges),
  createdAt: workflow.createdAt,
  updatedAt: workflow.updatedAt,
});

const saveVersion = (workflow) => {
  if (!workflowVersions.has(workflow.id)) {
    workflowVersions.set(workflow.id, new Map());
  }

  workflowVersions.get(workflow.id).set(
    workflow.currentVersion,
    snapshot(workflow)
  );
};

// List workflows with optional search, status filtering and pagination.
const getWorkflows = async (user, filters = {}) => {
  const scope = getScope(user);

  let result = [...workflows.values()].filter(
    (workflow) =>
      belongsToScope(workflow, scope) && !workflow.archived
  );

  if (filters.status) {
    result = result.filter(
      (workflow) =>
        workflow.status.toLowerCase() ===
        String(filters.status).toLowerCase()
    );
  }

  if (filters.search) {
    const search = String(filters.search).toLowerCase();

    result = result.filter(
      (workflow) =>
        workflow.name.toLowerCase().includes(search) ||
        workflow.description.toLowerCase().includes(search)
    );
  }

  result.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  );

  const page = Math.max(1, Number.parseInt(filters.page, 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number.parseInt(filters.limit, 10) || 10)
  );

  const total = result.length;
  const startIndex = (page - 1) * limit;

  return {
    items: result
      .slice(startIndex, startIndex + limit)
      .map(snapshot),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Retrieve one workflow if it belongs to the authenticated scope.
const getWorkflowById = async (id, user) => {
  const scope = getScope(user);
  const workflow = workflows.get(id);

  if (
    !workflow ||
    workflow.archived ||
    !belongsToScope(workflow, scope)
  ) {
    return null;
  }

  return snapshot(workflow);
};

// Create a workflow and save its initial version.
const createWorkflow = async (input, user) => {
  const scope = getScope(user);
  const now = new Date().toISOString();

  const workflow = {
    id: `workflow-${randomUUID()}`,
    scope,
    name: input.name,
    description: input.description || "",
    status: "Draft",
    currentVersion: 1,
    deployedVersion: null,
    nodes: clone(input.nodes || []),
    edges: clone(input.edges || []),
    createdBy: user?.userId || null,
    createdAt: now,
    updatedAt: now,
    deployedAt: null,
    archived: false,
  };

  workflows.set(workflow.id, workflow);
  saveVersion(workflow);

  return snapshot(workflow);
};

// Update workflow content and create a new version.
const updateWorkflow = async (id, updates, user) => {
  const scope = getScope(user);
  const workflow = workflows.get(id);

  if (
    !workflow ||
    workflow.archived ||
    !belongsToScope(workflow, scope)
  ) {
    return null;
  }

  if (
    updates.expectedVersion !== undefined &&
    Number(updates.expectedVersion) !== workflow.currentVersion
  ) {
    const error = new Error(
      "Workflow version conflict. Fetch the latest version before updating."
    );
    error.status = 409;
    error.code = "VERSION_CONFLICT";
    throw error;
  }

  const { expectedVersion, ...changes } = updates;

  if (changes.name !== undefined) {
    workflow.name = changes.name;
  }

  if (changes.description !== undefined) {
    workflow.description = changes.description;
  }

  if (changes.nodes !== undefined) {
    workflow.nodes = clone(changes.nodes);
  }

  if (changes.edges !== undefined) {
    workflow.edges = clone(changes.edges);
  }

  if (changes.status !== undefined) {
    workflow.status = changes.status;
  }

  workflow.currentVersion += 1;
  workflow.updatedAt = new Date().toISOString();

  workflows.set(id, workflow);
  saveVersion(workflow);

  return snapshot(workflow);
};

// Soft-delete a workflow so it is no longer listed or accessible normally.
const deleteWorkflow = async (id, user) => {
  const scope = getScope(user);
  const workflow = workflows.get(id);

  if (
    !workflow ||
    workflow.archived ||
    !belongsToScope(workflow, scope)
  ) {
    return false;
  }

  workflow.archived = true;
  workflow.status = "Inactive";
  workflow.updatedAt = new Date().toISOString();

  workflows.set(id, workflow);

  return true;
};

// Retrieve version history, newest version first.
const getWorkflowVersions = async (id, user) => {
  const workflow = await getWorkflowById(id, user);

  if (!workflow) {
    return null;
  }

  return [...(workflowVersions.get(id)?.values() || [])]
    .sort((a, b) => b.currentVersion - a.currentVersion)
    .map(clone);
};

// Retrieve a specific saved version.
const getWorkflowVersion = async (id, version, user) => {
  const workflow = await getWorkflowById(id, user);

  if (!workflow) {
    return null;
  }

  const requestedVersion = Number(version);

  if (
    !Number.isInteger(requestedVersion) ||
    requestedVersion < 1
  ) {
    return null;
  }

  const savedVersion = workflowVersions.get(id)?.get(requestedVersion);

  return savedVersion ? clone(savedVersion) : null;
};

// Mark a saved version as deployed.
// Actual workflow execution must be handled by the M4 execution engine.
const deployWorkflow = async (id, version, user) => {
  const scope = getScope(user);
  const workflow = workflows.get(id);

  if (
    !workflow ||
    workflow.archived ||
    !belongsToScope(workflow, scope)
  ) {
    return null;
  }

  const selectedVersion =
    version === undefined || version === null || version === ""
      ? workflow.currentVersion
      : Number(version);

  if (
    !Number.isInteger(selectedVersion) ||
    selectedVersion < 1
  ) {
    const error = new Error("Invalid workflow version.");
    error.status = 400;
    error.code = "INVALID_VERSION";
    throw error;
  }

  const savedVersion = workflowVersions
    .get(id)
    ?.get(selectedVersion);

  if (!savedVersion) {
    const error = new Error("Workflow version not found.");
    error.status = 404;
    error.code = "VERSION_NOT_FOUND";
    throw error;
  }

  workflow.deployedVersion = selectedVersion;
  workflow.status = "Active";
  workflow.deployedAt = new Date().toISOString();
  workflow.updatedAt = workflow.deployedAt;

  workflows.set(id, workflow);

  return {
    workflowId: workflow.id,
    deployedVersion: workflow.deployedVersion,
    status: "deployed",
    deployedAt: workflow.deployedAt,
  };
};

module.exports = {
  getWorkflows,
  getWorkflowById,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  getWorkflowVersions,
  getWorkflowVersion,
  deployWorkflow,
};
