import { CircleStop, EllipsisVertical, RefreshCcw } from 'lucide-react'

const ExecutionPageHeader = () => {
    return (
        <div className='flex flex-col md:flex-row gap-0 sm:gap-5 items-start md:items-center justify-between'>
            <div className="w-full min-w-0">
                {/* Heading and Status */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900">
                        Execution Details
                    </h1>

                    <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-emerald-700">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                        Running
                    </div>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-500">
                    Execution of Ordering Processing Workflow
                </p>
            </div>

           
            <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center sm:gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm bor">

                {/* Retry Button */}
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 active:scale-[0.98] sm:w-auto"
                >
                    <RefreshCcw size={16} />
                    Retry
                </button>

                {/* Cancel Button */}
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100 active:scale-[0.98] sm:w-auto"
                >
                    <CircleStop size={16} />
                    Cancel
                </button>

                {/* More Options */}
                <button
                    type="button"
                    aria-label="More options"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98] sm:w-auto"
                >
                    <EllipsisVertical size={18} />
                </button>

            </div>

        </div>
    )
}

export default ExecutionPageHeader