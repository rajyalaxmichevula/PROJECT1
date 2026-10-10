
const service = require("../services/workflowService");
const { validateGraph } = require("../validators/workflowValidator");

const getUser = (req) => req.user;

// Standard error response.
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

// Standard 404 response.
const notFound = (res, code, message) =>
  res.status(404).json({
    success: false,
    code,
    message,
  });

// Standard graph-validation error response.
const formatValidationErrors = (errors) =>
  errors.map((message) => ({
    code: "WORKFLOW_VALIDATION_ERROR",
    message,
  }));

const sendValidationErrors = (res, errors) =>
  res.status(400).json({
    success: false,
    code: "WORKFLOW_VALIDATION_ERROR",
    message: "Workflow graph validation failed.",
    valid: false,
    errors: formatValidationErrors(errors),
  });

const getAllWorkflows = async (req, res) => {
  try {
    const result = await service.getWorkflows(
      getUser(req),
      req.query
    );

    return res.status(200).json({
      success: true,
      message: "Workflows retrieved successfully",
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
      return notFound(
        res,
        "WORKFLOW_NOT_FOUND",
        "Workflow not found."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Workflow retrieved successfully",
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
      return sendValidationErrors(res, errors);
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

    const hasGraph =
      req.body.nodes !== undefined ||
      req.body.edges !== undefined;

    if (hasGraph) {
      const existing = await service.getWorkflowById(id, user);

      if (!existing) {
        return notFound(
          res,
          "WORKFLOW_NOT_FOUND",
          "Workflow not found."
        );
      }

      const errors = validateGraph(
        req.body.nodes ?? existing.nodes,
        req.body.edges ?? existing.edges
      );

      if (errors.length > 0) {
        return sendValidationErrors(res, errors);
      }
    }

    const workflow = await service.updateWorkflow(
      id,
      req.body,
      user
    );

    if (!workflow) {
      return notFound(
        res,
        "WORKFLOW_NOT_FOUND",
        "Workflow not found."
      );
    }

    return res.status(200).json({
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
      return notFound(
        res,
        "WORKFLOW_NOT_FOUND",
        "Workflow not found."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Workflow archived successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Validate a graph without saving it.
const validateWorkflowController = (req, res) => {
  const errors = validateGraph(
    req.body?.nodes,
    req.body?.edges
  );

  if (errors.length > 0) {
    return sendValidationErrors(res, errors);
  }

  return res.status(200).json({
    success: true,
    message: "Workflow graph is valid",
    valid: true,
    errors: [],
  });
};

const getWorkflowVersionsController = async (req, res) => {
  try {
    const versions = await service.getWorkflowVersions(
      req.params.id,
      getUser(req)
    );

    if (!versions) {
      return notFound(
        res,
        "WORKFLOW_NOT_FOUND",
        "Workflow not found."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Workflow versions retrieved successfully",
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
      return notFound(
        res,
        "WORKFLOW_VERSION_NOT_FOUND",
        "Workflow version not found."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Workflow version retrieved successfully",
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
      return notFound(
        res,
        "WORKFLOW_NOT_FOUND",
        "Workflow not found."
      );
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
      return notFound(
        res,
        "WORKFLOW_VERSION_NOT_FOUND",
        "Workflow version not found."
      );
    }

    const errors = validateGraph(
      savedVersion.nodes,
      savedVersion.edges
    );

    if (errors.length > 0) {
      return sendValidationErrors(res, errors);
    }

    // Marks the selected version as deployed.
    // Actual execution must be integrated by M4.
    const deployment = await service.deployWorkflow(
      req.params.id,
      version,
      user
    );

    return res.status(200).json({
      success: true,
      message: "Workflow deployed successfully",
      data: deployment,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// Execution integration is not yet implemented.
const testRunWorkflowController = async (req, res) => {
  try {
    const workflow = await service.getWorkflowById(
      req.params.id,
      getUser(req)
    );

    if (!workflow) {
      return notFound(
        res,
        "WORKFLOW_NOT_FOUND",
        "Workflow not found."
      );
    }

    const errors = validateGraph(workflow.nodes, workflow.edges);

    if (errors.length > 0) {
      return sendValidationErrors(res, errors);
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
      return notFound(
        res,
        "WORKFLOW_NOT_FOUND",
        "Workflow not found."
      );
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
