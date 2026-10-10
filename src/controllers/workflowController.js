
const service = require("../services/workflowService");
const { validateGraph } = require("../validators/workflowValidator");

// The authentication middleware must populate req.user.
const getUser = (req) => req.user;

const handleError = (res, error) => {
  return res.status(error.status || 500).json({
    success: false,
    ...(error.code && { code: error.code }),
    message:
      error.status && error.status < 500
        ? error.message
        : "Internal server error",
  });
};

const formatValidationErrors = (errors) =>
  errors.map((message) => ({
    code: "WORKFLOW_VALIDATION_ERROR",
    message,
  }));

const getAllWorkflows = async (req, res) => {
  try {
    const result = await service.getWorkflows(
      getUser(req),
      req.query
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const getWorkflow = async (req, res) => {
  try {
    const workflow = await service.getWorkflowById(
      req.params.id,
      getUser(req)
    );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    return res.json({
      success: true,
      data: workflow,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const createWorkflowController = async (req, res) => {
  try {
    const errors = validateGraph(req.body.nodes, req.body.edges);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        valid: false,
        errors: formatValidationErrors(errors),
      });
    }

    const workflow = await service.createWorkflow(
      req.body,
      getUser(req)
    );

    return res.status(201).json({
      success: true,
      message: "Workflow created successfully",
      data: workflow,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const updateWorkflowController = async (req, res) => {
  try {
    const user = getUser(req);
    const id = req.params.id;

    // If either part of the graph changes, validate the complete graph.
    const hasGraph =
      req.body.nodes !== undefined ||
      req.body.edges !== undefined;

    if (hasGraph) {
      const existing = await service.getWorkflowById(id, user);

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Workflow not found",
        });
      }

      const errors = validateGraph(
        req.body.nodes ?? existing.nodes,
        req.body.edges ?? existing.edges
      );

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          valid: false,
          errors: formatValidationErrors(errors),
        });
      }
    }

    const workflow = await service.updateWorkflow(
      id,
      req.body,
      user
    );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    return res.json({
      success: true,
      message: "Workflow updated successfully",
      data: workflow,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteWorkflowController = async (req, res) => {
  try {
    const deleted = await service.deleteWorkflow(
      req.params.id,
      getUser(req)
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    return res.json({
      success: true,
      message: "Workflow archived successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Return validation results without creating or changing a workflow.
const validateWorkflowController = (req, res) => {
  const errors = validateGraph(
    req.body?.nodes,
    req.body?.edges
  );

  return res.status(200).json({
    success: true,
    valid: errors.length === 0,
    errors: formatValidationErrors(errors),
  });
};

const getWorkflowVersionsController = async (req, res) => {
  try {
    const versions = await service.getWorkflowVersions(
      req.params.id,
      getUser(req)
    );

    if (!versions) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    return res.json({
      success: true,
      data: versions,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const getWorkflowVersionController = async (req, res) => {
  try {
    const version = await service.getWorkflowVersion(
      req.params.id,
      req.params.version,
      getUser(req)
    );

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Workflow version not found",
      });
    }

    return res.json({
      success: true,
      data: version,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const deployWorkflowController = async (req, res) => {
  try {
    const user = getUser(req);

    const workflow = await service.getWorkflowById(
      req.params.id,
      user
    );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    const version =
      req.body?.version === undefined ||
      req.body?.version === null ||
      req.body?.version === ""
        ? workflow.currentVersion
        : Number(req.body.version);

    if (!Number.isInteger(version) || version < 1) {
      return res.status(400).json({
        success: false,
        code: "INVALID_VERSION",
        message: "A valid positive workflow version is required.",
      });
    }

    const savedVersion = await service.getWorkflowVersion(
      req.params.id,
      version,
      user
    );

    if (!savedVersion) {
      return res.status(404).json({
        success: false,
        message: "Workflow version not found",
      });
    }

    const errors = validateGraph(
      savedVersion.nodes,
      savedVersion.edges
    );

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        valid: false,
        errors: formatValidationErrors(errors),
      });
    }

    // This marks the selected version as deployed.
    // Coordinate with M4 to invoke the actual execution engine.
    const deployment = await service.deployWorkflow(
      req.params.id,
      version,
      user
    );

    return res.json({
      success: true,
      message: "Workflow deployed successfully",
      data: deployment,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// M4 must provide the execution engine integration.
// Do not report a test run as successful until it is actually run.
const testRunWorkflowController = async (req, res) => {
  try {
    const workflow = await service.getWorkflowById(
      req.params.id,
      getUser(req)
    );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    const errors = validateGraph(
      workflow.nodes,
      workflow.edges
    );

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        valid: false,
        errors: formatValidationErrors(errors),
      });
    }

    return res.status(501).json({
      success: false,
      code: "EXECUTION_ENGINE_NOT_INTEGRATED",
      message:
        "Workflow validation passed, but test execution is not integrated yet. Connect the M4 execution engine.",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const executeWorkflowController = async (req, res) => {
  try {
    const workflow = await service.getWorkflowById(
      req.params.id,
      getUser(req)
    );

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    if (
      workflow.status !== "Active" ||
      workflow.deployedVersion === null
    ) {
      return res.status(409).json({
        success: false,
        code: "WORKFLOW_NOT_DEPLOYED",
        message: "Deploy the workflow before executing it.",
      });
    }

    return res.status(501).json({
      success: false,
      code: "EXECUTION_ENGINE_NOT_INTEGRATED",
      message:
        "Workflow execution is not integrated yet. Connect the M4 execution engine.",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Execution status belongs in the execution service/router.
// This placeholder avoids pretending execution records exist.
const getExecutionController = async (req, res) => {
  return res.status(501).json({
    success: false,
    code: "EXECUTION_STATUS_NOT_INTEGRATED",
    message:
      "Execution status lookup must be connected to the execution service.",
  });
};

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
