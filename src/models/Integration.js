
const mongoose = require("mongoose");

const integrationSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        provider: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        status: {
            type: String,
            enum: ["CONNECTED", "DISCONNECTED", "ERROR"],
            default: "DISCONNECTED"
        },

        config: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        credentialReference: {
            type: String,
            default: null
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        lastConnectedAt: {
            type: Date,
            default: null
        },

        lastError: {
            type: String,
            default: null,
            maxlength: 2000
        }
    },
    { timestamps: true }
);

integrationSchema.index({
    tenantId: 1,
    provider: 1,
    status: 1
});

module.exports = mongoose.model("Integration", integrationSchema);