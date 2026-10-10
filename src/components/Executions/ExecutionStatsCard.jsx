const ExecutionStatsCard = ({
    title,
    description,
    icon: Icon,
    iconColor = 'text-slate-500',
}) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(description)
        } catch (error) {
            console.error('Unable to copy Execution ID:', error)
        }
    }

    const isLink = title === 'Workflow' || title === 'Tenant'

    return (
        <div className="flex min-w-0 flex-1 basis-full flex-col justify-center border-r border-slate-200 px-3 py-3 last:border-r-0 sm:basis-1/2 lg:basis-auto lg:flex-1 lg:border-b-0">
            {/* Label */}
            <p className="mb-1 whitespace-nowrap text-[11px] font-medium leading-4 text-slate-500">
                {title}
            </p>

            {/* Value and icon */}
            <div className="flex min-w-0 whitespace-nowrap items-center gap-1.5">

                {/* Tenant icon before text */}
                {title === 'Tenant' && Icon && (
                    <Icon
                        size={14}
                        strokeWidth={1.8}
                        className={`shrink-0 ${iconColor}`}
                        aria-hidden="true"
                    />
                )}

                {/* Description */}
                <span
                    className={`min-w-0 wrap-break-words text-[12px] font-semibold leading-4 ${isLink ? 'text-blue-600' : 'text-slate-800'
                        }`}
                >
                    {description}
                </span>

                {/* Execution ID copy icon after text */}
                {title === 'Execution ID' && Icon && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        title="Copy Execution ID"
                        aria-label="Copy Execution ID"
                        className={`inline-flex shrink-0 items-center justify-center ${iconColor} hover:text-blue-600`}
                    >
                        <Icon
                            size={14}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </button>
                )}

            </div>

        </div>
    )
}

export default ExecutionStatsCard
