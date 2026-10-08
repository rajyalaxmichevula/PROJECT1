const {
    getDashboardStats,
    getExecutionData,
    getRecentExecutions,
    getWorkflowStatus,
    getSystemHealth,
    getActiveTenants
} = require("../services/dashboardService");
const getStats = async (req, res) => {
    try {
        const stats = await getDashboardStats();

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getExecutions = async (req, res) => {
    try {
        const range = req.query.range || "7d";

        const executions = await getExecutionData(range);

        res.status(200).json({
            success: true,
            data: executions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getRecent = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 5;

        const executions = await getRecentExecutions(limit);

        res.status(200).json({
            success: true,
            data: executions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getWorkflowStatusData = async (req, res) => {
    try {
        const status = await getWorkflowStatus();

        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getSystemHealthData = async (req, res) => {
    try {
        const health = await getSystemHealth();

        res.status(200).json(health);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getActiveTenantsData = async (req, res) => {
    try {
        const tenants = await getActiveTenants();

        res.status(200).json({
            data: tenants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
module.exports = {
    getStats,
    getExecutions,
    getRecent,
    getWorkflowStatusData,
    getSystemHealthData,
    getActiveTenantsData
};