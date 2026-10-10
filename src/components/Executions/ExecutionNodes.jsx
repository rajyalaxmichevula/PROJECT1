import React from 'react'
import {
    Check,
    Clock3,
    LoaderCircle,
} from 'lucide-react'

const ExecutionNode = ({ node, colors }) => {
    const Icon = node.icon
    const theme = colors[node.color]

    return (
        <div
            className={`flex h-17.5 w-58 items-center gap-3 rounded-xl px-3.5 ${theme.shadow} ${theme.card} ${theme.border}`}
        >
            {/* Icon */}
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.glow} ${theme.text}`}
            >
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${theme.icon}`}
                >
                    <Icon size={21} strokeWidth={2.1} />
                </div>
            </div>

            {/* Title and Status */}
            <div className="min-w-0 flex-1">
                <h3 className="whitespace-nowrap text-[14px] font-semibold text-slate-800">
                    {node.title}
                </h3>

                <div className="mt-1 flex items-center gap-1.5 text-[12px]">
                    {node.status === 'completed' && (
                        <>
                            <Check
                                size={16}
                                className="shrink-0 text-emerald-600"
                            />

                            <span className="text-emerald-600">
                                {node.subtitle || node.duration}
                            </span>

                            {node.subtitle && (
                                <span className="text-emerald-600">
                                    {node.duration}
                                </span>
                            )}
                        </>
                    )}

                    {node.status === 'running' && (
                        <>
                            <LoaderCircle
                                size={15}
                                className="shrink-0 animate-spin text-purple-600"
                            />

                            <span className="text-purple-600">
                                Running...
                            </span>

                            <span className="ml-auto whitespace-nowrap text-purple-600">
                                {node.duration}
                            </span>
                        </>
                    )}

                    {node.status === 'pending' && (
                        <>
                            <Clock3
                                size={15}
                                className="shrink-0 text-slate-500"
                            />

                            <span className="text-slate-500">
                                Pending
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExecutionNode
