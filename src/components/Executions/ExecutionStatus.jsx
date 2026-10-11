import React from 'react'
import {
  Check,
  Circle,
  RefreshCw,
  Square,
  ExternalLink,
} from 'lucide-react'

const steps = [
  {
    title: 'Trigger',
    status: 'Completed',
    duration: '234ms',
  },
  {
    title: 'Validate Order',
    status: 'Completed',
    duration: '512ms',
  },
  {
    title: 'Check Inventory',
    status: 'Running',
    duration: '1.2s',
  },
  {
    title: 'Process Payment',
    status: 'Pending',
    duration: '-',
  },
  {
    title: 'Update Inventory',
    status: 'Pending',
    duration: '-',
  },
  {
    title: 'Send Notification',
    status: 'Pending',
    duration: '-',
  },
]

const ExecutionStatus = () => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">

      {/* Execution Status Card */}
      <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Execution Status
        </h2>

        {/* Execution Timeline */}
        <div className="flex flex-col">

          {steps.map((step, index) => {
            const isCompleted = step.status === 'Completed'
            const isRunning = step.status === 'Running'
            const isLast = index === steps.length - 1

            return (
              <div
                key={step.title}
                className={`relative flex min-w-0 gap-3 px-1 py-2 ${isRunning ? 'bg-blue-50' : ''
                  }`}
              >
                {/* Timeline Line and Status Icon */}
                <div className="relative flex w-8 shrink-0 justify-center">

                  {!isLast && (
                    <span
                      className={`absolute left-1/2 top-5 bottom-4 w-px -translate-x-1/2 ${isCompleted
                        ? 'bg-emerald-400'
                        : 'bg-slate-200'
                        }`}
                    />
                  )}

                  {/* Status Circle */}
                  <span
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isRunning
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-slate-300 text-white'
                      }`}
                  >
                    {isCompleted ? (
                      <Check
                        size={18}
                        strokeWidth={3}
                      />
                    ) : isRunning ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    ) : (
                      <Circle
                        size={15}
                        fill="currentColor"
                        strokeWidth={2}
                      />
                    )}
                  </span>
                </div>

                {/* Step Information */}
                <div className="flex min-w-0 flex-1 items-start justify-between gap-2 py-0.5">

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800">
                      {step.title}
                    </p>

                    <p
                      className={`mt-1 text-xs ${isCompleted
                        ? 'text-emerald-600'
                        : isRunning
                          ? 'text-blue-600'
                          : 'text-amber-600'
                        }`}
                    >
                      {step.status}
                    </p>
                  </div>

                  <span className="shrink-0 pt-1 text-xs text-slate-400">
                    {step.duration}
                  </span>

                </div>
              </div>
            )
          })}

        </div>
      </div>

      {/* Execution Actions Card */}
      <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Execution Actions
        </h2>

        <div className="flex flex-col gap-2">

          {/* Retry Action */}
          <button
            type="button"
            className="flex w-full min-w-0 items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-left text-sm font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <RefreshCw
              size={18}
              className="shrink-0"
            />

            <span>
              Retry from Current Step
            </span>
          </button>

          {/* Cancel Action */}
          <button
            type="button"
            className="flex w-full min-w-0 items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            <Square
              size={17}
              fill="currentColor"
              className="shrink-0"
            />

            <span>
              Cancel Execution
            </span>
          </button>

          {/* View Workflow Action */}
          <button
            type="button"
            className="flex w-full min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ExternalLink
              size={17}
              className="shrink-0"
            />

            <span>
              View in Workflow
            </span>
          </button>

        </div>
      </div>

    </div>
  )
}

export default ExecutionStatus