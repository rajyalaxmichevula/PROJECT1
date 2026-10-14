import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import ProtectedRoute from "../auth/ProtectedRoute";

import LandingPage from "../../pages/LandingPage";
import AuthPage from "../../pages/AuthPage";

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
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/workflows",
            element: <Workflows />,
          },
          {
            path: "/executions",
            element: <Executions />,
          },
          {
            path: "/templates",
            element: <Templates />,
          },
          {
            path: "/tenants",
            element: <Tenants />,
          },
          {
            path: "/workers",
            element: <Workers />,
          },
          {
            path: "/monitoring",
            element: <Monitoring />,
          },
          {
            path: "/alerts",
            element: <Alerts />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default appRouter;
