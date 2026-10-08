import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ExecutionChart from "../components/dashboard/ExecutionChart";
import RecentExecutions from "../components/dashboard/RecentExecutions";
import WorkflowStatus from "../components/dashboard/WorkflowStatus";
import SystemHealth from "../components/dashboard/SystemHealth";
import ActiveTenants from "../components/dashboard/ActiveTenants";

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <DashboardPageHeader />

      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ExecutionChart />
        </div>

        <RecentExecutions />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <WorkflowStatus />
        <SystemHealth />
        <ActiveTenants />
      </div>
    </div>
  );
};

export default Dashboard;
