import CurrentDetails from "../components/Executions/CurrentDetails";
import ExecutionFlow from "../components/Executions/ExecutionFlow";
import ExecutionLogs from "../components/Executions/ExecutionLogs";
import ExecutionMetrics from "../components/Executions/ExecutionMetrics";
import ExecutionPageHeader from "../components/Executions/ExecutionPageHeader";
import ExecutionStats from "../components/Executions/ExecutionStats";
import ExecutionStatus from "../components/Executions/ExecutionStatus";
import Variable_Context from "../components/Executions/Variable_Context";

const Executions = () => {
  return (
    <div className="space-y-6 p-6">

      <ExecutionPageHeader />

      <ExecutionStats />

      {/* Execution Flow + Details + Status */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-3 ">

        {/* Execution Flow */}
        <div className=" rounded-lg shadow-md ">
          <ExecutionFlow />
        </div>

        {/* Current Details + Execution Status */}
        <div className=" grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
          <CurrentDetails />
          <ExecutionStatus />
        </div>


      </section>

      {/* Bottom Sections */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[0.8fr_1.2fr]">

        {/* Execution Logs */}
        <ExecutionLogs />

        <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 xl:grid-cols-[0.8fr_1.2fr] gap-4">

          {/* Execution Metrics */}
          <ExecutionMetrics />

          {/* Variables & Context */}
          <Variable_Context />

        </div>

      </section>

    </div>
  )
};

export default Executions;
