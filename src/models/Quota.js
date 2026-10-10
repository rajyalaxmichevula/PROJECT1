
const mongoose = require("mongoose");

const quotaSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true,
            unique: true
        },

        plan: {
            type: String,
            enum: ["FREE", "STARTER", "PRO", "ENTERPRISE"],
            default: "FREE"
        },

        maxWorkflows: {
            type: Number,
            min: 0,
            default: 10
        },

        maxExecutionsPerMonth: {
            type: Number,
            min: 0,
            default: 1000
        },

        maxMembers: {
            type: Number,
            min: 0,
            default: 5
        },

        workflowCount: {
            type: Number,
            min: 0,
            default: 0
        },

        executionsThisMonth: {
            type: Number,
            min: 0,
            default: 0
        },

        memberCount: {
            type: Number,
            min: 0,
            default: 0
        },

        periodStartedAt: {
            type: Date,
            default: Date.now
        },

        periodEndsAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Quota", quotaSchema);