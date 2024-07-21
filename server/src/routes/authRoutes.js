const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/admin",
  verifyToken,
  checkRole("admin"),
  authController.checkAdmin
);

module.exports = router;
