const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(`token is ${token}`);
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to authenticate token." });
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

const checkRole = (role) => (req, res, next) => {
  if (req.userRole !== role) {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

module.exports = { verifyToken, checkRole };
