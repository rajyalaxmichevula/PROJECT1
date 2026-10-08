const express = require("express");

const {
    getAllNotifications
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getAllNotifications
);

module.exports = router;