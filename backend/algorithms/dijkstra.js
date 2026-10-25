const PriorityQueue = require("./priorityQueue");

function calculateWeight(edge, mode) {

    if (mode === "shortest") {
        return edge.distance;
    }

    const baseTime = (edge.distance / edge.speed) * 60;

    const trafficMultiplier = 1 + edge.traffic;

    return baseTime * trafficMultiplier;
}


function dijkstra(graph, start, destination, mode = "shortest") {

    const distances = {};
    const previous = {};

    const visited = new Set();

    const priorityQueue = new PriorityQueue();

    let nodesExplored = 0;
    let edgesChecked = 0;

    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }

    distances[start] = 0;

    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {

        const current = priorityQueue.dequeue();

        const currentNode = current.value;

        if (visited.has(currentNode)) {
            continue;
        }

        visited.add(currentNode);

        nodesExplored++;

        if (currentNode === destination) {
            break;
        }

        const neighbors = graph[currentNode] || [];

        for (const edge of neighbors) {

            if (edge.blocked) {
                continue;
            }

            edgesChecked++;

            const weight = calculateWeight(edge, mode);

            const newDistance =
                distances[currentNode] + weight;

            if (newDistance < distances[edge.node]) {

                distances[edge.node] = newDistance;

                previous[edge.node] = currentNode;

                priorityQueue.enqueue(
                    edge.node,
                    newDistance
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

module.exports = dijkstra;