const express = require("express");

const router = express.Router();

const settings = {
    fullName: "Rajyalaxmi",
    email: "rajyalaxmi.chevula@gmail.com",
    timezone: "Asia/Kolkata",
    language: "English"
};

router.get("/general", (req, res) => {
    res.status(200).json({
        success: true,
        data: settings
    });
});
router.put("/general", (req, res) => {
    const { fullName, email, timezone, language } = req.body;

    if (!fullName || !email || !timezone || !language) {
        return res.status(400).json({
            success: false,
            message: "All general settings fields are required"
        });
    }

    Object.assign(settings, {
        fullName,
        email,
        timezone,
        language
    });

    return res.status(200).json({
        success: true,
        message: "General settings updated successfully",
        data: settings
    });
});

module.exports = router;