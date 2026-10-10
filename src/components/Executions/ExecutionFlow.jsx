
import React, { useState } from 'react'
import {
    Minus,
    Plus,
    Scan,
    Zap,
    FileText,
    Database,
    CreditCard,
    Mail,
} from 'lucide-react'

import ExecutionFlowCanvas from './ExecutionFlowCanvas'
import ExecutionNode from './ExecutionNodes'

const ExecutionFlow = () => {
    const [activeTab, setActiveTab] = useState('flow')
    const [zoom, setZoom] = useState(100)

    // Workflow data
    const nodes = [
        {
            id: 1,
            title: 'Trigger',
            subtitle: 'New Order',
            duration: '234ms',
            icon: Zap,
            color: 'green',
            status: 'completed',
        },
        {
            id: 2,
            title: 'Validate Order',
            duration: '512ms',
            icon: FileText,
            color: 'blue',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Check Inventory',
            duration: '1.2s',
            icon: Database,
            color: 'purple',
            status: 'running',
        },
        {
            id: 4,
            title: 'Process Payment',
            icon: CreditCard,
            color: 'blue',
            status: 'pending',
        },
        {
            id: 5,
            title: 'Send Notification',
            icon: Mail,
            color: 'orange',
            status: 'pending',
        },
    ]

    // Color themes
    const colors = {
        green: {
            card: 'border-emerald-600/60',
            icon: 'bg-emerald-500 text-white',
            text: 'text-emerald-600',
            glow: 'bg-emerald-50',
            border: 'border-2 border-emerald-600/50',
            shadow: 'shadow-sm shadow-emerald-300/40',
        },
        blue: {
            card: 'border-blue-500/70',
            icon: 'bg-blue-600 text-white',
            text: 'text-blue-600',
            glow: 'bg-blue-50',
            border: 'border-2 border-blue-600/50',
            shadow: 'shadow-sm shadow-blue-300/40',
        },
        purple: {
            card: 'border-purple-500/60',
            icon: 'bg-purple-600 text-white',
            text: 'text-purple-600',
            glow: 'bg-purple-50',
            border: 'border-2 border-purple-600/50',
            shadow: 'shadow-sm shadow-purple-300/40',
        },
        orange: {
            card: 'border-amber-500/70',
            icon: 'bg-amber-500 text-white',
            text: 'text-amber-600',
            glow: 'bg-amber-50',
            border: 'border-2 border-amber-600/50',
            shadow: 'shadow-sm shadow-amber-300/40',
        },
    }

    // Zoom control
    const changeZoom = (amount) => {
        setZoom((prev) =>
            Math.min(120, Math.max(80, prev + amount))
        )
    }

    return (
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">

            {/* Header */}
            <div className="px-5 pb-1 pt-4">
                <h2 className="text-[18px] font-semibold tracking-tight text-slate-900">
                    Execution Flow
                </h2>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5">

                {/* Tabs */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setActiveTab('flow')}
                        className={`border-b-2 px-5 py-3 text-sm font-medium ${
                            activeTab === 'flow'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-500'
                        }`}
                    >
                        Flow View
                    </button>

                    <button
                        onClick={() => setActiveTab('timeline')}
                        className={`border-b-2 px-5 py-3 text-sm font-medium ${
                            activeTab === 'timeline'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-500'
                        }`}
                    >
                        Execution Timeline
                    </button>
                </div>

                {/* Zoom controls */}
                <div className="flex items-center gap-2 py-2">
                    <div className="flex items-center overflow-hidden rounded-md border border-slate-200">

                        <button
                            onClick={() => changeZoom(-10)}
                            disabled={zoom <= 80}
                            aria-label="Zoom out"
                            className="border-r border-slate-200 p-2 text-slate-600 disabled:opacity-40"
                        >
                            <Minus size={16} />
                        </button>

                        <button
                            onClick={() => setZoom(100)}
                            className="min-w-17 px-2 py-2 text-sm text-slate-600"
                        >
                            {zoom}%
                        </button>

                        <button
                            onClick={() => changeZoom(10)}
                            disabled={zoom >= 120}
                            aria-label="Zoom in"
                            className="border-l border-slate-200 p-2 text-slate-600 disabled:opacity-40"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button
                        onClick={() => setZoom(100)}
                        aria-label="Reset zoom"
                        className="rounded-md border border-slate-200 p-2 text-slate-600"
                    >
                        <Scan size={17} />
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <ExecutionFlowCanvas
                activeTab={activeTab}
                zoom={zoom}
                nodes={nodes}
                colors={colors}
                ExecutionNode={ExecutionNode}
            />

        </section>
    )
}

export default ExecutionFlow
