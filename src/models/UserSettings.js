
const mongoose = require("mongoose");

const userSettingsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        theme: {
            type: String,
            enum: ["LIGHT", "DARK", "SYSTEM"],
            default: "SYSTEM"
        },

        language: {
            type: String,
            default: "en"
        },

        timezone: {
            type: String,
            default: "UTC"
        },

        emailNotifications: {
            type: Boolean,
            default: true
        },

        inAppNotifications: {
            type: Boolean,
            default: true
        },

        settings: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserSettings", userSettingsSchema);