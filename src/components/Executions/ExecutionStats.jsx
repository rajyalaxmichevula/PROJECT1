import { BuildingComplex, Copy } from 'lucide-react'
import ExecutionStatsCard from './ExecutionStatsCard'

const executionStatsData = [
    {
        title: 'Execution ID',
        description: 'exec_01H8X7Y2Z3F9',
        icon: Copy
    },
    {
        title: 'Workflow',
        description: 'Order Processing Workflow'
    },
    {
        title: 'Version',
        description: 'v1.0.0'
    },
    {
        title: 'Started at',
        description: 'Oct 7, 2025, 10:24:12'
    },
    {
        title: 'Duration',
        description: '2m 34s'
    },
    {
        title: 'Triggered By',
        description: 'Manual (Yogesh Kumar)'
    },
    {
        title: 'Tenant',
        description: 'Acme Corp',
        icon: BuildingComplex
    }
]

const ExecutionStats = () => {


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 border'>
            {
                executionStatsData.map((stat) => {
                    <ExecutionStatsCard key={stat.title} {...stat} />
                })
            }

        </div>
    )
}

export default ExecutionStats