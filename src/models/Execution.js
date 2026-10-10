
const mongoose = require("mongoose");

const executionSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
            index: true
        },

        workflowId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workflow",
            required: true
        },

        workflowVersionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkflowVersion",
            required: true
        },

        triggeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        triggerType: {
            type: String,
            enum: ["MANUAL", "SCHEDULED", "WEBHOOK", "API"],
            default: "MANUAL"
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "RUNNING",
                "COMPLETED",
                "FAILED",
                "CANCELLED",
                "RETRYING",
                "COMPENSATING",
                "COMPENSATED"
            ],
            default: "PENDING",
            index: true
        },

        input: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        output: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        currentNodeId: {
            type: String,
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

        error: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        retryCount: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

executionSchema.index({
    tenantId: 1,
    workflowId: 1,
    status: 1,
    createdAt: -1
});

executionSchema.index({
    tenantId: 1,
    startedAt: -1
});

module.exports = mongoose.model("Execution", executionSchema);