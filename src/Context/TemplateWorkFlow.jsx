
import { createContext, useContext } from "react";

const workflowData = {
    workflowName: "Order Processing Template",
    version: "1.0.0",

    nodes: [
        {
            id: "trigger",
            title: "Trigger",
            subtitle: "New Order",
            icon: "zap",
            status: "completed",
            color: "green",
        },
        {
            id: "validate-order",
            title: "Validate Order",
            subtitle: "Check items",
            icon: "file-text",
            status: "completed",
            color: "blue",
        },
        {
            id: "check-inventory",
            title: "Check Inventory",
            subtitle: "Query stock",
            icon: "package",
            status: "completed",
            color: "purple",
        },
        {
            id: "process-payment",
            title: "Process Payment",
            subtitle: "Charge customer",
            icon: "database",
            status: "pending",
            color: "blue",
        },
        {
            id: "update-inventory",
            title: "Update Inventory",
            subtitle: "Reduce stock",
            icon: "file-text",
            status: "pending",
            color: "blue",
        },
        {
            id: "send-notification",
            title: "Send Notification",
            subtitle: "Notify customer",
            icon: "mail",
            status: "pending",
            color: "orange",
        },
        {
            id: "end-failed",
            title: "End (Failed)",
            subtitle: "Order rejected",
            icon: "square",
            status: "failed",
            color: "red",
        },
    ],

    connections: [
        {
            id: "edge-1",
            source: "trigger",
            target: "validate-order",
            type: "default",
        },
        {
            id: "edge-2",
            source: "validate-order",
            target: "check-inventory",
            type: "default",
        },
        {
            id: "edge-3",
            source: "check-inventory",
            target: "process-payment",
            type: "conditional",
            label: "In Stock",
            condition: "stockAvailable",
            color: "green",
        },
        {
            id: "edge-4",
            source: "process-payment",
            target: "update-inventory",
            type: "default",
        },
        {
            id: "edge-5",
            source: "check-inventory",
            target: "send-notification",
            type: "conditional",
            label: "Out of Stock",
            condition: "stockUnavailable",
            color: "red",
        },
        {
            id: "edge-6",
            source: "send-notification",
            target: "end-failed",
            type: "default",
        },
    ],
};

// Create Context
const WorkflowContext = createContext(null);

// Custom hook
export const useWorkflow = () => {
    const context = useContext(WorkflowContext);

    if (!context) {
        throw new Error(
            "useWorkflow must be used inside WorkflowProvider"
        );
    }

    return context;
};

// Provider
export const WorkflowProvider = ({ children }) => {
    return (
        <WorkflowContext.Provider value={workflowData}>
            {children}
        </WorkflowContext.Provider>
    );
};
