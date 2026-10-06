const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

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