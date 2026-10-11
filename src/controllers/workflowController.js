const workflowService = require("../services/workflowService");
const { validateGraph } = require("../validators/workflowValidator");

// Handle errors consistently in async controllers.
const asyncHandler = (handler) => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

// Return the authenticated user attached by the auth middleware.
const getUser = (req) => req.user;

// List workflows.
const getAllWorkflows = asyncHandler(async (req, res) => {
  const result = await workflowService.getWorkflows(getUser(req), {
    search: req.query.search,
    status: req.query.status,
    page: req.query.page,
    limit: req.query.limit,
  });

  res.status(200).json({
    success: true,
    ...result,
  });
});

// Get one workflow.
const getWorkflow = asyncHandler(async (req, res) => {
  const workflow = await workflowService.getWorkflowById(
    req.params.id,
    getUser(req),
  );

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: "Workflow not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: workflow,
  });
});

// Create a workflow.
const createWorkflowController = asyncHandler(async (req, res) => {
  const workflow = await workflowService.createWorkflow(req.body, getUser(req));

  res.status(201).json({
    success: true,
    data: workflow,
  });
});

// Update a workflow.
const updateWorkflowController = asyncHandler(async (req, res) => {
  const workflow = await workflowService.updateWorkflow(
    req.params.id,
    req.body,
    getUser(req),
  );

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: "Workflow not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: workflow,
  });
});

// Archive a workflow.
const deleteWorkflowController = asyncHandler(async (req, res) => {
  const deleted = await workflowService.deleteWorkflow(
    req.params.id,
    getUser(req),
  );

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Workflow not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Workflow archived successfully.",
  });
});

// Validate a workflow's nodes and edges.
const validateWorkflowController = asyncHandler(async (req, res) => {
  const { nodes = [], edges = [] } = req.body;

  const validation = validateGraph(nodes, edges);

  res.status(200).json({
    success: true,
    data: validation,
  });
});

// Get workflow version history.
const getWorkflowVersionsController = asyncHandler(async (req, res) => {
  const versions = await workflowService.getWorkflowVersions(
    req.params.id,
    getUser(req),
  );

  if (!versions) {
    return res.status(404).json({
      success: false,
      message: "Workflow not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: versions,
  });
});

// Get a specific workflow version.
const getWorkflowVersionController = asyncHandler(async (req, res) => {
  const version = await workflowService.getWorkflowVersion(
    req.params.id,
    req.params.version,
    getUser(req),
  );

  if (!version) {
    return res.status(404).json({
      success: false,
      message: "Workflow version not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: version,
  });
});

// Deploy a saved workflow version.
const deployWorkflowController = asyncHandler(async (req, res) => {
  const result = await workflowService.deployWorkflow(
    req.params.id,
    req.body.version,
    getUser(req),
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Workflow not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
});

// Return a basic test-run response.
// A real workflow execution engine is not implemented here.
const testRunWorkflowController = asyncHandler(async (req, res) => {
  const workflow = await workflowService.getWorkflowById(
    req.params.id,
    getUser(req),
  );

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: "Workflow not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Workflow is available for testing.",
    data: {
      workflowId: workflow.id,
      status: "test_ready",
    },
  });
});

// Return a response indicating that execution is not implemented yet.
const executeWorkflowController = asyncHandler(async (req, res) => {
  const workflow = await workflowService.getWorkflowById(
    req.params.id,
    getUser(req),
  );

  if (!workflow) {
    return res.status(404).json({
      success: false,
      message: "Workflow not found.",
    });
  }

  res.status(501).json({
    success: false,
    message: "Workflow execution is not implemented yet.",
    data: {
      workflowId: workflow.id,
    },
  });
});

// Get an execution by its ID.
const getExecutionController = asyncHandler(async (req, res) => {
  return res.status(501).json({
    success: false,
    message: "Execution retrieval is not implemented yet.",
    executionId: req.params.executionId,
  });
});

module.exports = {
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
  getExecutionController,
};
