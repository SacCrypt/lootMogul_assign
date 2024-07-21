const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookie_parser = require("cookie-parser");

const authRoute = require("./src/routes/authRoutes");
const weatherRoute = require("./src/routes/weatherRoutes");
const newsRoute = require("./src/routes/newRoutes");

dotenv.config();

const port = 5000;

app.use(express.json());
app.use(cors());
app.use(cookie_parser());

app.use("/api/", authRoute);
app.use("/api/weather", weatherRoute);
app.use("/api/news", newsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
