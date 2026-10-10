
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        status: {
            type: String,
            enum: ["ONLINE", "BUSY", "OFFLINE", "UNHEALTHY"],
            default: "OFFLINE"
        },

        capabilities: {
            type: [String],
            default: []
        },

        lastHeartbeatAt: {
            type: Date,
            default: null
        },

        currentExecutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Execution",
            default: null
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

workerSchema.index({
    tenantId: 1,
    status: 1,
    lastHeartbeatAt: -1
});

module.exports = mongoose.model("Worker", workerSchema);