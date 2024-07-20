const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, weatherController.weatherRoute);

module.exports = router;
