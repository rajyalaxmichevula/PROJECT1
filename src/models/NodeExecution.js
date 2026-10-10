
const mongoose = require("mongoose");

const nodeExecutionSchema = new mongoose.Schema(
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

        workflowId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workflow",
            required: true
        },

        nodeId: {
            type: String,
            required: true
        },

        nodeType: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "RUNNING",
                "COMPLETED",
                "FAILED",
                "SKIPPED",
                "RETRYING",
                "COMPENSATING",
                "COMPENSATED"
            ],
            default: "PENDING"
        },

        attempt: {
            type: Number,
            default: 1,
            min: 1
        },

        input: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        output: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        error: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        startedAt: {
            type: Date,
            default: null
        },

        completedAt: {
            type: Date,
            default: null
        },

        durationMs: {
            type: Number,
            default: null,
            min: 0
        },

        workerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Worker",
            default: null
        },

        retryAt: {
            type: Date,
            default: null
        },

        compensationStatus: {
            type: String,
            enum: [
                "NOT_REQUIRED",
                "PENDING",
                "RUNNING",
                "COMPLETED",
                "FAILED"
            ],
            default: "NOT_REQUIRED"
        }
    },
    {
        timestamps: true
    }
);

nodeExecutionSchema.index({
    tenantId: 1,
    executionId: 1,
    nodeId: 1
});

nodeExecutionSchema.index({
    tenantId: 1,
    status: 1,
    createdAt: -1
});

module.exports = mongoose.model(
    "NodeExecution",
    nodeExecutionSchema
);