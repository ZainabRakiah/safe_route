const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/incidents", require("./routes/incidentRoutes"));

app.get("/", (req, res) => {
    res.send("SafeWalk API running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
