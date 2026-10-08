const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const workflowRoutes = require("./routes/workflowRoutes");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/workflows", workflowRoutes);
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "FlowForge backend is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`FlowForge backend running on port ${PORT}`);
});