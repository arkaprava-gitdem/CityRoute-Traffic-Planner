const express = require("express");

const cors = require("cors");

const path = require("path");

const routeRoutes =
    require("./routes/routeRoutes");


const app = express();

const PORT = 5000;


app.use(cors());

app.use(express.json());


app.use(
    "/api",
    routeRoutes
);


app.use(
    express.static(
        path.join(
            __dirname,
            "../frontend"
        )
    )
);


app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );
});


app.listen(PORT, () => {

    console.log(
        `🚦 CityRoute server running at http://localhost:${PORT}`
    );

});