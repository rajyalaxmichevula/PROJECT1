const express = require("express");
const { signup, login, getMe } = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../validators/authValidator");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", validateSignup, signup);

router.post("/login", validateLogin, login);

router.get("/me", authMiddleware, getMe);
module.exports = router;