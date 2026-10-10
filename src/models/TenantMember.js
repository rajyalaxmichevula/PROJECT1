
const mongoose = require("mongoose");

const tenantMemberSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        role: {
            type: String,
            enum: ["OWNER", "ADMIN", "MEMBER", "VIEWER"],
            default: "MEMBER"
        },

        status: {
            type: String,
            enum: ["ACTIVE", "INVITED", "SUSPENDED", "REMOVED"],
            default: "INVITED"
        },

        joinedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

tenantMemberSchema.index(
    { tenantId: 1, userId: 1 },
    { unique: true }
);

tenantMemberSchema.index({ userId: 1, tenantId: 1 });

module.exports = mongoose.model(
    "TenantMember",
    tenantMemberSchema
);