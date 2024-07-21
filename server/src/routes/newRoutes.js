const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", verifyToken, newsController.newsRoute);

module.exports = router;
