const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const quoteRoutes = require("./routes/quoteRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/quote", quoteRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server Running");
});