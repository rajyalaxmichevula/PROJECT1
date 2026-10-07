const express = require("express");
const { signup } = require("../controllers/authController");
const { validateSignup } = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", validateSignup, signup);

module.exports = router;