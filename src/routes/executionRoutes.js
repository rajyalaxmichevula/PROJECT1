const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getExecutionController,
  getExecutionFlowController,
  getExecutionStepsController,
  getExecutionLogsController,
  getExecutionMetricsController,
  getExecutionContextController,
  retryExecutionController,
  cancelExecutionController,
} = require("../controllers/executionController");

const router = express.Router();

// All execution endpoints require authentication.
router.use(authMiddleware);

// Execution details and supporting data.
router.get("/:executionId/flow", getExecutionFlowController);
router.get("/:executionId/steps", getExecutionStepsController);
router.get("/:executionId/logs", getExecutionLogsController);
router.get("/:executionId/metrics", getExecutionMetricsController);
router.get("/:executionId/context", getExecutionContextController);

// Execution actions.
router.post("/:executionId/retry", retryExecutionController);
router.post("/:executionId/cancel", cancelExecutionController);

// Keep the base execution route after the more specific routes.
router.get("/:executionId", getExecutionController);

module.exports = router;