import CurrentDetails from "../components/Executions/CurrentDetails";
import ExecutionFlow from "../components/Executions/ExecutionFlow";
import ExecutionPageHeader from "../components/Executions/ExecutionPageHeader";
import ExecutionStats from "../components/Executions/ExecutionStats";
import ExecutionStatus from "../components/Executions/ExecutionStatus";

const Executions = () => {
  return (
    <div className="space-y-6 p-6">

      <ExecutionPageHeader />

      <ExecutionStats />

      <section className="flex flex-col lg:flex-row gap-3 ">

        <div className=" rounded-lg shadow-md ">
          <ExecutionFlow />
        </div>

        <div className=" grid grid-col-1 md:grid-cols-2 gap-2">
          <CurrentDetails />
          <ExecutionStatus />
        </div>

      </section>

    </div>
  )
};

export default Executions;
