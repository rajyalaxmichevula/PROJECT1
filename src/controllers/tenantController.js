
const jwt = require("jsonwebtoken");

const {
    getTenants,
    switchTenant
} = require("../services/tenantService");

const {
    generateToken
} = require("../services/authService");

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

        if (!tenantId) {
            return res.status(400).json({
                success: false,
                message: "tenantId is required"
            });
        }

        const tenant = await switchTenant(tenantId);

        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: "Tenant not found"
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
