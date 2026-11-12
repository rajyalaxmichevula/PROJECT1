
import React from "react";
import { useAlerts } from "../../Context/AlertContext";

const severityConfig = [
    {
        name: "Critical",
        color: "#ef4444",
        dot: "bg-red-500",
    },
    {
        name: "High",
        color: "#fb923c",
        dot: "bg-orange-400",
    },
    {
        name: "Medium",
        color: "#fbbf24",
        dot: "bg-amber-400",
    },
    {
        name: "Low",
        color: "#3b82f6",
        dot: "bg-blue-500",
    },
];

const categoryConfig = [
    {
        name: "Infrastructure",
        color: "#3b82f6",
    },
    {
        name: "Application",
        color: "#a855f7",
    },
    {
        name: "Business",
        color: "#10b981",
    },
    {
        name: "Notification",
        color: "#fbbf24",
    },
    {
        name: "Performance",
        color: "#f43f5e",
    },
];

const AlertAnalytics = () => {

    const { alerts } = useAlerts();

    // Total alerts
    const totalAlerts = alerts.length;

    // Calculate severity counts
    const severityData = severityConfig.map((item) => {

        const count = alerts.filter(
            (alert) => alert.severity === item.name
        ).length;

        const percentage = totalAlerts
            ? Math.round((count / totalAlerts) * 100)
            : 0;

        return {
            ...item,
            count,
            percentage,
        };
    });

    // Calculate category counts
    const categoryData = categoryConfig.map((item) => {

        const count = alerts.filter(
            (alert) => alert.category === item.name
        ).length;

        return {
            ...item,
            count,
        };
    });

    // Maximum category count for bar width
    const maxCategoryCount = Math.max(
        ...categoryData.map((item) => item.count),
        1
    );

    // Donut chart gradient
    let currentPercentage = 0;

    const donutGradient = severityData.map((item) => {

        const start = currentPercentage;

        currentPercentage += item.percentage;

        return `${item.color} ${start}% ${currentPercentage}%`;

    }).join(", ");

    return (

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

            {/* Alerts By Severity */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                    Alerts by Severity
                </h3>

                <div className="flex flex-wrap items-center justify-around gap-5">

                    {/* Donut Chart */}
                    <div
                        className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
                        style={{
                            background: totalAlerts
                                ? `conic-gradient(${donutGradient})`
                                : "#e2e8f0",
                        }}
                    >

                        {/* Inner Circle */}
                        <div className="flex h-[72%] w-[72%] flex-col items-center justify-center rounded-full bg-white">

                            <span className="text-xl font-bold text-slate-800">
                                {totalAlerts}
                            </span>

                            <span className="text-[11px] text-slate-500">
                                Total
                            </span>

                        </div>

                    </div>

                    {/* Severity Legend */}
                    <div className="min-w-31.25 flex-1 space-y-3">

                        {severityData.map((item) => (

                            <div
                                key={item.name}
                                className="flex items-center justify-between gap-3"
                            >

                                <div className="flex items-center gap-2">

                                    <span
                                        className={`h-3 w-3 shrink-0 rounded-full ${item.dot}`}
                                    />

                                    <span className="text-xs text-slate-700">
                                        {item.name}
                                    </span>

                                </div>

                                <span className="whitespace-nowrap text-xs font-medium text-slate-500">
                                    {item.count} ({item.percentage}%)
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* Alerts By Category */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                    Alerts by Category
                </h3>

                <div className="space-y-3.5">

                    {categoryData.map((item) => (

                        <div
                            key={item.name}
                            className="grid grid-cols-[72px_minmax(0,1fr)_22px] items-center gap-2"
                        >

                            {/* Category Name */}
                            <span className="truncate text-[11px] text-slate-600">
                                {item.name}
                            </span>

                            {/* Progress Bar */}
                            <div className="h-4 overflow-hidden rounded-sm bg-slate-100">

                                <div
                                    className="h-full rounded-sm transition-all duration-500"
                                    style={{
                                        width: `${(item.count / maxCategoryCount) * 100}%`,
                                        backgroundColor: item.color,
                                        minWidth: item.count > 0 ? "4px" : "0",
                                    }}
                                />

                            </div>

                            {/* Count */}
                            <span className="text-right text-[11px] font-medium text-slate-500">
                                {item.count}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
};

export default AlertAnalytics;
