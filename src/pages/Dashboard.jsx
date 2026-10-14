import { useEffect, useState } from "react";

import { dashboardApi } from "../api/dashboardApi";

import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ExecutionChart from "../components/dashboard/ExecutionChart";
import RecentExecutions from "../components/dashboard/RecentExecutions";
import WorkflowStatus from "../components/dashboard/WorkflowStatus";
import SystemHealth from "../components/dashboard/SystemHealth";
import ActiveTenants from "../components/dashboard/ActiveTenants";

import DashboardSkeleton from "../components/common/DashboardSkeleton";

const initialDashboardData = {
  stats: null,
  recentExecutions: [],
  workflowStatus: null,
  systemHealth: null,
  activeTenants: [],
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);

  const [executionData, setExecutionData] = useState([]);
  const [executionRange, setExecutionRange] = useState("7d");

  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  const [executionLoading, setExecutionLoading] = useState(false);
  const [executionError, setExecutionError] = useState("");

  const fetchDashboardData = async () => {
    const [
      stats,
      executions,
      recentExecutions,
      workflowStatus,
      systemHealth,
      activeTenants,
    ] = await Promise.all([
      dashboardApi.getStats(),
      dashboardApi.getExecutions("7d"),
      dashboardApi.getRecentExecutions(5),
      dashboardApi.getWorkflowStatus(),
      dashboardApi.getSystemHealth(),
      dashboardApi.getActiveTenants(),
    ]);

    return {
      stats,
      executions,
      recentExecutions,
      workflowStatus,
      systemHealth,
      activeTenants,
    };
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setDashboardError("");

        const data = await fetchDashboardData();

        setDashboardData({
          stats: data.stats,
          recentExecutions: Array.isArray(data.recentExecutions)
            ? data.recentExecutions
            : [],
          workflowStatus: data.workflowStatus,
          systemHealth: data.systemHealth,
          activeTenants: Array.isArray(data.activeTenants)
            ? data.activeTenants
            : [],
        });

        setExecutionData(Array.isArray(data.executions) ? data.executions : []);
      } catch (error) {
        setDashboardError(error.message || "Unable to load dashboard data.");
      } finally {
        setDashboardLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleRetry = async () => {
    try {
      setDashboardLoading(true);
      setDashboardError("");

      const data = await fetchDashboardData();

      setDashboardData({
        stats: data.stats,
        recentExecutions: Array.isArray(data.recentExecutions)
          ? data.recentExecutions
          : [],
        workflowStatus: data.workflowStatus,
        systemHealth: data.systemHealth,
        activeTenants: Array.isArray(data.activeTenants)
          ? data.activeTenants
          : [],
      });

      setExecutionData(Array.isArray(data.executions) ? data.executions : []);
    } catch (error) {
      setDashboardError(error.message || "Unable to load dashboard data.");
    } finally {
      setDashboardLoading(false);
    }
  };

  const loadExecutions = async (range) => {
    try {
      setExecutionLoading(true);
      setExecutionError("");

      const data = await dashboardApi.getExecutions(range);

      setExecutionData(Array.isArray(data) ? data : []);
    } catch (error) {
      setExecutionError(error.message || "Unable to load execution data.");
    } finally {
      setExecutionLoading(false);
    }
  };

  const handleExecutionRangeChange = async (range) => {
    setExecutionRange(range);
    await loadExecutions(range);
  };

  if (dashboardLoading) {
    return <DashboardSkeleton />;
  }

  if (dashboardError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Unable to Load Dashboard
          </h2>

          <p className="mt-2 text-sm text-red-600">{dashboardError}</p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <DashboardPageHeader />

      <DashboardStats stats={dashboardData.stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ExecutionChart
            data={executionData}
            range={executionRange}
            loading={executionLoading}
            error={executionError}
            onRangeChange={handleExecutionRangeChange}
          />
        </div>

        <RecentExecutions executions={dashboardData.recentExecutions} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <WorkflowStatus data={dashboardData.workflowStatus} />

        <SystemHealth data={dashboardData.systemHealth} />

        <ActiveTenants tenants={dashboardData.activeTenants} />
      </div>
    </div>
  );
};

export default Dashboard;
