
import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

const initialAlerts = [
    {
        id: 1,
        name: "High CPU Usage",
        severity: "Critical",
        category: "Infrastructure",
        status: "Active",
        triggeredAt: "Oct 7, 2025, 10:24",
        createdAt: "Oct 7, 2025, 09:50 AM",
        lastTriggered: "Oct 7, 2025, 10:24 AM",
        triggeredCount: 8,
        description:
            "This alert is triggered when CPU usage on any worker node exceeds 90% for more than 5 minutes.",
        resources: ["worker-3", "worker-7", "worker-8"],
        tags: ["cpu", "infrastructure", "performance"],
    },
    {
        id: 2,
        name: "Payment Failure Rate",
        severity: "High",
        category: "Application",
        status: "Active",
        triggeredAt: "Oct 7, 2025, 09:18",
        createdAt: "Oct 7, 2025, 08:30 AM",
        lastTriggered: "Oct 7, 2025, 09:18 AM",
        triggeredCount: 12,
        description: "Payment failures have exceeded the configured threshold.",
        resources: ["payment-service", "api-gateway"],
        tags: ["payment", "application"],
    },
    {
        id: 3,
        name: "Low Inventory Stock",
        severity: "Medium",
        category: "Business",
        status: "Resolved",
        triggeredAt: "Oct 7, 2025, 08:46",
        createdAt: "Oct 7, 2025, 08:00 AM",
        lastTriggered: "Oct 7, 2025, 08:46 AM",
        triggeredCount: 3,
        description: "Inventory has fallen below the minimum stock threshold.",
        resources: ["warehouse-01"],
        tags: ["inventory", "business"],
    },
    {
        id: 4,
        name: "Worker Offline",
        severity: "High",
        category: "Infrastructure",
        status: "Active",
        triggeredAt: "Oct 7, 2025, 07:32",
        createdAt: "Oct 7, 2025, 07:00 AM",
        lastTriggered: "Oct 7, 2025, 07:32 AM",
        triggeredCount: 5,
        description: "A worker node has stopped responding to health checks.",
        resources: ["worker-5"],
        tags: ["worker", "infrastructure"],
    },
    {
        id: 5,
        name: "Execution Failure Spike",
        severity: "Critical",
        category: "Application",
        status: "Resolved",
        triggeredAt: "Oct 7, 2025, 06:21",
        createdAt: "Oct 7, 2025, 06:00 AM",
        lastTriggered: "Oct 7, 2025, 06:21 AM",
        triggeredCount: 15,
        description: "Workflow execution failures exceeded the allowed limit.",
        resources: ["orchestrator"],
        tags: ["execution", "application"],
    },
    {
        id: 6,
        name: "Disk Space Low",
        severity: "Medium",
        category: "Infrastructure",
        status: "Resolved",
        triggeredAt: "Oct 7, 2025, 05:18",
        createdAt: "Oct 7, 2025, 05:00 AM",
        lastTriggered: "Oct 7, 2025, 05:18 AM",
        triggeredCount: 2,
        description: "Available disk storage has dropped below 20%.",
        resources: ["storage-node-2"],
        tags: ["storage", "infrastructure"],
    },
    {
        id: 7,
        name: "High Memory Usage",
        severity: "High",
        category: "Infrastructure",
        status: "Active",
        triggeredAt: "Oct 7, 2025, 04:12",
        createdAt: "Oct 7, 2025, 04:00 AM",
        lastTriggered: "Oct 7, 2025, 04:12 AM",
        triggeredCount: 6,
        description: "Memory usage has exceeded the configured threshold.",
        resources: ["worker-2"],
        tags: ["memory", "infrastructure"],
    },
    {
        id: 8,
        name: "Email Notification Failure",
        severity: "Medium",
        category: "Notification",
        status: "Resolved",
        triggeredAt: "Oct 7, 2025, 03:45",
        createdAt: "Oct 7, 2025, 03:00 AM",
        lastTriggered: "Oct 7, 2025, 03:45 AM",
        triggeredCount: 4,
        description: "Email notification delivery has failed.",
        resources: ["notification-service"],
        tags: ["email", "notification"],
    },
    {
        id: 9,
        name: "Slow Workflow Execution",
        severity: "Low",
        category: "Performance",
        status: "Resolved",
        triggeredAt: "Oct 7, 2025, 02:30",
        createdAt: "Oct 7, 2025, 02:00 AM",
        lastTriggered: "Oct 7, 2025, 02:30 AM",
        triggeredCount: 2,
        description: "Workflow execution time is above the expected duration.",
        resources: ["workflow-engine"],
        tags: ["workflow", "performance"],
    },
    {
        id: 10,
        name: "Database Connection Error",
        severity: "Critical",
        category: "Infrastructure",
        status: "Active",
        triggeredAt: "Oct 7, 2025, 01:15",
        createdAt: "Oct 7, 2025, 01:00 AM",
        lastTriggered: "Oct 7, 2025, 01:15 AM",
        triggeredCount: 9,
        description: "Database connections are failing repeatedly.",
        resources: ["database-primary"],
        tags: ["database", "infrastructure"],
    },

    ...Array.from({ length: 14 }, (_, index) => ({
        id: index + 11,
        name: [
            "API Response Timeout",
            "Queue Backlog Warning",
            "SSL Certificate Expiry",
            "Authentication Failure",
            "Storage Capacity Warning",
            "Service Unavailable",
            "CPU Temperature High",
        ][index % 7],
        severity: ["Low", "Medium", "High", "Critical"][index % 4],
        category: ["Application", "Infrastructure", "Performance"][index % 3],
        status: index % 2 === 0 ? "Active" : "Resolved",
        triggeredAt: "Oct 6, 2025, 11:30",
        createdAt: "Oct 6, 2025, 11:00 AM",
        lastTriggered: "Oct 6, 2025, 11:30 AM",
        triggeredCount: index + 1,
        description: "System alert generated based on configured monitoring conditions.",
        resources: ["service-node-1"],
        tags: ["monitoring", "system"],
    })),
];

export const AlertProvider = ({ children }) => {

    const [alerts, setAlerts] = useState(initialAlerts);

    const [selectedAlert, setSelectedAlert] = useState(initialAlerts[0]);

    // Select an alert
    const selectAlert = (alert) => {
        setSelectedAlert(alert);
    };

    // Update an alert
    const updateAlert = (id, updatedData) => {

        const updatedAlerts = alerts.map((alert) =>
            alert.id === id
                ? { ...alert, ...updatedData }
                : alert
        );

        setAlerts(updatedAlerts);

        setSelectedAlert((prev) =>
            prev?.id === id
                ? { ...prev, ...updatedData }
                : prev
        );
    };

    // Resolve an alert
    const resolveAlert = (id) => {

        updateAlert(id, { status: "Resolved" });

    };

    return (
        <AlertContext.Provider
            value={{
                alerts,
                selectedAlert,
                selectAlert,
                updateAlert,
                resolveAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

// Custom hook
export const useAlerts = () => {

    const context = useContext(AlertContext);

    if (!context) {
        throw new Error("useAlerts must be used inside AlertProvider");
    }

    return context;
};
