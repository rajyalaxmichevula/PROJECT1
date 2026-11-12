
import React, { useState } from "react";
import {
    Eye,
    Pencil,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { useAlerts } from "../../Context/AlertContext";

const ITEMS_PER_PAGE = 10;

// Severity styles
const severityStyles = {
    Critical: "bg-red-50 text-red-600",
    High: "bg-orange-50 text-orange-600",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-blue-50 text-blue-600",
};

// Status styles
const statusStyles = {
    Active: "bg-red-50 text-red-600",
    Resolved: "bg-emerald-50 text-emerald-600",
};

// Reusable Badge
const AlertBadge = ({ value, type }) => {

    const styles =
        type === "severity"
            ? severityStyles[value]
            : statusStyles[value];

    return (
        <span
            className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium ${styles || "bg-slate-100 text-slate-600"}`}
        >
            {value}
        </span>
    );
};

const AlertTable = ({ onEdit }) => {

    const {
        alerts,
        selectedAlert,
        selectAlert,
        resolveAlert,
    } = useAlerts();

    const [currentPage, setCurrentPage] = useState(1);
    const [openMenu, setOpenMenu] = useState(null);

    // Pagination
    const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);

    const displayedAlerts = alerts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Select alert
    const handleSelect = (alert) => {
        selectAlert(alert);
    };

    // View alert
    const handleView = (e, alert) => {
        e.stopPropagation();

        selectAlert(alert);
        setOpenMenu(null);
    };

    // Edit alert
    const handleEdit = (e, alert) => {
        e.stopPropagation();

        selectAlert(alert);
        setOpenMenu(null);

        if (onEdit) {
            onEdit(alert);
        }
    };

    // Resolve alert
    const handleResolve = (alert) => {
        resolveAlert(alert.id);
        setOpenMenu(null);
    };

    // Pagination navigation
    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setOpenMenu(null);
        }
    };

    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(
        currentPage * ITEMS_PER_PAGE,
        alerts.length
    );

    return (

        <section className="min-w-0 h-140 overflow-hidden relative rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">

                <h2 className="text-sm font-semibold text-slate-800">
                    All Alerts ({alerts.length})
                </h2>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-175 border-collapse text-left">

                    {/* Table Header */}
                    <thead>

                        <tr className="border-y border-slate-100 bg-slate-50 text-[11px] font-medium text-slate-500">

                            <th className="w-10 px-3 py-2">
                                #
                            </th>

                            <th className="px-3 py-2">
                                Alert Name
                            </th>

                            <th className="px-3 py-2">
                                Severity
                            </th>

                            <th className="px-3 py-2">
                                Category
                            </th>

                            <th className="px-3 py-2">
                                Status
                            </th>

                            <th className="px-3 py-2">
                                Triggered At
                            </th>

                            <th className="px-3 py-2 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    {/* Table Body */}
                    <tbody>

                        {displayedAlerts.length > 0 ? (

                            displayedAlerts.map((alert, index) => (

                                <tr
                                    key={alert.id}
                                    onClick={() => handleSelect(alert)}
                                    className={`cursor-pointer border-b border-slate-100 text-[11px] transition-colors hover:bg-blue-50/60 ${selectedAlert?.id === alert.id
                                        ? "bg-blue-50/70"
                                        : "bg-white"
                                        }`}
                                >

                                    {/* Index */}
                                    <td className="px-3 py-2 text-slate-500">
                                        {startItem + index}
                                    </td>

                                    {/* Alert Name */}
                                    <td className="whitespace-nowrap px-3 py-2 font-medium text-slate-800">
                                        {alert.name}
                                    </td>

                                    {/* Severity */}
                                    <td className="px-3 py-2">
                                        <AlertBadge
                                            value={alert.severity}
                                            type="severity"
                                        />
                                    </td>

                                    {/* Category */}
                                    <td className="whitespace-nowrap px-3 py-2 text-slate-600">
                                        {alert.category}
                                    </td>

                                    {/* Status */}
                                    <td className="px-3 py-2">
                                        <AlertBadge
                                            value={alert.status}
                                            type="status"
                                        />
                                    </td>

                                    {/* Triggered At */}
                                    <td className="whitespace-nowrap px-3 py-2 text-slate-500">
                                        {alert.triggeredAt}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-3 py-2">

                                        <div className="flex items-center justify-center gap-3">

                                            {/* View */}
                                            <button
                                                title="View Alert"
                                                onClick={(e) =>
                                                    handleView(e, alert)
                                                }
                                                className="text-slate-500 transition hover:text-blue-600"
                                            >
                                                <Eye size={15} />
                                            </button>

                                            {/* Edit */}
                                            <button
                                                title="Edit Alert"
                                                onClick={(e) =>
                                                    handleEdit(e, alert)
                                                }
                                                className="text-slate-500 transition hover:text-blue-600"
                                            >
                                                <Pencil size={14} />
                                            </button>

                                            {/* More Actions */}
                                            <div className="relative">

                                                <button
                                                    title="More Actions"
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        setOpenMenu(
                                                            openMenu === alert.id
                                                                ? null
                                                                : alert.id
                                                        );
                                                    }}
                                                    className="text-slate-500 transition hover:text-slate-900"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                {openMenu === alert.id && (

                                                    <div className="absolute right-0 top-6 z-30 w-36 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleResolve(alert);
                                                            }}
                                                            disabled={alert.status === "Resolved"}
                                                            className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            Mark Resolved
                                                        </button>

                                                        <button
                                                            onClick={(e) =>
                                                                handleEdit(e, alert)
                                                            }
                                                            className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
                                                        >
                                                            Edit Alert
                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-10 text-center text-sm text-slate-400"
                                >
                                    No alerts found.
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 absolute bottom-0 w-full ">

                <p className="text-xs text-slate-500">
                    {alerts.length > 0
                        ? `Showing ${startItem} to ${endItem} of ${alerts.length} alerts`
                        : "Showing 0 alerts"}
                </p>

                <div className="flex items-center gap-1.5">

                    {/* Previous */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => changePage(currentPage - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft size={15} />
                    </button>

                    {/* Page Numbers */}
                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (

                        <button
                            key={page}
                            onClick={() => changePage(page)}
                            className={`h-8 w-8 rounded-md text-xs font-medium transition ${currentPage === page
                                ? "bg-blue-600 text-white"
                                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            {page}
                        </button>

                    ))}

                    {/* Next */}
                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => changePage(currentPage + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight size={15} />
                    </button>

                </div>

            </div>

        </section>
    );
};

export default AlertTable;
