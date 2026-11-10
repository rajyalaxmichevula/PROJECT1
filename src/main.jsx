import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { store } from "./store/store";
import appRouter from "./components/layout/appRouter";
import { AppProvider } from "./Context/AppContext";
import { WorkflowProvider } from "./Context/TemplateWorkFlow";
import { AlertProvider } from "./Context/AlertContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <WorkflowProvider>
          <AlertProvider>
            <RouterProvider router={appRouter} />
          </AlertProvider>
        </WorkflowProvider>
      </AppProvider>
    </Provider>
  </StrictMode>,
);