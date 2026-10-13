import React, { useState } from 'react'

const TemplatesLibrary = () => {

    const [activeTab, setActiveTab] = useState('allTemplates')

    return (
        <div className=' p-2 shadow-md rounded-lg' >

            <div className="flex items-center gap-1 border-b border-b-gray-300">
                <button
                    onClick={() => setActiveTab('allTemplates')}
                    className={`border-b-2 px-5 py-3 text-sm font-medium ${activeTab === 'flow'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500'
                        }`}
                >
                    All Templates
                </button>

                <button
                    onClick={() => setActiveTab('myTemplates')}
                    className={`border-b-2 px-5 py-3 text-sm font-medium ${activeTab === 'timeline'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500'
                        }`}
                >
                    My Templates
                </button>

                <button
                    onClick={() => setActiveTab('myTemplates')}
                    className={`border-b-2 px-5 py-3 text-sm font-medium ${activeTab === 'timeline'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500'
                        }`}
                >
                   Shared with Me
                </button>

                <button
                    onClick={() => setActiveTab('myTemplates')}
                    className={`border-b-2 px-5 py-3 text-sm font-medium ${activeTab === 'timeline'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500'
                        }`}
                >
                    System Templates
                </button>
            </div>

        </div>
    )
}

export default TemplatesLibrary