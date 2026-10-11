import { Database } from 'lucide-react'
import React from 'react'

const CurrentDetails = () => {

    const serviceDetails = [
        {
            title: 'Start Time',
            description: new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })
        },
        {
            title: 'Duration',
            description: '1.2s (in progress)'
        },
        {
            title: 'Service',
            description: 'Type'
        },
        {
            title: 'Inventory Services',
            description: 'Database Query'
        }
    ]

    const dataContent = [
        {
            "productId": "PRD-1024",
            "quantity": 25,
            "warehouse": "WH-01"
        }
    ]

    return (
        <div className="flex w-full min-w-0 flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            {/* Header */}
            <h2 className="text-base font-semibold text-slate-900">
                Current Step Details
            </h2>

            {/* Current Step */}
            <div className="flex flex-wrap items-center justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex shrink-0 items-center justify-center rounded-xl bg-purple-100 p-3">
                        <Database size={20} className="text-purple-700" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-800">
                            Check Inventory
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Inventory service
                        </p>
                    </div>

                </div>

                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Running
                </span>

            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-500">
                Query stock levels from inventory services.
            </p>

            {/* Service Details */}
            <div className="grid grid-cols-1 gap-1 border-t border-slate-100 pt-4 sm:grid-cols-2">

                {serviceDetails.map((item, index) => (
                    <div
                        key={index}
                        className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                        <p className="text-xs font-medium text-slate-500">
                            {item.title}
                        </p>

                        <p className="mt-1 wrap-break-words text-[12px] font-semibold text-slate-800">
                            {item.description}
                        </p>
                    </div>
                ))}

            </div>


            <div className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">

                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Input Data
                        </h2>

                    </div>

                    {/* Format Selector */}
                    <select
                        name="format"
                        aria-label="Select data format"
                        defaultValue="json"
                        className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="json">JSON</option>
                        <option value="html">HTML</option>
                    </select>

                </div>

                {/* Data Content */}
                <div className="overflow-x-auto rounded-b-xl p-4">
                    {dataContent.map((item, index) => (
                        <pre
                            key={index}
                            className="whitespace-pre font-mono text-sm leading-6 text-blue-500"
                        >
                            {JSON.stringify(item, null, 2)}
                        </pre>
                    ))}
                </div>


            </div>

            {/* Output Content */}
            <div className="min-h-15 overflow-x-auto py-1 border border-slate-300/60 rounded-lg">

                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-2 py-1">

                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-slate-800">
                            Output Data
                        </h2>
                    </div>

                    {/* Format Selector */}
                    <select
                        name="format"
                        aria-label="Select data format"
                        defaultValue="json"
                        className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="json">JSON</option>
                        <option value="html">HTML</option>
                    </select>

                </div>

                <pre className="whitespace-pre font-mono text-[11px] leading-5 text-slate-400 p-3">
                    {`Waiting for response...`}
                </pre>

            </div>

        </div>
    )
}

export default CurrentDetails