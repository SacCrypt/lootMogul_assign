const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const logger = require("../../logger");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  {
    const { username, password, role = "user" } = req.body;

    if (!username || !password) {
      logger.error(
        "Username or password are not passed along with request for registration"
      );

      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
        [username, hashedPassword, role]
      );
      logger.info(
        `User ${username} is registered successfully with role ${role}`
      );
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      logger.error(`Error registering user due to ${error}`);
      res.status(500).json({ message: "Failed to register user." });
    }
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logger.error(
      "Username or password are not passed along with request for login."
    );
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.json({ token });
    } else {
      logger.info("Invalid credentials");
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    logger.error(`Error logging in: ${error}`);
    res.status(500).json({ message: "Failed to log in." });
  }
};

exports.checkAdmin = (req, res) => {
  res.json({ message: "Welcome, admin!" });
};
