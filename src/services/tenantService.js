const tenants = [
    {
        id: "tenant-001",
        name: "Acme Corp",
        domain: "acme.flowforge.com",
        status: "Active",
        workflows: 12
    },
    {
        id: "tenant-002",
        name: "TechNova",
        domain: "technova.flowforge.com",
        status: "Active",
        workflows: 8
    },
    {
        id: "tenant-003",
        name: "Global Systems",
        domain: "global.flowforge.com",
        status: "Active",
        workflows: 15
    }
];

// Temporary membership data for development and testing.
// Replace this with real membership checks when the
// application's authorization provider is integrated.
const tenantMemberships = {
    "temporary-user-id": ["tenant-002"]
};

const getTenants = async () => {
    return tenants.map(tenant => ({ ...tenant }));
};

const switchTenant = async (tenantId) => {
    const tenant = tenants.find(
        tenant => tenant.id === tenantId
    );

    return tenant ? { ...tenant } : null;
};

const userCanAccessTenant = async (userId, tenantId) => {
    const allowedTenants = tenantMemberships[userId] || [];

    return allowedTenants.includes(tenantId);
};

module.exports = {
    getTenants,
    switchTenant,
    userCanAccessTenant
};