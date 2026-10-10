
const mongoose = require("mongoose");

const workflowTemplateSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            default: null,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 1000
        },

        category: {
            type: String,
            default: "General",
            trim: true,
            maxlength: 100
        },

        visibility: {
            type: String,
            enum: ["PRIVATE", "TENANT", "PUBLIC"],
            default: "PRIVATE"
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

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

workflowTemplateSchema.index({
    tenantId: 1,
    category: 1,
    createdAt: -1
});

module.exports = mongoose.model(
    "WorkflowTemplate",
    workflowTemplateSchema
);