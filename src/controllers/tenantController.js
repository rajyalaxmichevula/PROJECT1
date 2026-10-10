const {
    getTenants,
    switchTenant,
    userCanAccessTenant
} = require("../services/tenantService");

const {
    generateToken
} = require("../services/authService");

const getAllTenants = async (req, res) => {
    try {
        const tenants = await getTenants();
        const userId = req.user.userId;

        // Return only tenants this user is allowed to access.
        const authorizedTenants = [];

        for (const tenant of tenants) {
            const allowed = await userCanAccessTenant(
                userId,
                tenant.id
            );

            if (allowed) {
                authorizedTenants.push(tenant);
            }
        }

        return res.status(200).json({
            success: true,
            data: authorizedTenants
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const switchTenantController = async (req, res) => {
    try {
        const { tenantId } = req.body || {};

        if (!tenantId || typeof tenantId !== "string") {
            return res.status(400).json({
                success: false,
                code: "TENANT_ID_REQUIRED",
                message: "A valid tenantId is required."
            });
        }

        const tenant = await switchTenant(tenantId);

        if (!tenant) {
            return res.status(404).json({
                success: false,
                code: "TENANT_NOT_FOUND",
                message: "Tenant not found."
            });
        }

        // Never issue a tenant token without checking membership.
        const allowed = await userCanAccessTenant(
            req.user.userId,
            tenant.id
        );

        if (!allowed) {
            return res.status(403).json({
                success: false,
                code: "TENANT_ACCESS_DENIED",
                message: "You are not authorized to access this tenant."
            });
        }

        const token = generateToken({
            userId: req.user.userId,
            email: req.user.email,
            tenantId: tenant.id
        });

        return res.status(200).json({
            success: true,
            message: "Tenant switched successfully",
            data: tenant,
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllTenants,
    switchTenantController
};