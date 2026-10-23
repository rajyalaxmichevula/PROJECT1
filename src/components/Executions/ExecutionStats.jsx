import { Building2, Copy } from 'lucide-react'
import ExecutionStatsCard from './ExecutionStatsCard'

const executionStatsData = [
    {
        title: 'Execution ID',
        description: 'exec_01H8X7Y2Z3F9',
        icon: Copy,
        iconColor: 'text-slate-500',
    },
    {
        title: 'Workflow',
        description: 'Order Processing Workflow',
    },
    {
        title: 'Version',
        description: 'v1.0.0',
    },
    {
        title: 'Started At',
        description: 'Oct 7, 2025, 10:24:12',
    },
    {
        title: 'Duration',
        description: '2m 34s',
    },
    {
        title: 'Triggered By',
        description: 'Manual (Yogesh Kumar)',
    },
    {
        title: 'Tenant',
        description: 'Acme Corp',
        icon: Building2,
        iconColor: 'text-blue-600',
    },
]

const ExecutionStats = () => {
    return (
        <div className="inline-grid w-full grid-cols-1 overflow-x-auto rounded-lg border border-gray-200 bg-white py-1 shadow-sm md:grid-cols-3 xl:flex gap-2"
        >
            {
                executionStatsData.map((stat) => (
                    <ExecutionStatsCard
                        key={stat.title}
                        {...stat}
                    />
                ))}
        </div>
    )
}

export default ExecutionStats
