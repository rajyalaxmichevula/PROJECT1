
const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema(
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
            minlength: 2,
            maxlength: 100
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },

        status: {
            type: String,
            enum: ["Draft", "Active", "Inactive"],
            default: "Draft"
        },

        activeVersionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkflowVersion",
            default: null
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

workflowSchema.index({
    tenantId: 1,
    status: 1,
    createdAt: -1
});

module.exports = mongoose.model("Workflow", workflowSchema);