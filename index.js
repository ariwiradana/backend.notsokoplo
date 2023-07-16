const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
require("./routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running in port: ${PORT}`));
