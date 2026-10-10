
require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const workflowRoutes = require("./routes/workflowRoutes");
const executionRoutes = require("./routes/executionRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/workflows", workflowRoutes);
app.use("/api/executions", executionRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "FlowForge backend is running",
  });
});

// Handle malformed JSON bodies.
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body.",
    });
  }

  return next(error);
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`FlowForge backend running on port ${PORT}`);
  });
}

module.exports = app;
