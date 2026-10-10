import ExecutionFlow from "../components/Executions/ExecutionFlow";
import ExecutionPageHeader from "../components/Executions/ExecutionPageHeader";
import ExecutionStats from "../components/Executions/ExecutionStats";

const Executions = () => {
  return (
    <div className="space-y-6 p-6">

      <ExecutionPageHeader />

      <ExecutionStats />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2 ">

        <div className=" rounded-lg shadow-md">
          <ExecutionFlow />
        </div>

        <div className=""></div>

      </section>

    </div>
  )
};

export default Executions;
