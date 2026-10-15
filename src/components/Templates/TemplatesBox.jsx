import React from 'react'
import { Download, Eye, EllipsisVertical } from 'lucide-react'

const TemplatesBox = ({ templatesData }) => {
    return (
        <div className="mt-4 grid grid-cols-1 gap-3 rounded-md border border-slate-200 px-0.5 py-2 sm:grid-cols-2 xl:grid-cols-3">

            {templatesData.length > 0 ? (
                templatesData.map((template) => {
                    const Icon = template.icon

                    return (
                        <div
                            key={template.id}
                            className={`flex min-w-0 flex-col rounded-lg border p-3 transition-shadow hover:shadow-md ${template.featured
                                    ? 'border-blue-500 ring-1 ring-blue-500/20'
                                    : 'border-slate-200'
                                }`}
                        >
                            {/* Template Icon */}
                            <div className="flex">
                                <span className={`rounded-lg p-2 ${template.iconBg}`}>
                                    {Icon && (
                                        <Icon
                                            size={28}
                                            className={template.iconColor}
                                        />
                                    )}
                                </span>
                            </div>

                            {/* Title and Description */}
                            <div className="mt-2">
                                <h3 className="font-sans font-semibold text-slate-800">
                                    {template.title}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {template.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                {template.tags?.map((tag, index) => (
                                    <span
                                        key={tag}
                                        className={`rounded-md px-1.5 py-1 text-xs ${index % 3 === 0
                                                ? 'bg-blue-100 text-blue-700'
                                                : index % 3 === 1
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Downloads, Views and Menu */}
                            <div className="mt-auto flex items-center justify-between pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Download size={17} />
                                        <span className="text-xs">
                                            {typeof template.downloads === 'number'
                                                ? template.downloads >= 1000
                                                    ? `${(template.downloads / 1000).toFixed(1).replace('.0', '')}K`
                                                    : template.downloads
                                                : template.downloads}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Eye size={17} />
                                        <span className="text-xs">
                                            {template.views}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    aria-label={`More options for ${template.title}`}
                                    className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                                >
                                    <EllipsisVertical size={18} />
                                </button>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p className="col-span-full py-8 text-center text-sm text-slate-500">
                    No templates found.
                </p>
            )}

        </div>
    )
}

export default TemplatesBox