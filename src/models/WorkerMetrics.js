
const mongoose = require("mongoose");

const workerMetricsSchema = new mongoose.Schema(
    {
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        workerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Worker",
            required: true
        },

        cpuUsage: {
            type: Number,
            min: 0,
            max: 100,
            default: null
        },

        memoryUsage: {
            type: Number,
            min: 0,
            default: null
        },

        activeJobs: {
            type: Number,
            min: 0,
            default: 0
        },

        completedJobs: {
            type: Number,
            min: 0,
            default: 0
        },

        failedJobs: {
            type: Number,
            min: 0,
            default: 0
        },

        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

workerMetricsSchema.index({
    tenantId: 1,
    workerId: 1,
    timestamp: -1
});

module.exports = mongoose.model("WorkerMetrics", workerMetricsSchema);