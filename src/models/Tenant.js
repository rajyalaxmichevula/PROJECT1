
const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        domain: {
            type: String,
            trim: true,
            lowercase: true,
            default: null
        },

        status: {
            type: String,
            enum: ["ACTIVE", "SUSPENDED", "DELETED"],
            default: "ACTIVE"
        },

        plan: {
            type: String,
            enum: ["FREE", "STARTER", "PRO", "ENTERPRISE"],
            default: "FREE"
        },

        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        quotas: {
            maxWorkflows: {
                type: Number,
                default: 10,
                min: 0
            },
            maxExecutionsPerMonth: {
                type: Number,
                default: 1000,
                min: 0
            },
            maxMembers: {
                type: Number,
                default: 5,
                min: 1
            }
        },

        usage: {
            workflowCount: {
                type: Number,
                default: 0,
                min: 0
            },
            executionsThisMonth: {
                type: Number,
                default: 0,
                min: 0
            },
            memberCount: {
                type: Number,
                default: 1,
                min: 0
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Tenant", tenantSchema);