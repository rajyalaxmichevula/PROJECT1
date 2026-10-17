import { Workflow } from 'lucide-react'
import React from 'react'
import TemplateFlowCanvas from './TemplateFlowCanvas'
import TemplatesDescription from './TemplatesDescription'

const OrderProcessing = () => {
    return (
        <div className=' py-2 px-3 rounded-lg shadow-md'>

            {/* Template Information */}
            <div className=' flex justify-between my-3'>

                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Workflow size={20} />
                    </div>

                    <div className="min-w-0">
                        <h1 className="wrap-break-words text-base font-semibold text-slate-800 sm:text-lg">
                            Order Processing Template
                        </h1>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Version 1.0.0
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div>
                    <button
                        type="button"
                        className="flex w-full shrink-0 items-center justify-center rounded-md py-2.5 px-3 bg-blue-600 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Use Template
                    </button>
                </div>


            </div>

            <TemplateFlowCanvas />

            <TemplatesDescription />

        </div >
    )
}

export default OrderProcessing