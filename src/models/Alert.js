
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
            index: true
        },

        type: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        message: {
            type: String,
            required: true,
            maxlength: 5000
        },

        severity: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
            default: "MEDIUM"
        },

        status: {
            type: String,
            enum: ["OPEN", "ACKNOWLEDGED", "RESOLVED"],
            default: "OPEN"
        },

        source: {
            type: String,
            default: null
        },

        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        acknowledgedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        acknowledgedAt: {
            type: Date,
            default: null
        },

        resolvedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

alertSchema.index({
    tenantId: 1,
    status: 1,
    severity: 1,
    createdAt: -1
});

module.exports = mongoose.model("Alert", alertSchema);