import React from 'react'
import { PackageCheck, PackageX } from 'lucide-react'

const ExecutionFlowCanvas = ({
    activeTab,
    zoom,
    nodes,
    colors,
    ExecutionNode,
}) => {
    return (
        <div className="w-full min-w-0 ">
            {activeTab === 'flow' ? (
                /* Execution Flow */
                <div className="w-full overflow-scroll md:overflow-hidden scrollbar-thumb-transparent ">
                    <div className="flex w-150 justify-center">
                        <div
                            className="relative h-115 w-200 shrink-0 origin-top transition-transform duration-200"
                            style={{
                                transform: `scale(${zoom / 100})`,
                                marginBottom: `${540 * (zoom / 100) - 540}px`,
                            }}
                        >
                            {/* Connector Lines */}
                            <svg
                                className="pointer-events-none absolute inset-0 h-full w-full"
                                viewBox="0 0 800 540"
                                fill="none"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <defs>
                                    <marker
                                        id="flowArrow"
                                        markerWidth="7"
                                        markerHeight="7"
                                        refX="5"
                                        refY="3"
                                        orient="auto"
                                    >
                                        <path
                                            d="M0,0 L6,3 L0,6 Z"
                                            fill="#334155"
                                        />
                                    </marker>
                                </defs>

                                {/* Trigger to Validation */}
                                <path
                                    d="M400 124 V152"
                                    stroke="#334155"
                                    strokeWidth="1.6"
                                    markerEnd="url(#flowArrow)"
                                />

                                {/* Validation to Inventory */}
                                <path
                                    d="M400 236 V266"
                                    stroke="#334155"
                                    strokeWidth="1.6"
                                    markerEnd="url(#flowArrow)"
                                />

                                {/* Inventory to Payment */}
                                <path
                                    d="M264 300 H225 V425"
                                    stroke="#64748b"
                                    strokeWidth="1.6"
                                    strokeLinejoin="round"
                                    markerEnd="url(#flowArrow)"
                                />

                                {/* Inventory to Notification */}
                                <path
                                    d="M536 300 H580 V425"
                                    stroke="#64748b"
                                    strokeWidth="1.6"
                                    strokeLinejoin="round"
                                    markerEnd="url(#flowArrow)"
                                />
                            </svg>

                            {/* Trigger */}
                            <div className="absolute left-1/2 top-9 -translate-x-1/2">
                                <ExecutionNode
                                    node={nodes[0]}
                                    colors={colors}
                                />
                            </div>

                            {/* Validate Order */}
                            <div className="absolute left-1/2 top-32.75 -translate-x-1/2">
                                <ExecutionNode
                                    node={nodes[1]}
                                    colors={colors}
                                />
                            </div>

                            {/* Inventory */}
                            <div className="absolute left-1/2 top-57.25 z-10 -translate-x-1/2">
                                <ExecutionNode
                                    node={nodes[2]}
                                    colors={colors}
                                />
                            </div>

                            {/* In Stock Condition */}
                            <div className="absolute left-50.5 top-76.25 flex h-8.5 items-center gap-2 rounded-full bg-emerald-50 px-4 text-xs font-medium text-emerald-700">
                                <PackageCheck size={15} />
                                <span>In Stock</span>
                            </div>

                            {/* Out of Stock Condition */}
                            <div className="absolute right-50.5 top-76.25 flex h-8.5 items-center gap-2 rounded-full bg-red-50 px-4 text-xs font-medium text-red-600">
                                <PackageX size={15} />
                                <span>Out of Stock</span>
                            </div>

                            {/* Payment */}
                            <div className="absolute left-30 top-91.25">
                                <ExecutionNode
                                    node={nodes[3]}
                                    colors={colors}
                                />
                            </div>

                            {/* Notification */}
                            <div className="absolute right-30.25 top-91.25">
                                <ExecutionNode
                                    node={nodes[4]}
                                    colors={colors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Execution Timeline */
                <div className="mx-auto w-150 min-w-0 max-w-2xl h-115 overflow-y-scroll  scrollbar-thumb-transparent px-3 py-6 sm:px-6 sm:py-8">
                    {nodes.map((node, index) => (
                        <div
                            key={node.id}
                            className="relative flex min-w-0 gap-3 pb-8 last:pb-0 sm:gap-4"
                        >
                            {/* Timeline Connector */}
                            {index !== nodes.length - 1 && (
                                <div className="absolute bottom-0 left-5 top-10 w-px bg-slate-300" />
                            )} 

                            {/* Node Icon */}
                            <div
                                className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[node.color].glow
                                    } ${colors[node.color].text}`}
                            >
                                <node.icon size={20} />
                            </div>

                            {/* Timeline Card */}
                            <div className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <h3 className="min-w-0 wrap-break-words text-sm font-semibold text-slate-800">
                                        {node.title}
                                    </h3>

                                    <span
                                        className={`shrink-0 text-xs ${colors[node.color].text
                                            }`}
                                    >
                                        {node.status === 'completed'
                                            ? node.duration
                                            : node.status === 'running'
                                                ? 'Running...'
                                                : 'Pending'}
                                    </span>
                                </div>

                                <p className="mt-1 wrap-break-words text-xs text-slate-500">
                                    {node.subtitle || node.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExecutionFlowCanvas