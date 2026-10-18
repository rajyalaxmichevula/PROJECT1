import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TemplatesPageHeader = () => {

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-semibold text-slate-900">
                    Workflow Templates
                </h1>

                <p className="mt-1 text-base text-slate-500">
                    Start quickly with pre-built templates for common use cases
                </p>
            </div>

            <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                onClick={() => navigate('/templates/create')}
            >
                <Plus size={18} />
                <span>Create Templates</span>
            </button>
        </div>
    );
};

export default TemplatesPageHeader;
