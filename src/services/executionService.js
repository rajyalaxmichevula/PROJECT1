const { randomUUID } = require("node:crypto");
const repository = require("../repositories/executionRepository");

const EXECUTION_STATUSES = [
  "pending",
  "running",
  "completed",
  "failed",
  "skipped",
  "cancelled",
  "cancelling",
];

const sampleExecution = {
  id: "exec_001",
  workflowId: "wf_001",
  workflowName: "Order Processing Workflow",
  version: "1.0.0",
  status: "running",
  startedAt: "2026-10-21T10:24:12.000Z",
  durationMs: 154000,
  triggerType: "manual",
  triggeredBy: {
    id: "temporary-user-id",
    name: "Yogesh Kumar",
  },
  tenant: {
    id: "default",
    name: "Default Tenant",
  },
  ownerUserId: "temporary-user-id",
  tenantId: "default",
  flow: {
    nodes: [
      {
        id: "trigger",
        title: "Trigger",
        subtitle: "New Order",
        type: "trigger",
        status: "completed",
        durationMs: 234,
      },
      {
        id: "validate-order",
        title: "Validate Order",
        subtitle: "Check items",
        type: "validation",
        status: "completed",
        durationMs: 512,
      },
      {
        id: "check-inventory",
        title: "Check Inventory",
        subtitle: "Query stock",
        type: "condition",
        status: "running",
        durationMs: 1200,
      },
      {
        id: "process-payment",
        title: "Process Payment",
        type: "action",
        status: "pending",
        durationMs: null,
      },
      {
        id: "update-inventory",
        title: "Update Inventory",
        type: "action",
        status: "pending",
        durationMs: null,
      },
      {
        id: "send-notification",
        title: "Send Notification",
        type: "action",
        status: "pending",
        durationMs: null,
      },
    ],
    edges: [
      { source: "trigger", target: "validate-order" },
      { source: "validate-order", target: "check-inventory" },
      {
        source: "check-inventory",
        target: "process-payment",
        label: "In Stock",
        condition: "in_stock",
      },
      {
        source: "check-inventory",
        target: "send-notification",
        label: "Out of Stock",
        condition: "out_of_stock",
      },
      { source: "process-payment", target: "update-inventory" },
    ],
  },
  currentStep: {
    nodeId: "check-inventory",
    name: "Check Inventory",
    status: "running",
    description: "Query stock levels from inventory service",
    startedAt: "2026-10-21T10:26:46.000Z",
    durationMs: 1200,
    service: "Inventory Service",
    type: "Database Query",
    input: {
      productId: "PRD0123",
      quantity: 2,
      warehouseId: "WH001",
    },
    output: null,
  },
  steps: [
    { nodeId: "trigger", name: "Trigger", status: "completed", durationMs: 234 },
    {
      nodeId: "validate-order",
      name: "Validate Order",
      status: "completed",
      durationMs: 512,
    },
    {
      nodeId: "check-inventory",
      name: "Check Inventory",
      status: "running",
      durationMs: 1200,
    },
    {
      nodeId: "process-payment",
      name: "Process Payment",
      status: "pending",
      durationMs: null,
    },
    {
      nodeId: "update-inventory",
      name: "Update Inventory",
      status: "pending",
      durationMs: null,
    },
    {
      nodeId: "send-notification",
      name: "Send Notification",
      status: "pending",
      durationMs: null,
    },
  ],
  logs: [
    {
      id: "log_001",
      timestamp: "2026-10-21T10:24:12.000Z",
      level: "INFO",
      service: "Orchestrator",
      message: "Execution started",
      nodeId: null,
    },
    {
      id: "log_002",
      timestamp: "2026-10-21T10:24:13.000Z",
      level: "INFO",
      service: "Validator",
      message: "Order validation successful",
      nodeId: "validate-order",
    },
    {
      id: "log_003",
      timestamp: "2026-10-21T10:24:14.000Z",
      level: "DEBUG",
      service: "Inventory Service",
      message: "Inventory lookup started",
      nodeId: "check-inventory",
    },
  ],
  inputVariables: {
    orderId: "ORD123",
    customerId: "CUST456",
    items: [{ productId: "PRD0123", quantity: 2 }],
  },
  outputVariables: {},
  systemContext: {
    tenantId: "default",
    triggeredBy: "temporary-user-id",
    timestamp: "2026-10-21T10:24:12.000Z",
  },
  externalCalls: 1,
  retryCount: 0,
  operations: [],
};

const createHttpError = (status, code, message) => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

const ensureSeeded = () => {
  if (!repository.findById(sampleExecution.id)) {
    repository.create(sampleExecution);
  }
};

const getScope = (user) => {
  if (!user || !user.userId) {
    throw createHttpError(401, "AUTH_CONTEXT_MISSING", "Authentication is required.");
  }

  return {
    userId: user.userId,
    tenantId: user.tenantId || "default",
  };
};

const findAuthorizedExecution = (id, user) => {
  ensureSeeded();

  const scope = getScope(user);
  const execution = repository.findById(id);

  if (!execution) {
    throw createHttpError(404, "EXECUTION_NOT_FOUND", "Execution not found.");
  }

  if (
    execution.ownerUserId !== scope.userId ||
    execution.tenantId !== scope.tenantId
  ) {
    throw createHttpError(404, "EXECUTION_NOT_FOUND", "Execution not found.");
  }

  return execution;
};

const redactSecrets = (value) => {
  const sensitiveKey =
    /password|secret|token|credential|authorization|api[-_]?key/i;

  if (Array.isArray(value)) {
    return value.map(redactSecrets);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      sensitiveKey.test(key) ? "[REDACTED]" : redactSecrets(item),
    ])
  );
};

const getSummary = (id, user) => {
  const execution = findAuthorizedExecution(id, user);
  const {
    flow,
    currentStep,
    steps,
    logs,
    inputVariables,
    outputVariables,
    systemContext,
    ownerUserId,
    tenantId,
    operations,
    retryCount,
    ...summary
  } = execution;

  return summary;
};

const getFlow = (id, user) => {
  const execution = findAuthorizedExecution(id, user);
  return {
    executionId: execution.id,
    status: execution.status,
    nodes: execution.flow.nodes,
    edges: execution.flow.edges,
  };
};

const getSteps = (id, user) => {
  const execution = findAuthorizedExecution(id, user);
  return {
    currentStep: execution.currentStep,
    steps: execution.steps,
  };
};

const getLogs = (id, user, query = {}) => {
  const execution = findAuthorizedExecution(id, user);
  const level = String(query.level || "").toUpperCase();
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 50);

  if (level && !["INFO", "DEBUG", "WARN", "ERROR"].includes(level)) {
    throw createHttpError(400, "INVALID_LOG_LEVEL", "Unsupported log level.");
  }

  if (!Number.isInteger(page) || page < 1) {
    throw createHttpError(400, "INVALID_PAGE", "Page must be a positive integer.");
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw createHttpError(400, "INVALID_LIMIT", "Limit must be between 1 and 100.");
  }

  const filtered = execution.logs
    .filter((log) => !level || log.level === level)
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

  const start = (page - 1) * limit;

  return {
    logs: filtered.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: filtered.length,
    },
  };
};

const getMetrics = (id, user) => {
  const execution = findAuthorizedExecution(id, user);
  const countedSteps = execution.steps.filter(
    (step) => step.nodeId !== "trigger"
  );
  const completedSteps = countedSteps.filter(
    (step) => step.status === "completed"
  );

  return {
    totalDurationMs: execution.durationMs,
    completedSteps: completedSteps.length,
    totalSteps: countedSteps.length,
    averageStepTimeMs: completedSteps.length
      ? Math.round(
          completedSteps.reduce((sum, step) => sum + (step.durationMs || 0), 0) /
            completedSteps.length
        )
      : 0,
    externalCalls: execution.externalCalls,
  };
};

const getContext = (id, user) => {
  const execution = findAuthorizedExecution(id, user);

  return redactSecrets({
    inputVariables: execution.inputVariables,
    outputVariables: execution.outputVariables,
    systemContext: execution.systemContext,
  });
};

const retry = (id, user, body = {}) => {
  const execution = findAuthorizedExecution(id, user);

  if (body.mode !== "current_step") {
    throw createHttpError(400, "INVALID_RETRY_MODE", 'Mode must be "current_step".');
  }

  if (!["running", "failed"].includes(execution.status)) {
    throw createHttpError(
      409,
      "RETRY_NOT_ALLOWED",
      "This execution cannot be retried in its current state."
    );
  }

  const operationId = `op_retry_${randomUUID()}`;

  execution.retryCount += 1;
  execution.operations.push({
    id: operationId,
    type: "retry",
    status: "accepted",
    createdAt: new Date().toISOString(),
  });

  repository.save(execution);

  return {
    success: true,
    message: "Retry accepted",
    data: {
      executionId: execution.id,
      status: execution.status,
      retryMode: body.mode,
      currentStepId: execution.currentStep?.nodeId || null,
      operationId,
    },
  };
};

const cancel = (id, user, body = {}) => {
  const execution = findAuthorizedExecution(id, user);

  if (execution.status !== "running" && execution.status !== "pending") {
    throw createHttpError(
      409,
      "CANCELLATION_NOT_ALLOWED",
      "Only pending or running executions can be cancelled."
    );
  }

  const operationId = `op_cancel_${randomUUID()}`;

  execution.status = "cancelling";
  execution.operations.push({
    id: operationId,
    type: "cancel",
    reason: String(body.reason || "Cancelled by user").slice(0, 500),
    status: "accepted",
    createdAt: new Date().toISOString(),
  });

  repository.save(execution);

  return {
    success: true,
    message: "Cancellation requested",
    data: {
      executionId: execution.id,
      status: execution.status,
      operationId,
    },
  };
};

module.exports = {
  EXECUTION_STATUSES,
  getSummary,
  getFlow,
  getSteps,
  getLogs,
  getMetrics,
  getContext,
  retry,
  cancel,
};