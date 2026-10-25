const PriorityQueue = require("./priorityQueue");
const locations = require("../data/locations");


function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) * Math.PI / 180;

    const dLon =
        (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return R * c;
}


function heuristic(node, destination) {

    const current = locations[node];

    const target = locations[destination];

    return calculateDistance(
        current.lat,
        current.lng,
        target.lat,
        target.lng
    );
}


function calculateWeight(edge, mode) {

    if (mode === "shortest") {
        return edge.distance;
    }

    const baseTime =
        (edge.distance / edge.speed) * 60;

    return baseTime * (1 + edge.traffic);
}


function astar(graph, start, destination, mode = "shortest") {

    const gScore = {};
    const fScore = {};
    const previous = {};

    const visited = new Set();

    const priorityQueue = new PriorityQueue();

    let nodesExplored = 0;
    let edgesChecked = 0;

    for (const node in graph) {

        gScore[node] = Infinity;
        fScore[node] = Infinity;
        previous[node] = null;
    }

    gScore[start] = 0;

    fScore[start] =
        heuristic(start, destination);

    priorityQueue.enqueue(
        start,
        fScore[start]
    );

    while (!priorityQueue.isEmpty()) {

        const current =
            priorityQueue.dequeue();

        const currentNode =
            current.value;

        if (visited.has(currentNode)) {
            continue;
        }

        visited.add(currentNode);

        nodesExplored++;

        if (currentNode === destination) {
            break;
        }

        const neighbors =
            graph[currentNode] || [];

        for (const edge of neighbors) {

            if (edge.blocked) {
                continue;
            }

            edgesChecked++;

            const weight =
                calculateWeight(edge, mode);

            const tentativeG =
                gScore[currentNode] + weight;

            if (tentativeG < gScore[edge.node]) {

                previous[edge.node] =
                    currentNode;

                gScore[edge.node] =
                    tentativeG;

                fScore[edge.node] =
                    tentativeG +
                    heuristic(
                        edge.node,
                        destination
                    );

                priorityQueue.enqueue(
                    edge.node,
                    fScore[edge.node]
                );
            }
        }
    }

    const path = [];

    let current = destination;

    if (
        current !== start &&
        previous[current] === null
    ) {
        return {
            success: false,
            path: [],
            distance: 0,
            nodesExplored: nodesExplored,
            edgesChecked: edgesChecked
        };
    }

    while (current !== null) {

        path.unshift(current);

        current = previous[current];
    }

    let distance = 0;
    let time = 0;

    for (let i = 0; i < path.length - 1; i++) {

        const from = path[i];
        const to = path[i + 1];

        const edge = graph[from].find(
            item => item.node === to
        );

        if (edge) {

            distance += edge.distance;

            const baseTime =
                (edge.distance / edge.speed) * 60;

            time +=
                baseTime *
                (1 + edge.traffic);
        }
    }

    return {
        success: true,
        path: path,
        distance: Number(distance.toFixed(2)),
        time: Number(time.toFixed(1)),
        nodesExplored: nodesExplored,
        edgesChecked: edgesChecked
    };
}

module.exports = astar;