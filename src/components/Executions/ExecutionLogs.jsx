import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import ExecutionLogsTable from './ExecutionLogsTable'

const ExecutionLogs = () => {
    const [level, setLevel] = useState('All Levels')
    const [autoScroll, setAutoScroll] = useState(true)

    const executionLogsData = [
        {
            time: '10:24:12',
            level: 'INFO',
            service: 'Orchestrator',
            message: 'Execution started: exec_01H8X7Y2Z3F9',
        },
        {
            time: '10:24:12',
            level: 'INFO',
            service: 'Trigger',
            message: 'New order received: #ORD123',
        },
        {
            time: '10:24:13',
            level: 'INFO',
            service: 'Validator',
            message: 'Order validation successful',
        },
        {
            time: '10:24:14',
            level: 'INFO',
            service: 'Inventory',
            message: 'Checking stock for product: PROD123',
        },
        {
            time: '10:26:46',
            level: 'INFO',
            service: 'Inventory',
            message: 'Querying inventory service...',
        },
        {
            time: '10:26:47',
            level: 'DEBUG',
            service: 'Inventory',
            message: 'Sending request to /api/stock',
        },
        {
            time: '10:26:47',
            level: 'INFO',
            service: 'Inventory',
            message: 'Awaiting response...',
        },
    ]

    return (
        <div className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md ">

            {/* Header */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">

                <h2 className="whitespace-nowrap text-md font-semibold text-slate-800">
                    Execution Logs
                </h2>

                <div className="flex items-center gap-3">

                    {/* Log Level Dropdown */}
                    <div className="relative">
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="w-36 appearance-none rounded-md border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-600 outline-none"
                        >
                            <option>All Levels</option>
                            <option>INFO</option>
                            <option>DEBUG</option>
                            <option>WARN</option>
                            <option>ERROR</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                    </div>

                    {/* Auto Scroll Toggle */}
                    <button
                        type="button"
                        onClick={() => setAutoScroll(!autoScroll)}
                        aria-label="Toggle auto scroll"
                        aria-pressed={autoScroll}
                        className={`relative h-5 w-10 shrink-0 rounded-full transition-colors ${autoScroll ? 'bg-blue-600' : 'bg-slate-300'
                            } `}
                    >
                        <span
                            className={`absolute top-0.5 left-0 h-4 w-4 rounded-full bg-white shadow sm transition-transform ${autoScroll ? 'translate-x-5' : 'translate-x-0.5'
                                } `}
                        />
                    </button>

                    <span className="whitespace-nowrap text-sm text-slate-600">
                        Auto Scroll
                    </span>
                </div>
            </div>

            {/* Logs Table */}
            <ExecutionLogsTable
                executionLogsData={executionLogsData}
                level={level}
            />

        </div>
    )
}

export default ExecutionLogs