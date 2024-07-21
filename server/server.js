const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken, checkRole } = require("./src/middlewares/authMiddleware");

dotenv.config();

const port = 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

app.post("/api/auth/register", async (req, res) => {
  const { username, password, role = "user" } = req.body;

  if (!username || !password) {
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

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
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
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Failed to log in." });
  }
});

app.get("/api/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

app.get("/api/user", verifyToken, checkRole("user"), (req, res) => {
  res.json({ message: "Welcome, user!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
