const workflows = new Map();
const workflowVersions = new Map();

const clone = (value) => {
  if (value === null || value === undefined) {
    return value;
  }

  return structuredClone(value);
};

const findAll = () => {
  return Array.from(workflows.values(), clone);
};

const findById = (id) => {
  const workflow = workflows.get(id);

  return workflow ? clone(workflow) : null;
};

const create = (workflow) => {
  if (workflows.has(workflow.id)) {
    throw new Error(`Workflow with ID "${workflow.id}" already exists.`);
  }

  workflows.set(workflow.id, clone(workflow));

  return clone(workflow);
};

const save = (workflow) => {
  if (!workflows.has(workflow.id)) {
    return null;
  }

  workflows.set(workflow.id, clone(workflow));

  return clone(workflow);
};

const saveVersion = (workflowId, version, snapshot) => {
  if (!workflowVersions.has(workflowId)) {
    workflowVersions.set(workflowId, new Map());
  }

  const versions = workflowVersions.get(workflowId);

  versions.set(version, clone(snapshot));

  return clone(snapshot);
};

const findVersions = (workflowId) => {
  const versions = workflowVersions.get(workflowId);

  if (!versions) {
    return [];
  }

  return Array.from(versions.values(), clone);
};

const findVersion = (workflowId, version) => {
  const versions = workflowVersions.get(workflowId);

  if (!versions) {
    return null;
  }

  const snapshot = versions.get(Number(version));

  return snapshot ? clone(snapshot) : null;
};

module.exports = {
  findAll,
  findById,
  create,
  save,
  saveVersion,
  findVersions,
  findVersion,
};
