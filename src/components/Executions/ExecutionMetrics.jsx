import { Clock, Database, Timer, Zap } from 'lucide-react'
import React from 'react'

const ExecutionMetrics = () => {
    const metricsData = [
        {
            icon: Timer,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-100',
            title: 'Total Duration',
            description: '2m 34s',
        },
        {
            icon: Zap,
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-100',
            title: 'Steps Calculated',
            description: '2',
        },
        {
            icon: Clock,
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-100',
            title: 'Avg. Step Time',
            description: '373ms',
        },
        {
            icon: Database,
            iconColor: 'text-orange-600',
            iconBg: 'bg-orange-100',
            title: 'External Calls',
            description: '3',
        },
    ]

    return (
        <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-md">

            {/* Header */}
            <div className="border-b border-slate-100 px-1 pb-3">
                <h2 className="font-semibold text-slate-800">
                    Execution Metrics
                </h2>
            </div>

            {/* Metrics Grid */}
            <div className="mt-3 flex flex-col gap-2">
                {metricsData.map((rw, i) => {
                    const Icon = rw.icon

                    return (
                        <div
                            key={i}
                            className="min-w-0 rounded-lg border border-slate-200 p-3 flex items-center gap-4"
                        >
                            <div className="mb-3">
                                <span
                                    className={`inline-flex rounded-md p-2 ${rw.iconBg}`}
                                >
                                    <Icon
                                        size={22}
                                        className={rw.iconColor}
                                    />
                                </span>
                            </div>

                            <div className=' '>
                                <p className="text-sm text-slate-500">
                                    {rw.title}
                                </p>

                                {rw.title === 'Steps Calculated' ? (
                                    <h3 className="mt-1 text-xl font-semibold text-[18px] text-slate-800">
                                        {rw.description} / 5
                                    </h3>

                                ) : (
                                    <h3 className="mt-1 text-xl font-semibold text-[18px] text-slate-800">
                                        {rw.description}
                                    </h3>

                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ExecutionMetrics