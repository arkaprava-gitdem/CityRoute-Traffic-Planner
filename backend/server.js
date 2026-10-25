const express = require("express");
const cors = require("cors");
const path = require("path");

const routeRoutes = require("./routes/routeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", routeRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Main page
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`CityRoute running on port ${PORT}`);
});