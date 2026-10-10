
const mongoose = require("mongoose");

const organizationSettingsSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
            unique: true
        },

        timezone: {
            type: String,
            default: "UTC"
        },

        dateFormat: {
            type: String,
            default: "YYYY-MM-DD"
        },

        defaultWorkflowStatus: {
            type: String,
            enum: ["Draft", "Active", "Inactive"],
            default: "Draft"
        },

        executionLogRetentionDays: {
            type: Number,
            min: 1,
            default: 30
        },

        allowMemberInvitations: {
            type: Boolean,
            default: true
        },

        settings: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "OrganizationSettings",
    organizationSettingsSchema
);