
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getExecutionController,
} = require("../controllers/workflowController");

const router = express.Router();

router.use(authMiddleware);

router.get("/:executionId", getExecutionController);

module.exports = router;
