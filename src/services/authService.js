const jwt = require("jsonwebtoken");

const signupUser = async ({ name, email, password }) => {
    return {
        name,
        email
    };
};

const loginUser = async ({ email, password }) => {
    const user = {
        id: "temporary-user-id",
        email
    };

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        process.env.JWT_SECRET || "development-secret",
        {
            expiresIn: "1h"
        }
    );

    return {
        user,
        token
    };
};

module.exports = {
    signupUser,
    loginUser
};