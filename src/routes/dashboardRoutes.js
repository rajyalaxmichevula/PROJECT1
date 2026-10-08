const express = require("express");
const router = express.Router();

const {
    getStats,
    getExecutions,
    getRecent,
    getWorkflowStatusData,
    getSystemHealthData,
    getActiveTenantsData
} = require("../controllers/dashboardController");
router.get("/stats", getStats);
router.get("/executions", getExecutions);
router.get("/recent-executions", getRecent);
router.get("/workflow-status", getWorkflowStatusData);
router.get("/system-health", getSystemHealthData);
router.get("/active-tenants", getActiveTenantsData);
module.exports = router;