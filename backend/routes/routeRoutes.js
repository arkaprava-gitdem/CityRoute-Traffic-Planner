const express = require("express");

const router = express.Router();

const graph = require("../data/cityGraph");

const locations = require("../data/locations");

const dijkstra =
    require("../algorithms/dijkstra");

const astar =
    require("../algorithms/astar");


router.get("/locations", (req, res) => {

    res.json({
        success: true,
        locations: Object.values(locations)
    });
});


router.post("/route", (req, res) => {

    try {

        const {
            source,
            destination,
            algorithm = "dijkstra",
            mode = "shortest"
        } = req.body;

        if (!source || !destination) {

            return res.status(400).json({
                success: false,
                message: "Source and destination are required."
            });
        }

        if (!graph[source]) {

            return res.status(400).json({
                success: false,
                message: "Invalid source location."
            });
        }

        if (!graph[destination]) {

            return res.status(400).json({
                success: false,
                message: "Invalid destination location."
            });
        }

        if (source === destination) {

            return res.status(400).json({
                success: false,
                message: "Source and destination must be different."
            });
        }

        let result;

        if (algorithm === "astar") {

            result =
                astar(
                    graph,
                    source,
                    destination,
                    mode
                );

        } else {

            result =
                dijkstra(
                    graph,
                    source,
                    destination,
                    mode
                );
        }

        res.json({
            ...result,
            algorithm:
                algorithm === "astar"
                    ? "A* Search"
                    : "Dijkstra",
            mode:
                mode === "shortest"
                    ? "Shortest Distance"
                    : "Fastest Route"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Route calculation failed."
        });
    }
});


module.exports = router;