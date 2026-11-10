
import React, { useState } from "react";
import {
    AlertCircle,
} from "lucide-react";
import { useAlerts } from "../../Context/AlertContext";

const tabs = ["Overview", "Conditions", "Notifications", "History"];

const severityStyles = {
    Critical: "bg-red-50 text-red-600",
    High: "bg-orange-50 text-orange-600",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-blue-50 text-blue-600",
};

const AlertBadge = ({ value, type }) => {

    const styles = type === "severity"
        ? severityStyles[value]
        : value === "Active"
            ? "bg-red-50 text-red-600"
            : "bg-emerald-50 text-emerald-600";

    return (
        <span className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${styles}`}>
            {value}
        </span>
    );
};

const DetailRow = ({ label, value }) => {

    return (
        <div className="grid grid-cols-[minmax(105px,0.8fr)_minmax(0,1.5fr)] items-start gap-2">

            <span className="pt-0.5 text-xs text-slate-500">
                {label}
            </span>

            <div className="min-w-0 text-xs font-medium text-slate-800">
                {value}
            </div>

        </div>
    );
};

const AlertDetails = ({ onEdit }) => {

    const { selectedAlert } = useAlerts();

    const [activeTab, setActiveTab] = useState("Overview");

    if (!selectedAlert) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                Select an alert to view details.
            </div>
        );
    }

    const alert = selectedAlert;

    return (

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">

                <h2 className="text-sm font-semibold text-slate-800">
                    Alert Details
                </h2>

                <button
                    onClick={() => onEdit(alert)}
                    className="rounded-md bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                >
                    Edit
                </button>

            </div>

            {/* Alert Information */}
            <div className="flex items-start gap-3 border-b border-slate-100 p-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">

                    <AlertCircle className="h-7 w-7 fill-red-500 text-white" />

                </div>

                <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-sm font-semibold text-slate-900">
                            {alert.name}
                        </h3>

                        <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-600">

                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                            {alert.status}

                        </span>

                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {alert.description}
                    </p>

                </div>

            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-100 px-2">

                {tabs.map((tab) => (

                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`shrink-0 border-b-2 px-3 py-3 text-xs font-medium transition ${activeTab === tab
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                    >
                        {tab}
                    </button>

                ))}

            </div>

            {/* Tab Content */}
            <div className="min-h-[260px] p-4">

                {/* Overview */}
                {activeTab === "Overview" && (

                    <div className="space-y-3">

                        <DetailRow
                            label="Severity"
                            value={
                                <AlertBadge
                                    value={alert.severity}
                                    type="severity"
                                />
                            }
                        />

                        <DetailRow
                            label="Category"
                            value={alert.category}
                        />

                        <DetailRow
                            label="Created At"
                            value={alert.createdAt}
                        />

                        <DetailRow
                            label="Last Triggered"
                            value={alert.lastTriggered}
                        />

                        <DetailRow
                            label="Triggered Count"
                            value={`${alert.triggeredCount} times`}
                        />

                        <DetailRow
                            label="Description"
                            value={
                                <p className="max-w-[220px] text-xs leading-5 text-slate-500">
                                    {alert.description}
                                </p>
                            }
                        />

                        <DetailRow
                            label="Affected Resources"
                            value={
                                <div className="flex flex-wrap gap-2">

                                    {alert.resources.map((resource) => (
                                        <span
                                            key={resource}
                                            className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600"
                                        >
                                            {resource}
                                        </span>
                                    ))}

                                </div>
                            }
                        />

                        <DetailRow
                            label="Tags"
                            value={
                                <div className="flex flex-wrap gap-2">

                                    {alert.tags.map((tag, index) => (

                                        <span
                                            key={tag}
                                            className={`rounded-md px-2 py-1 text-[10px] font-medium ${index % 3 === 0
                                                    ? "bg-blue-50 text-blue-600"
                                                    : index % 3 === 1
                                                        ? "bg-purple-50 text-purple-600"
                                                        : "bg-emerald-50 text-emerald-600"
                                                }`}
                                        >
                                            {tag}
                                        </span>

                                    ))}

                                </div>
                            }
                        />

                    </div>
                )}

                {/* Conditions */}
                {activeTab === "Conditions" && (

                    <div className="space-y-4">

                        <div className="rounded-lg bg-slate-50 p-3">

                            <p className="text-xs font-semibold text-slate-700">
                                Trigger Condition
                            </p>

                            <p className="mt-2 text-xs text-slate-500">
                                When {alert.name.toLowerCase()} exceeds the configured threshold.
                            </p>

                        </div>

                        <DetailRow label="Evaluation" value="Continuous monitoring" />
                        <DetailRow label="Duration" value="5 minutes" />
                        <DetailRow label="Operator" value="Greater than" />
                        <DetailRow label="Threshold" value="90%" />

                    </div>
                )}

                {/* Notifications */}
                {activeTab === "Notifications" && (

                    <div className="space-y-3">

                        <DetailRow label="Email Notifications" value="Enabled" />
                        <DetailRow label="In-app Notifications" value="Enabled" />
                        <DetailRow label="Slack Notifications" value="Enabled" />
                        <DetailRow label="Notification Channel" value="#system-alerts" />
                        <DetailRow label="Escalation" value="After 10 minutes" />

                    </div>
                )}

                {/* History */}
                {activeTab === "History" && (

                    <div className="space-y-4">

                        {[1, 2, 3].map((item) => (

                            <div key={item} className="flex gap-3">

                                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

                                <div>

                                    <p className="text-xs font-medium text-slate-700">
                                        {item === 1
                                            ? "Alert triggered"
                                            : item === 2
                                                ? "Notification sent"
                                                : "Condition evaluated"}
                                    </p>

                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Oct 7, 2025, 10:2{item} AM
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
};

export default AlertDetails;
