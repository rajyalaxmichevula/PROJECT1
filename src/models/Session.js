
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        tokenHash: {
            type: String,
            required: true,
            unique: true,
            select: false
        },

        status: {
            type: String,
            enum: ["ACTIVE", "REVOKED", "EXPIRED"],
            default: "ACTIVE"
        },

        ipAddress: {
            type: String,
            default: null
        },

        userAgent: {
            type: String,
            default: null,
            maxlength: 1000
        },

        expiresAt: {
            type: Date,
            required: true
        },

        lastActivityAt: {
            type: Date,
            default: Date.now
        },

        revokedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

sessionSchema.index({ userId: 1, status: 1, createdAt: -1 });
sessionSchema.index({ expiresAt: 1 });

module.exports = mongoose.model("Session", sessionSchema);