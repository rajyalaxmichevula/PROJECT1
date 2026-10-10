
const mongoose = require("mongoose");

const executionMetricsSchema = new mongoose.Schema(
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

        nodeType: {
            type: String,
            default: null
        },

        durationMs: {
            type: Number,
            min: 0,
            required: true
        },

        cpuUsage: {
            type: Number,
            min: 0,
            max: 100,
            default: null
        },

        memoryUsage: {
            type: Number,
            min: 0,
            default: null
        },

        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

executionMetricsSchema.index({
    tenantId: 1,
    executionId: 1,
    timestamp: -1
});

executionMetricsSchema.index({
    tenantId: 1,
    nodeType: 1,
    timestamp: -1
});

module.exports = mongoose.model(
    "ExecutionMetrics",
    executionMetricsSchema
);