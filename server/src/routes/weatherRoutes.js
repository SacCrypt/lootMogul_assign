const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, weatherController.weatherRoute);

module.exports = router;
