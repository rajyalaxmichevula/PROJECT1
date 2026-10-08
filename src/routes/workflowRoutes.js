const express = require("express");

const {
    getAllWorkflows,
    getWorkflow,
    createWorkflowController,
    updateWorkflowController
} = require("../controllers/workflowController");

const authMiddleware = require("../middleware/authMiddleware");

const {
    validateCreateWorkflow,
    validateUpdateWorkflow
} = require("../validators/workflowValidator");

const router = express.Router();

router.get("/", authMiddleware, getAllWorkflows);

router.get("/:id", authMiddleware, getWorkflow);

router.post(
    "/",
    authMiddleware,
    validateCreateWorkflow,
    createWorkflowController
);

router.put(
    "/:id",
    authMiddleware,
    validateUpdateWorkflow,
    updateWorkflowController
);

module.exports = router;