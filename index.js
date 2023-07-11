const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("./routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running in port: ${PORT}`));
