import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Variable_ContextCard = ({ activeTab }) => {
    const [format, setFormat] = useState('JSON')

    const variablesData = {
        input: {
            orderId: 'ORD123',
            customerId: 'CUST456',
            items: [
                { productId: 'PROD123', quantity: 2 },
                { productId: 'PROD456', quantity: 1 },
            ],
        },

        output: {
            status: 'Waiting for response...',
        },

        system: {
            orderId: 'ORD123',
            customerId: 'CUST456',
            items: [
                { productId: 'PROD123', quantity: 2 },
                { productId: 'PROD456', quantity: 1 },
            ],
            tenantId: 'acme-corp',
            triggeredBy: 'user:ykumar',
            timestamp: '2025-10-07T10:24:12Z',
        },
    }

    const currentData = variablesData[activeTab]

    return (
        <div className="mt-2 min-w-0  rounded-lg border border-slate-200">

            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
                <span className="text-xs text-slate-500">
                    {activeTab === 'input'
                        ? 'Input Data'
                        : activeTab === 'output'
                            ? 'Output Data'
                            : 'System Context'}
                </span>

                <div className="relative">
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-20 appearance-none rounded-md border border-slate-200 bg-white py-1.5 pl-2 pr-6 text-xs text-slate-600 outline-none"
                    >
                        <option value="JSON">JSON</option>
                    </select>

                    <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="h-60 overflow-scroll scrollbar-thumb-transparent bg-white p-3">
                {activeTab === 'output' ? (
                    <p className="text-sm text-slate-400">
                        Waiting for response...
                    </p>
                ) : (
                    <pre className="whitespace-pre font-mono text-xs leading-5 text-blue-600">
                        {JSON.stringify(currentData, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    )
}

export default Variable_ContextCard