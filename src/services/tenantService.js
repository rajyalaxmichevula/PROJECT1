const getTenants = async () => {
    return [
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
};

const switchTenant = async (tenantId) => {
    const tenants = await getTenants();

    const tenant = tenants.find(
        tenant => tenant.id === tenantId
    );

    if (!tenant) {
        return null;
    }

    return tenant;
};

module.exports = {
    getTenants,
    switchTenant
};