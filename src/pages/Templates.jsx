
import OrderProcessing from "../components/Templates/OrderProcessing";
import TemplatesLibrary from "../components/Templates/TemplatesLibrary";
import TemplatesPageHeader from "../components/Templates/TemplatesPageHeader";

import { AppProvider } from "../Context/AppContext";
import { WorkflowProvider } from "../Context/TemplateWorkFlow";

const Templates = () => {
  return (
    <AppProvider>
      <WorkflowProvider>
        <div className="space-y-6 p-6">
          <TemplatesPageHeader />

          <div className="grid grid-cols-1 gap-2 xl:grid-cols-[0.9fr_0.8fr]">
            <TemplatesLibrary />
            <OrderProcessing />
          </div>
        </div>
      </WorkflowProvider>
    </AppProvider>
  );
};

export default Templates;
