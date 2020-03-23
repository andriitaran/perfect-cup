const express = require("express");
const app = express();
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const dataRoute = require("./routes/api/data");
app.use("/data", dataRoute);

const shopsRoute = require("./routes/api/shops");
app.use("/shops", shopsRoute);

// start the server and listen on port 5000
app.listen(PORT, () => {
  console.log(`server is running at: ${BACKEND_URL}:${PORT}`);
});
