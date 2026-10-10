
const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
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

        keyHash: {
            type: String,
            required: true,
            select: false
        },

        keyPrefix: {
            type: String,
            required: true,
            maxlength: 20
        },

        scopes: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: ["ACTIVE", "REVOKED", "EXPIRED"],
            default: "ACTIVE"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        expiresAt: {
            type: Date,
            default: null
        },

        lastUsedAt: {
            type: Date,
            default: null
        },

        revokedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

apiKeySchema.index({ tenantId: 1, status: 1, createdAt: -1 });
apiKeySchema.index({ keyHash: 1 }, { unique: true });

module.exports = mongoose.model("ApiKey", apiKeySchema);