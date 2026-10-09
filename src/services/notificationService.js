const getNotifications = async () => {
    return [
        {
            id: "notification-001",
            type: "workflow",
            title: "Workflow completed",
            message: "Order Processing workflow completed successfully.",
            read: false,
            createdAt: "2026-10-08T10:30:00.000Z"
        },
        {
            id: "notification-002",
            type: "execution",
            title: "Execution failed",
            message: "Payment Processing workflow execution failed.",
            read: false,
            createdAt: "2026-10-08T09:45:00.000Z"
        },
        {
            id: "notification-003",
            type: "system",
            title: "System update",
            message: "FlowForge system health is normal.",
            read: true,
            createdAt: "2026-10-08T08:30:00.000Z"
        }
    ];
};

module.exports = {
    getNotifications
};