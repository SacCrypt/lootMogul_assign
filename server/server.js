const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const authRoute = require("./src/routes/authRoutes");
const weatherRoute = require("./src/routes/weatherRoutes");

dotenv.config();

const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/", authRoute);
app.use("/api/weather", weatherRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
