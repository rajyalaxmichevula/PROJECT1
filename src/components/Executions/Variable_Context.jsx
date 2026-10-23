import React, { useState } from 'react'
import Variable_ContextCard from './Variable_ContextCard'

const Variable_Context = () => {

  const [activeTab, setActiveTab] = useState('input')


  return (
    <div className="min-w-0  border border-slate-200 py-3 px-4 rounded-lg shadow-lg">

      <div>
        <h1 className=' font-semibold'>
          Variable & Context
        </h1>
      </div>

      <div className="flex items-center gap-1">

        <button
          type='button'
          onClick={() => setActiveTab('input')}
          className={`border-b-2 px-5 py-3 text-[clamp(11px,0.8vw,13px)] whitespace-nowrap outline-none font-medium ${activeTab === 'input'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-slate-500'
            }`}
        >
          Input variables
        </button>

        <button
          onClick={() => setActiveTab('output')}
          className={`border-b-2 px-5 py-3 text-[clamp(11px,0.8vw,13px)] whitespace-nowrap outline-none font-medium ${activeTab === 'output'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-slate-500'
            }`}
        >
          Output Vairables
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`border-b-2 px-5 py-3 text-[clamp(11px,0.8vw,13px)] whitespace-nowrap outline-none font-medium ${activeTab === 'system'
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-slate-500'
            }`}
        >
          System Context
        </button>

      </div>


      <Variable_ContextCard
        activeTab={activeTab}
      />
    </div>
  )
}

export default Variable_Context