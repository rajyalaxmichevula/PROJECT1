const getDashboardStats = async () => {
    return {
        totalWorkflows: 24,
        running: 6,
        completed: 142,
        failed: 12,
        changes: {
            totalWorkflows: 12,
            running: 50,
            completed: 18,
            failed: 8
        }
    };
};
const getExecutionData = async (range) => {
    const executionData = {
        "7d": [
            { date: "2026-10-01", successful: 30, running: 18, failed: 12 },
            { date: "2026-10-02", successful: 35, running: 20, failed: 10 },
            { date: "2026-10-03", successful: 28, running: 15, failed: 8 },
            { date: "2026-10-04", successful: 40, running: 22, failed: 14 },
            { date: "2026-10-05", successful: 32, running: 17, failed: 9 },
            { date: "2026-10-06", successful: 45, running: 25, failed: 11 },
            { date: "2026-10-07", successful: 38, running: 19, failed: 7 }
        ],

        "30d": [],
        "90d": []
    };

    return executionData[range] || executionData["7d"];
};
const getRecentExecutions = async (limit) => {
    const executions = [
        {
            id: "EX-1001",
            workflowId: "workflow-001",
            workflowName: "Order Processing",
            status: "Completed",
            durationMs: 2400,
            executedAt: "2026-10-07T12:30:00.000Z"
        },
        {
            id: "EX-1002",
            workflowId: "workflow-002",
            workflowName: "Payment Processing",
            status: "Running",
            durationMs: 1800,
            executedAt: "2026-10-07T12:25:00.000Z"
        },
        {
            id: "EX-1003",
            workflowId: "workflow-003",
            workflowName: "User Registration",
            status: "Failed",
            durationMs: 3200,
            executedAt: "2026-10-07T12:20:00.000Z"
        },
        {
            id: "EX-1004",
            workflowId: "workflow-004",
            workflowName: "Email Notification",
            status: "Completed",
            durationMs: 1500,
            executedAt: "2026-10-07T12:15:00.000Z"
        },
        {
            id: "EX-1005",
            workflowId: "workflow-005",
            workflowName: "Inventory Update",
            status: "Completed",
            durationMs: 2100,
            executedAt: "2026-10-07T12:10:00.000Z"
        }
    ];

    return executions.slice(0, limit);
};
const getWorkflowStatus = async () => {
    return {
        running: 6,
        completed: 12,
        failed: 4,
        pending: 2
    };
};
const getSystemHealth = async () => {
    return {
        overallStatus: "Healthy",
        services: [
            {
                name: "API Server",
                status: "Healthy",
                responseTimeMs: 120
            },
            {
                name: "Database",
                status: "Healthy",
                responseTimeMs: 45
            },
            {
                name: "Message Queue",
                status: "Healthy",
                responseTimeMs: 32
            },
            {
                name: "Workers",
                status: "Healthy",
                responseTimeMs: 98
            }
        ]
    };
};
const getActiveTenants = async () => {
    return [
        {
            id: "tenant-001",
            name: "Acme Corp",
            domain: "acme.flowforge.com",
            workflows: 12,
            status: "Active"
        },
        {
            id: "tenant-002",
            name: "TechNova",
            domain: "technova.flowforge.com",
            workflows: 8,
            status: "Active"
        },
        {
            id: "tenant-003",
            name: "Global Systems",
            domain: "global.flowforge.com",
            workflows: 15,
            status: "Active"
        }
    ];
};
module.exports = {
    getDashboardStats,
    getExecutionData,
    getRecentExecutions,
    getWorkflowStatus,
    getSystemHealth,
    getActiveTenants
};