
const jwt = require("jsonwebtoken");

const generateToken = ({ userId, email, tenantId }) => {
    return jwt.sign(
        {
            userId,
            email,
            ...(tenantId ? { tenantId } : {})
        },
        process.env.JWT_SECRET || "development-secret",
        {
            expiresIn: "1h"
        }
    );
};

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

    const token = generateToken({
        userId: user.id,
        email: user.email
    });

    return {
        user,
        token
    };
};

module.exports = {
    signupUser,
    loginUser,
    generateToken
};
