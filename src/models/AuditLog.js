
const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            default: null
        },

        actorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        action: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        resourceType: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        outcome: {
            type: String,
            enum: ["SUCCESS", "FAILURE"],
            default: "SUCCESS"
        },

        ipAddress: {
            type: String,
            default: null
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

auditLogSchema.index({
    tenantId: 1,
    timestamp: -1
});

auditLogSchema.index({
    actorId: 1,
    timestamp: -1
});

module.exports = mongoose.model("AuditLog", auditLogSchema);