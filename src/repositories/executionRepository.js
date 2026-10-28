const executions = new Map();

const clone = (value) => {
  if (value === null || value === undefined) {
    return value;
  }

  return structuredClone(value);
};

const findAll = () => {
  return Array.from(executions.values(), clone);
};

const findById = (id) => {
  const execution = executions.get(id);
  return execution ? clone(execution) : null;
};

const create = (execution) => {
  if (executions.has(execution.id)) {
    const error = new Error(
      `Execution with ID "${execution.id}" already exists.`
    );
    error.code = "EXECUTION_ALREADY_EXISTS";
    throw error;
  }

  executions.set(execution.id, clone(execution));
  return clone(execution);
};

const save = (execution) => {
  if (!executions.has(execution.id)) {
    return null;
  }

  executions.set(execution.id, clone(execution));
  return clone(execution);
};

const remove = (id) => {
  return executions.delete(id);
};

module.exports = {
  findAll,
  findById,
  create,
  save,
  remove,
};