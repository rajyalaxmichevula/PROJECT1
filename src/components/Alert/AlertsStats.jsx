
import React from 'react'
import {
    Bell,
    AlertCircle,
    CheckCircle,
    Clock,
    TrendingUp,
    TrendingDown
} from 'lucide-react'

const alertsStats = [
    {
        id: 1,
        title: "Total Alerts",
        value: 24,
        icon: Bell,
        iconColor: "text-blue-600",
        backgroundColor: "bg-green-100/80",
        trend: {
            value: "20%",
            direction: "up",
            color: "text-green-600",
            comparison: "vs last month"
        }
    },
    {
        id: 2,
        title: "Active Alerts",
        value: 5,
        icon: AlertCircle,
        iconColor: "text-red-500",
        backgroundColor: "bg-red-50",
        trend: {
            value: "67%",
            direction: "up",
            color: "text-red-600",
            comparison: "vs last month"
        }
    },
    {
        id: 3,
        title: "Resolved Today",
        value: 12,
        icon: CheckCircle,
        iconColor: "text-green-600",
        backgroundColor: "bg-green-100/80",
        trend: {
            value: "33%",
            direction: "up",
            color: "text-green-600",
            comparison: "vs yesterday"
        }
    },
    {
        id: 4,
        title: "Avg. Resolution Time",
        value: "8.4m",
        icon: Clock,
        iconColor: "text-purple-600",
        backgroundColor: "bg-green-100/70",
        trend: {
            value: "42%",
            direction: "down",
            color: "text-green-600",
            comparison: "vs last month"
        }
    }
]

const AlertsStats = () => {
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            {alertsStats.map((item) => {
                const Icon = item.icon
                const TrendIcon = item.trend.direction === "up"
                    ? TrendingUp
                    : TrendingDown

                return (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-xl px-5 py-2 shadow-sm"
                    >
                        <div className="flex items-start gap-4">

                            {/* Icon */}
                            <div className={`self-center flex ${item.backgroundColor} ${item.iconColor} p-3 rounded-xl`}>

                                <Icon size={26} strokeWidth={2.2} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">

                                <p className="text-sm font-medium text-gray-600">
                                    {item.title}
                                </p>

                                <div className=' flex justify-between p-1'>

                                    <div className="flex flex-wrap items-center gap-3 mt-2">

                                        <h2 className="text-3xl font-bold text-gray-900">
                                            {item.value}
                                        </h2>
                                    </div>

                                    <div className=''>

                                        <span className={`inline-flex p-1 items-center gap-1 text-xs font-semibold ${item.backgroundColor} ${item.trend.color}`}>
                                            <TrendIcon size={15} />
                                            {item.trend.value}
                                        </span>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.trend.comparison}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                )
            })}

        </div>

    )
}

export default AlertsStats
