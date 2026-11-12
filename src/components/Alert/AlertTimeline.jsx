
import React from "react";
import { Activity, Clock3 } from "lucide-react";

const triggered = [3, 4.5, 5.2, 4.6, 3.7, 4.7, 6.5, 5.3, 6.4, 6.7, 7.3, 8.5, 7.9, 5.5, 4.6, 4.4, 6.2];

const resolved = [1.2, 1.8, 0.7, 1.4, 1.0, 2.9, 1.8, 2.6, 2.9, 2.1, 1.7, 2.6, 1.8, 3.3, 2.2, 2.8, 3.2];

const chart = {
    left: 38,
    right: 490,
    top: 20,
    bottom: 205,
};

const getPoints = (data) =>
    data.map((value, index) => ({
        x: chart.left + (index / (data.length - 1)) *
            (chart.right - chart.left),
        y: chart.bottom - (value / 10) *
            (chart.bottom - chart.top),
    }));

const createLine = (points) =>
    points.map((p, i) =>
        `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
    ).join(" ");

const createArea = (points) =>
    `${createLine(points)} L ${chart.right} ${chart.bottom} L ${chart.left} ${chart.bottom} Z`;

const AlertTimeline = () => {
    const redPoints = getPoints(triggered);
    const greenPoints = getPoints(resolved);

    const timeLabels = [
        "12 AM",
        "4 AM",
        "8 AM",
        "12 PM",
        "4 PM",
        "8 PM",
    ];

    return (
        <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-slate-100 p-4">

                <div className="flex items-center justify-between gap-2">

                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Activity size={19} />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-slate-800">
                                Alert Timeline
                            </h2>
                            <p className="text-[11px] text-slate-500">
                                Last 24 Hours
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Clock3 size={13} />
                        <span>24h</span>
                    </div>

                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-4">

                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-[11px] font-medium text-slate-600">
                            Triggered
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-medium text-slate-600">
                            Resolved
                        </span>
                    </div>

                </div>

            </div>

            {/* Chart */}
            <div className="overflow-x-auto p-3">

                <svg
                    viewBox="0 0 520 260"
                    className="block h-auto w-full min-w-[360px]"
                    role="img"
                    aria-label="Triggered and resolved alerts over 24 hours"
                >

                    <defs>
                        <linearGradient id="timelineRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.01" />
                        </linearGradient>

                        <linearGradient id="timelineGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                        </linearGradient>
                    </defs>

                    {/* Horizontal Grid */}
                    {[0, 2, 4, 6, 8, 10].map((value) => {
                        const y =
                            chart.bottom - (value / 10) *
                            (chart.bottom - chart.top);

                        return (
                            <g key={value}>
                                <line
                                    x1={chart.left}
                                    y1={y}
                                    x2={chart.right}
                                    y2={y}
                                    stroke="#e2e8f0"
                                    strokeDasharray="3 3"
                                />

                                <text
                                    x="28"
                                    y={y + 3.5}
                                    textAnchor="end"
                                    fontSize="10"
                                    fill="#94a3b8"
                                >
                                    {value}
                                </text>
                            </g>
                        );
                    })}

                    {/* Vertical Grid */}
                    {timeLabels.map((label, index) => {
                        const x =
                            chart.left + (index / 5) *
                            (chart.right - chart.left);

                        return (
                            <g key={label}>
                                <line
                                    x1={x}
                                    y1={chart.top}
                                    x2={x}
                                    y2={chart.bottom}
                                    stroke="#f1f5f9"
                                />

                                <text
                                    x={x}
                                    y="228"
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#94a3b8"
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Area */}
                    <path d={createArea(redPoints)} fill="url(#timelineRed)" />
                    <path d={createArea(greenPoints)} fill="url(#timelineGreen)" />

                    {/* Lines */}
                    <path
                        d={createLine(redPoints)}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d={createLine(greenPoints)}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Red Points */}
                    {redPoints.map((point, index) => (
                        <circle
                            key={`red-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="2.8"
                            fill="#ef4444"
                            stroke="white"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Green Points */}
                    {greenPoints.map((point, index) => (
                        <circle
                            key={`green-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="2.8"
                            fill="#10b981"
                            stroke="white"
                            strokeWidth="1"
                        />
                    ))}

                </svg>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">

                <span className="text-[11px] text-slate-500">
                    Alert activity
                </span>

                <span className="text-[11px] font-medium text-slate-600">
                    Last 24 hours
                </span>

            </div>

        </div>
    );
};

export default AlertTimeline;
