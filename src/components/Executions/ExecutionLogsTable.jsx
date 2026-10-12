import React from 'react'

const ExecutionLogsTable = ({ executionLogsData, level }) => {

    const filteredLogs = executionLogsData.filter((log) =>
        level === 'All Levels' ? true : log.level === level
    )

    return (
        <div className="w-full overflow-x-auto p-2">
            <table className="w-full border-collapse border border-gray-300 text-left text-xs sm:text-sm rounded-lg shadow-md">

                <thead className="bg-slate-100 text-slate-600">
                    <tr>
                        <th className="whitespace-nowrap border border-gray-200 px-3 py-2 font-medium">
                            Time
                        </th>
                        <th className="border border-gray-200 px-3 py-2 font-medium">
                            Level
                        </th>
                        <th className="border border-gray-200 px-3 py-2 font-medium">
                            Service
                        </th>
                        <th className="border border-gray-200 px-3 py-2 font-medium">
                            Message
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredLogs.map((log, index) => (
                        <tr
                            key={`${log.time} -${log.service} -${index} `}
                            className={`border-b border-slate-100 last:border-b-0 font-semibold ${index === filteredLogs.length - 1 &&
                                log.message === 'Awaiting response...'
                                ? 'bg-blue-100'
                                : 'hover:bg-slate-50'
                                } `}
                        >
                            <td className="whitespace-nowrap px-3 py-1 border border-gray-200 text-slate-600 text-[12px]">
                                {log.time}
                            </td>

                            <td className={`px-3 py-1 font-medium text-[12px] border border-gray-200 ${log.level === 'DEBUG'
                                ? 'text-purple-600'
                                : 'text-blue-600'
                                } `}>
                                {log.level}
                            </td>

                            <td className="whitespace-nowrap px-3 py-1 text-[12px] border border-gray-200 text-slate-700">
                                {log.service}
                            </td>

                            <td className={`min-w-0 px-3 py-2 text-[12px] border border-gray-200 ${log.message === 'Awaiting response...'
                                ? 'text-blue-600'
                                : 'text-slate-700'
                                } `}>
                                <span className="block min-w-0 wrap-break-words">
                                    {log.message}
                                </span>
                            </td>
                        </tr>
                    ))}

                    {filteredLogs.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-3 py-6 text-center text-slate-500"
                            >
                                No logs found for this level.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ExecutionLogsTable