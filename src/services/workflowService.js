const getWorkflows = async () => {
    return [
        {
            id: "workflow-001",
            name: "Order Processing",
            description: "Processes customer orders",
            status: "Active",
            version: 1,
            createdAt: "2026-10-01T10:00:00.000Z",
            updatedAt: "2026-10-07T12:00:00.000Z"
        },
        {
            id: "workflow-002",
            name: "Payment Processing",
            description: "Handles payment processing",
            status: "Active",
            version: 2,
            createdAt: "2026-10-02T10:00:00.000Z",
            updatedAt: "2026-10-07T11:30:00.000Z"
        },
        {
            id: "workflow-003",
            name: "User Registration",
            description: "Handles new user registration",
            status: "Draft",
            version: 1,
            createdAt: "2026-10-03T10:00:00.000Z",
            updatedAt: "2026-10-06T15:00:00.000Z"
        }
    ];
};

const getWorkflowById = async (id) => {
    const workflows = await getWorkflows();

    return workflows.find(workflow => workflow.id === id);
};
const createWorkflow = async ({ name, description }) => {
    return {
        id: `workflow-${Date.now()}`,
        name,
        description: description || "",
        status: "Draft",
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};
const updateWorkflow = async (id, updates) => {
    const workflows = await getWorkflows();

    const workflow = workflows.find(workflow => workflow.id === id);

    if (!workflow) {
        return null;
    }

    return {
        ...workflow,
        ...updates,
        version: workflow.version + 1,
        updatedAt: new Date().toISOString()
    };
};
module.exports = {
    getWorkflows,
    getWorkflowById,
    createWorkflow,
    updateWorkflow
};