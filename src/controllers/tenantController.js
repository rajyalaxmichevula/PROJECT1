const {
    getTenants,
    switchTenant
} = require("../services/tenantService");

const getAllTenants = async (req, res) => {
    try {
        const tenants = await getTenants();

        res.status(200).json({
            success: true,
            data: tenants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const switchTenantController = async (req, res) => {
    try {
        const { tenantId } = req.body;

        const tenant = await switchTenant(tenantId);

        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: "Tenant not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Tenant switched successfully",
            data: tenant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllTenants,
    switchTenantController
};