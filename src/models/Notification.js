
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
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

        type: {
            type: String,
            enum: [
                "WORKFLOW",
                "EXECUTION",
                "ALERT",
                "SYSTEM",
                "INVITATION"
            ],
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        message: {
            type: String,
            required: true,
            maxlength: 3000
        },

        read: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date,
            default: null
        },

        resourceType: {
            type: String,
            default: null
        },

        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    { timestamps: true }
);

notificationSchema.index({
    tenantId: 1,
    userId: 1,
    read: 1,
    createdAt: -1
});

module.exports = mongoose.model("Notification", notificationSchema);