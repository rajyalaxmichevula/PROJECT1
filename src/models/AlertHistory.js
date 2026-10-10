
const mongoose = require("mongoose");

const alertHistorySchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        alertId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Alert",
            required: true
        },

        action: {
            type: String,
            enum: [
                "CREATED",
                "ACKNOWLEDGED",
                "RESOLVED",
                "REOPENED",
                "UPDATED"
            ],
            required: true
        },

        previousStatus: {
            type: String,
            default: null
        },

        newStatus: {
            type: String,
            default: null
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        details: {
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

alertHistorySchema.index({
    tenantId: 1,
    alertId: 1,
    timestamp: -1
});

module.exports = mongoose.model("AlertHistory", alertHistorySchema);