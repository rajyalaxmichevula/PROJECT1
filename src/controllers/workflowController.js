const {
    getWorkflows,
    getWorkflowById,
    createWorkflow,
    updateWorkflow
} = require("../services/workflowService");
const getAllWorkflows = async (req, res) => {
    try {
        const workflows = await getWorkflows();

        res.status(200).json({
            success: true,
            data: workflows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getWorkflow = async (req, res) => {
    try {
        const workflow = await getWorkflowById(req.params.id);

        if (!workflow) {
            return res.status(404).json({
                success: false,
                message: "Workflow not found"
            });
        }

        res.status(200).json({
            success: true,
            data: workflow
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const createWorkflowController = async (req, res) => {
    try {
        const workflow = await createWorkflow(req.body);

        res.status(201).json({
            success: true,
            message: "Workflow created successfully",
            data: workflow
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const updateWorkflowController = async (req, res) => {
    try {
        const workflow = await updateWorkflow(
            req.params.id,
            req.body
        );

        if (!workflow) {
            return res.status(404).json({
                success: false,
                message: "Workflow not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Workflow updated successfully",
            data: workflow
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
module.exports = {
    getAllWorkflows,
    getWorkflow,
    createWorkflowController,
    updateWorkflowController
};