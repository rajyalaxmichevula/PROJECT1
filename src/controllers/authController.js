const { signupUser, loginUser } = require("../services/authService");

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

const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const getMe = async (req, res) => {
    try {
        const user = {
            id: req.user.userId,
            email: req.user.email,
            name: "Rajyalaxmi",
            role: "Developer"
        };

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
module.exports = {
    signup,
    login,
    getMe
};