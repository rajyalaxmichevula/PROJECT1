import OrderProcessing from "../components/Templates/OrderProcessing";
import TemplatesLibrary from "../components/Templates/TemplatesLibrary";
import TemplatesPageHeader from "../components/Templates/TemplatesPageHeader";

const Templates = () => {
  return (
    <div className="space-y-6 p-6">

      <TemplatesPageHeader />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">

        <TemplatesLibrary/>

        <OrderProcessing />
      </div>


    </div>
  );
};

export default Templates;
