import { CircleStop, EllipsisVertical, RefreshCcw } from 'lucide-react'

const ExecutionPageHeader = () => {
    return (
        <div className='flex items-center justify-between'>
            <div>
                <div className=' flex gap-5'>
                    <h1 className="text-3xl font-semibold text-slate-900">Execution Details</h1>

                    <div className=' flex items-center gap-2 rounded-lg bg-green-200/50 px-4 text-sm text-green-700 font-semibold'>
                        <span className=' h-3 w-3 rounded-full bg-green-500'></span>
                        Running
                    </div>
                </div>

                <p className="mt-1 text-base text-slate-500">
                    Execution of Ordering  Processing Workflow
                </p>

            </div>

            <div className=' flex gap-2'>
                <button
                    type='button'
                    className=' flex items-center font-semibold text-sm gap-1.5 cursor-pointer text-blue-600 border-2 border-gray-200 py-2 px-4 rounded-md  transition shadow-md'
                >
                    <RefreshCcw size='18px' />
                    Retry
                </button>

                <button
                    type='button'
                    className=' flex items-center font-semibold text-sm gap-1.5 cursor-pointer text-red-500 border-2 border-gray-200 py-2 px-4 rounded-md transition shadow-md'
                >
                    <CircleStop size='18px' />
                    Cancel
                </button>

                <button
                    type='button'
                    className=' text-sm rounded-md px-2 border-2 cursor-pointer border-gray-200 shadow-md'
                >
                    <EllipsisVertical />
                </button>
            </div>
        </div>
    )
}

export default ExecutionPageHeader