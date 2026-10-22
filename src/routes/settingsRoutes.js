
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

    if (
        typeof fullName !== "string" || !fullName.trim() ||
        typeof email !== "string" || !email.trim() ||
        typeof timezone !== "string" || !timezone.trim() ||
        typeof language !== "string" || !language.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "All general settings fields are required and must be valid strings"
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address"
        });
    }

    Object.assign(settings, {
        fullName: fullName.trim(),
        email: email.trim(),
        timezone: timezone.trim(),
        language: language.trim()
    });

    return res.status(200).json({
        success: true,
        message: "General settings updated successfully",
        data: settings
    });
});

module.exports = router;
