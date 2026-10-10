
const mongoose = require("mongoose");

const executionLogSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        executionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Execution",
            required: true
        },

        nodeExecutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "NodeExecution",
            default: null
        },

        workflowId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workflow",
            required: true
        },

        level: {
            type: String,
            enum: ["DEBUG", "INFO", "WARN", "ERROR"],
            default: "INFO"
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        timestamp: {
            type: Date,
            default: Date.now,
            index: true
        }
    },
    {
        timestamps: true
    }
);

executionLogSchema.index({
    tenantId: 1,
    executionId: 1,
    timestamp: -1
});

executionLogSchema.index({
    tenantId: 1,
    level: 1,
    timestamp: -1
});

module.exports = mongoose.model("ExecutionLog", executionLogSchema);