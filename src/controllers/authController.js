const { signupUser } = require("../services/authService");

const signup = async (req, res) => {
    try {
        const user = await signupUser(req.body);

        res.status(201).json({
            success: true,
            message: "Signup request received",
            data: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    signup
};