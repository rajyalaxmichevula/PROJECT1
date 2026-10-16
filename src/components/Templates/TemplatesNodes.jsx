import React from 'react'

const TemplatesNodes = () => {
    const { workflowName, version, nodes, connections } = useWorkflow();

    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-lg font-semibold">
                {workflowName}
            </h2>

            <p className="text-sm text-gray-500">
                Version {version}
            </p>

            <div className="mt-4 space-y-3">
                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className="rounded-lg border border-slate-200 p-3"
                    >
                        <h3 className="font-medium">{node.title}</h3>
                        <p className="text-sm text-gray-500">
                            {node.subtitle}
                        </p>
                        <span className="text-xs text-blue-600">
                            {node.status}
                        </span>
                    </div>
                ))}
            </div>

            <p className="mt-3 text-sm text-gray-500">
                Connections: {connections.length}
            </p>
        </div>
    );
}; <div>TemplatesNodes</div>

export default TemplatesNodes