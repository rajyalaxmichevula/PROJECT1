import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../../App";

import Dashboard from "../../pages/Dashboard";
import Workflows from "../../pages/Workflows";
import Executions from "../../pages/Executions";
import Templates from "../../pages/Templates";
import Tenants from "../../pages/Tenants";
import Workers from "../../pages/Workers";
import Monitoring from "../../pages/Monitoring";
import Alerts from "../../pages/Alerts";
import Settings from "../../pages/Settings";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "workflows",
        element: <Workflows />,
      },
      {
        path: "executions",
        element: <Executions />,
      },
      {
        path: "templates",
        element: <Templates />,
      },
      {
        path: "tenants",
        element: <Tenants />,
      },
      {
        path: "workers",
        element: <Workers />,
      },
      {
        path: "monitoring",
        element: <Monitoring />,
      },
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default appRouter;
