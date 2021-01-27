const express = require("express");
const app = express();
require("dotenv").config();
const { PORT, BACKEND_URL, DB_CONNECT } = process.env;
const cors = require("cors");
const mongoose = require("mongoose");

// DB CONNECT
mongoose.connect(DB_CONNECT, { useMongoClient: true });

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
const dataRoute = require("./routes/api/data");
app.use("/data", dataRoute);

const authRoute = require("./routes/api/auth");
app.use("/user", authRoute);

const shopsRoute = require("./routes/api/shops");
app.use("/shops", shopsRoute);

// START SERVER AND LISTEN ON PORT 5000
app.listen(PORT, () => {
  console.log(`server is running at: ${BACKEND_URL}:${PORT}`);
});
