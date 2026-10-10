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
        <div
            className="overflow-hidden flex justify-center"
        >
            {activeTab === 'flow' ? (
                <div className=" ">
                    <div
                        className="relative mx-auto h-135 w-200 origin-top transition-transform"
                        style={{
                            transform: `scale(${zoom / 100})`,
                            marginBottom: `${540 * (zoom / 100) - 540}px`,
                        }}
                    >
                        {/* Connector lines */}
                        <svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 800 540"
                            fill="none"
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

                            {/* Trigger to validation */}
                            <path
                                d="M400 106 V130"
                                stroke="#334155"
                                strokeWidth="1.6"
                                markerEnd="url(#flowArrow)"
                            />

                            {/* Validation to inventory */}
                            <path
                                d="M400 200 V225"
                                stroke="#334155"
                                strokeWidth="1.6"
                                markerEnd="url(#flowArrow)"
                            />

                            {/* Inventory branch */}
                            <path
                                d="M400 300 V344 H250 V390"
                                stroke="#64748b"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                                markerEnd="url(#flowArrow)"
                            />

                            <path
                                d="M400 344 H545 V390"
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
                        <div className="absolute left-1/2 top-57.25 -translate-x-1/2">
                            <ExecutionNode
                                node={nodes[2]}
                                colors={colors}
                            />
                        </div>

                        {/* In Stock condition */}
                        <div className="absolute left-50.5 top-91.25 flex h-8.5 items-center gap-2 rounded-full bg-emerald-50 px-4 text-xs font-medium text-emerald-700">
                            <PackageCheck size={15} />
                            In Stock
                        </div>

                        {/* Out of Stock condition */}
                        <div className="absolute right-50.5 top-91.25 flex h-8.5 items-center gap-2 rounded-full bg-red-50 px-4 text-xs font-medium text-red-600">
                            <PackageX size={15} />
                            Out of Stock
                        </div>

                        {/* Payment */}
                        <div className="absolute left-30 top-101.25">
                            <ExecutionNode
                                node={nodes[0]}
                                colors={colors}
                            />
                        </div>

                        {/* Notification */}
                        <div className="absolute right-30.25 top-101.25">
                            <ExecutionNode
                                node={nodes[0]}
                                colors={colors}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                /* Execution Timeline */
                <div className="mx-auto max-w-2xl px-8 py-8">
                    {nodes.map((node, index) => (
                        <div
                            key={node.id}
                            className="relative flex gap-4 pb-8 last:pb-0"
                        >
                            {index !== nodes.length - 1 && (
                                <div className="absolute bottom-0 left-5 top-10 w-px bg-slate-300" />
                            )}

                            {/* Node icon */}
                            <div
                                className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[node.color].glow} ${colors[node.color].text}`}
                            >
                                <node.icon size={20} />
                            </div>

                            {/* Timeline card */}
                            <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-sm font-semibold text-slate-800">
                                        {node.title}
                                    </h3>

                                    <span
                                        className={`text-xs ${colors[node.color].text
                                            }`}
                                    >
                                        {node.status === 'completed'
                                            ? node.duration
                                            : node.status === 'running'
                                                ? 'Running...'
                                                : 'Pending'}
                                    </span>
                                </div>

                                <p className="mt-1 text-xs text-slate-500">
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