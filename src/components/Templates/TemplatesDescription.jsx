
import { Clock, Download, User } from 'lucide-react'
import React from 'react'

const TemplatesDescription = () => {
    const descriptionData = [
        {
            icon: User,
            title: 'Created By',
            caption: 'FlowForge Team',
        },
        {
            icon: Download,
            title: 'Downloads',
            caption: '1.2K',
        },
        {
            icon: Clock,
            title: 'Last Updated',
            caption: 'Oct 1, 2025',
        },
    ]

    const tags = [
        'E-commerce',
        'Saga Pattern',
        'Multi-tenant',
        'Inventory',
        'Payment',
        'Notification',
        'Error Handling',
        'Compensation',
    ]

    const tagColors = [
        {
            txtColor: 'text-blue-700',
            bgColor: 'bg-blue-100',
        },
        {
            txtColor: 'text-purple-700',
            bgColor: 'bg-purple-100',
        },
        {
            txtColor: 'text-green-700',
            bgColor: 'bg-green-100',
        },
        {
            txtColor: 'text-yellow-800',
            bgColor: 'bg-yellow-100',
        },
        {
            txtColor: 'text-red-700',
            bgColor: 'bg-red-100',
        },
    ]

    return (
        <div className="space-y-5 px-2">

            {/* Description */}
            <div>
                <h2 className="font-semibold text-slate-800">
                    Description
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    A complete order processing workflow that handles
                    inventory validation, payment processing, and
                    customer notifications with proper error handling
                    and compensation logic.
                </p>
            </div>

            {/* Tags */}
            <div>
                <h2 className="font-semibold text-slate-800">
                    Tags
                </h2>

                <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, index) => {
                        const color = tagColors[index % tagColors.length]

                        return (
                            <span
                                key={tag}
                                className={`rounded-md px-2 py-1 text-xs font-medium ${color.bgColor} ${color.txtColor}`}
                            >
                                {tag}
                            </span>
                        )
                    })}
                </div>
            </div>

            {/* Template Information */}
            <div className="flex flex-wrap justify-between my-4 gap-4 rounded-lg bg-blue-50/90 p-3">
                {descriptionData.map((rw) => {
                    const Icon = rw.icon

                    return (
                        <div
                            className="flex items-center gap-3"
                            key={rw.title}
                        >
                            <span className="rounded-full bg-blue-100 p-2">
                                <Icon
                                    size={20}
                                    className="text-blue-600"
                                />
                            </span>

                            <div>
                                <h3 className="text-xs font-medium text-slate-500">
                                    {rw.title}
                                </h3>

                                <span className="text-xs text-slate-700">
                                    {rw.caption}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default TemplatesDescription
