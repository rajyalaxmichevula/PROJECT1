const service = require("../services/executionService");

const handleError = (res, error) => {
  const status =
    Number.isInteger(error.status) &&
    error.status >= 400 &&
    error.status <= 599
      ? error.status
      : 500;

  return res.status(status).json({
    success: false,
    code:
      error.code ||
      (status >= 500 ? "INTERNAL_SERVER_ERROR" : "REQUEST_ERROR"),
    message:
      status >= 500
        ? "Internal server error"
        : error.message || "Request failed",
  });
};

const sendSuccess = (res, message, data, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

const createController = (action, message, status = 200) => {
  return async (req, res) => {
    try {
      const data = await action(req);
      return sendSuccess(res, message, data, status);
    } catch (error) {
      return handleError(res, error);
    }
  };
};

const getExecutionController = createController(
  (req) => service.getSummary(req.params.executionId, req.user),
  "Execution retrieved successfully"
);

const getExecutionFlowController = createController(
  (req) => service.getFlow(req.params.executionId, req.user),
  "Execution flow retrieved successfully"
);

const getExecutionStepsController = createController(
  (req) => service.getSteps(req.params.executionId, req.user),
  "Execution steps retrieved successfully"
);

const getExecutionLogsController = createController(
  (req) =>
    service.getLogs(req.params.executionId, req.user, req.query),
  "Execution logs retrieved successfully"
);

const getExecutionMetricsController = createController(
  (req) => service.getMetrics(req.params.executionId, req.user),
  "Execution metrics retrieved successfully"
);

const getExecutionContextController = createController(
  (req) => service.getContext(req.params.executionId, req.user),
  "Execution context retrieved successfully"
);

const retryExecutionController = createController(
  (req) =>
    service.retry(req.params.executionId, req.user, req.body),
  "Retry accepted",
  202
);

const cancelExecutionController = createController(
  (req) =>
    service.cancel(req.params.executionId, req.user, req.body),
  "Cancellation requested",
  202
);

module.exports = {
  getExecutionController,
  getExecutionFlowController,
  getExecutionStepsController,
  getExecutionLogsController,
  getExecutionMetricsController,
  getExecutionContextController,
  retryExecutionController,
  cancelExecutionController,
};