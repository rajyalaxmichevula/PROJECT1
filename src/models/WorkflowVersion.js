
const mongoose = require("mongoose");

const workflowVersionSchema = new mongoose.Schema(
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

        version: {
            type: Number,
            required: true,
            min: 1
        },

        nodes: {
            type: [mongoose.Schema.Types.Mixed],
            default: []
        },

        edges: {
            type: [mongoose.Schema.Types.Mixed],
            default: []
        },

        variables: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        validation: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

workflowVersionSchema.index(
    { tenantId: 1, workflowId: 1, version: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "WorkflowVersion",
    workflowVersionSchema
);