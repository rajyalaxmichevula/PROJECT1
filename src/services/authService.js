const signupUser = async ({ name, email, password }) => {
    return {
        name,
        email
    };
};

module.exports = {
    signupUser
};