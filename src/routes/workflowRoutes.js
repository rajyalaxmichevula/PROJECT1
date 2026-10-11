const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  validateCreateWorkflow,
  validateUpdateWorkflow,
} = require("../validators/workflowValidator");

const {
  getAllWorkflows,
  getWorkflow,
  createWorkflowController,
  updateWorkflowController,
  deleteWorkflowController,
  validateWorkflowController,
  getWorkflowVersionsController,
  getWorkflowVersionController,
  deployWorkflowController,
  testRunWorkflowController,
  executeWorkflowController,
} = require("../controllers/workflowController");

const router = express.Router();

router.use(authMiddleware);

// Validate a graph without saving it.
router.post("/validate", validateWorkflowController);

// List and create workflows.
router.get("/", getAllWorkflows);
router.post("/", validateCreateWorkflow, createWorkflowController);

// Version history.
router.get("/:id/versions", getWorkflowVersionsController);
router.get("/:id/versions/:version", getWorkflowVersionController);

// Test, deploy, and execute.
router.post("/:id/test-runs", testRunWorkflowController);
router.post("/:id/deploy", deployWorkflowController);
router.post("/:id/execute", executeWorkflowController);

// Read, update, and delete.
router.get("/:id", getWorkflow);
router.put("/:id", validateUpdateWorkflow, updateWorkflowController);
router.delete("/:id", deleteWorkflowController);

module.exports = router;
