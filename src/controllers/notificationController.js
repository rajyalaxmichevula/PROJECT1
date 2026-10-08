const {
    getNotifications
} = require("../services/notificationService");

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await getNotifications();

        res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllNotifications
};