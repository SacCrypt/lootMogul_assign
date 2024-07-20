const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const { Pool } = require("pg");

const authRoutes = require("./src/routes/authRoutes");
const weatherRoutes = require("./src/routes/weatherRoutes");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
