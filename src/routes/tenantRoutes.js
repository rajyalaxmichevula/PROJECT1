const express = require("express");

const {
    getAllTenants,
    switchTenantController
} = require("../controllers/tenantController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getAllTenants
);

router.post(
    "/switch",
    authMiddleware,
    switchTenantController
);

module.exports = router;