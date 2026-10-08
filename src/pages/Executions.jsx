import ExecutionPageHeader from "../components/Executions/ExecutionPageHeader";
import ExecutionStats from "../components/Executions/ExecutionStats";

const Executions = () => {
  return (
    <div className="space-y-6 p-6">

      <ExecutionPageHeader />

      <ExecutionStats />
    </div>
  )
};

export default Executions;
