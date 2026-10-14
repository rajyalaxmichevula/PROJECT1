import { apiRequest } from "./client";

export const dashboardApi = {
  getStats: () => apiRequest("/dashboard/stats"),

  getExecutions: (range = "7d") =>
    apiRequest(`/dashboard/executions?range=${range}`),

  getRecentExecutions: (limit = 5) =>
    apiRequest(`/dashboard/recent-executions?limit=${limit}`),

  getWorkflowStatus: () => apiRequest("/dashboard/workflow-status"),

  getSystemHealth: () => apiRequest("/dashboard/system-health"),

  getActiveTenants: () => apiRequest("/dashboard/active-tenants"),
};
