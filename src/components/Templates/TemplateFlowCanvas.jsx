import {
    Zap,
    FileText,
    Package,
    Database,
    Mail,
    Square,
} from "lucide-react";
import { useWorkflow } from "../../Context/TemplateWorkFlow";

const iconMap = {
    zap: Zap,
    "file-text": FileText,
    package: Package,
    database: Database,
    mail: Mail,
    square: Square,
};

const nodeStyles = {
    green: {
        card: "border-emerald-300 bg-emerald-50/70",
        icon: "bg-emerald-100 text-emerald-600",
    },
    blue: {
        card: "border-blue-300 bg-blue-50/70",
        icon: "bg-blue-600 text-white",
    },
    purple: {
        card: "border-purple-300 bg-purple-50/70",
        icon: "bg-purple-600 text-white",
    },
    orange: {
        card: "border-orange-300 bg-orange-50/70",
        icon: "bg-orange-500 text-white",
    },
    red: {
        card: "border-red-300 bg-red-50/70",
        icon: "bg-red-500 text-white",
    },
};

const positions = {
    "trigger": { left: 230, top: 20 },
    "validate-order": { left: 210, top: 120 },
    "check-inventory": { left: 210, top: 220 },
    "process-payment": { left: 40, top: 345 },
    "update-inventory": { left: 40, top: 445 },
    "send-notification": { left: 320, top: 345 },
    "end-failed": { left: 350, top: 445 },
};

const TemplateFlowCanvas = () => {
    const { nodes, connections } = useWorkflow();

    const getNode = (id) => nodes.find((node) => node.id === id);

    const getConnection = (source, target) =>
        connections.find(
            (connection) =>
                connection.source === source &&
                connection.target === target
        );

    const renderNode = (id) => {
        const node = getNode(id);
        const position = positions[id];

        if (!node || !position) return null;

        const Icon = iconMap[node.icon] || FileText;
        const styles = nodeStyles[node.color] || nodeStyles.blue;

        return (
            <div
                key={node.id}
                className={`absolute z-10 flex h-16.25 items-center gap-3 rounded-xl border px-5 shadow-sm ${styles.card}`}
                style={{
                    left: position.left,
                    top: position.top,
                }}
            >
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
                >
                    <Icon size={18} strokeWidth={2} />
                </div>

                <div className=" ">
                    <h3 className="text-[13px] font-semibold leading-5 text-slate-800 text-nowrap">
                        {node.title}
                    </h3>

                    <p className="text-[11px] leading-5 text-nowrap text-slate-600">
                        {node.subtitle}
                    </p>
                </div>
            </div>
        );
    };

    const inStock = getConnection(
        "check-inventory",
        "process-payment"
    );

    const outOfStock = getConnection(
        "check-inventory",
        "send-notification"
    );

    return (
        <div className=" rounded-xl bg-slate-50">
            <div className="mx-auto px-2 py-3">
                <div className="relative h-132.5 overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-200/30">

                    {/* Connector Lines */}
                    <svg
                        className="absolute inset-0 z-0"
                        width="620"
                        height="530"
                        viewBox="0 0 620 530"
                        fill="none"
                    >
                        <defs>
                            <marker
                                id="workflowArrow"
                                markerWidth="8"
                                markerHeight="8"
                                refX="6"
                                refY="3"
                                orient="auto"
                            >
                                <path
                                    d="M0 0 L6 3 L0 6 Z"
                                    fill="#0f172a"
                                />
                            </marker>
                        </defs>

                        {/* Trigger -> Validate */}
                        <path
                            d="M300 85 V115"
                            stroke="#0f172a"
                            strokeWidth="1.7"
                            markerEnd="url(#workflowArrow)"
                        />

                        {/* Validate -> Inventory */}
                        <path
                            d="M300 185 V215"
                            stroke="#0f172a"
                            strokeWidth="1.7"
                            markerEnd="url(#workflowArrow)"
                        />

                        {/* Inventory -> In Stock */}
                        <path
                            d="M300 285 V310 H150 V340"
                            stroke="#0f172a"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                            markerEnd="url(#workflowArrow)"
                        />

                        {/* Inventory -> Out of Stock */}
                        <path
                            d="M300 285 V310 H440 V340"
                            stroke="#0f172a"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                            markerEnd="url(#workflowArrow)"
                        />

                        {/* Payment -> Update Inventory */}
                        <path
                            d="M150 410 V440"
                            stroke="#0f172a"
                            strokeWidth="1.7"
                            markerEnd="url(#workflowArrow)"
                        />

                        {/* Notification -> End Failed */}
                        <path
                            d="M440 410 V440"
                            stroke="#0f172a"
                            strokeWidth="1.7"
                            markerEnd="url(#workflowArrow)"
                        />
                    </svg>

                    {/* Branch Labels */}
                    {inStock && (
                        <span className="absolute left-30.5 top-75 z-20 rounded-full bg-emerald-100 px-4 py-1 text-[12px] font-medium text-emerald-800">
                            {inStock.label}
                        </span>
                    )}

                    {outOfStock && (
                        <span className="absolute left-98.5 top-75 z-20 text-nowrap rounded-full bg-red-100 px-4 py-1 text-[11px] font-medium text-red-700">
                            {outOfStock.label}
                        </span>
                    )}

                    {/* Workflow Nodes */}
                    {nodes.map((node) => renderNode(node.id))}
                </div>
            </div>
        </div>
    );
};

export default TemplateFlowCanvas;
