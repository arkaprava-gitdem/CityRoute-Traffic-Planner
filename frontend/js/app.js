const sourceSelect =
    document.getElementById("source");

const destinationSelect =
    document.getElementById("destination");

const findRouteBtn =
    document.getElementById("findRoute");

const clearRouteBtn =
    document.getElementById("clearRoute");

const swapBtn =
    document.getElementById("swapBtn");

const errorBox =
    document.getElementById("error");

const results =
    document.getElementById("results");

const routePanel =
    document.getElementById("routePanel");

const distanceElement =
    document.getElementById("distance");

const timeElement =
    document.getElementById("time");

const nodesElement =
    document.getElementById("nodes");

const algorithmElement =
    document.getElementById("algorithm");

const modeElement =
    document.getElementById("mode");

const routeSteps =
    document.getElementById("routeSteps");

const routeDescription =
    document.getElementById("routeDescription");


let allLocations = [];


async function loadLocations() {

    try {

        const response =
            await fetch("/api/locations");

        const data =
            await response.json();

        allLocations =
            data.locations;

        allLocations.forEach(
            location => {

                const option1 =
                    document.createElement("option");

                option1.value =
                    location.name;

                option1.textContent =
                    location.name;

                sourceSelect.appendChild(
                    option1
                );


                const option2 =
                    document.createElement("option");

                option2.value =
                    location.name;

                option2.textContent =
                    location.name;

                destinationSelect.appendChild(
                    option2
                );
            }
        );


        showLocations(allLocations);

    } catch (error) {

        showError(
            "Unable to load city locations."
        );
    }
}


async function findRoute() {

    clearError();

    const source =
        sourceSelect.value;

    const destination =
        destinationSelect.value;


    const algorithm =
        document.querySelector(
            'input[name="algorithm"]:checked'
        ).value;


    const mode =
        document.querySelector(
            'input[name="mode"]:checked'
        ).value;


    if (!source || !destination) {

        showError(
            "Please select both source and destination."
        );

        return;
    }


    if (source === destination) {

        showError(
            "Source and destination must be different."
        );

        return;
    }


    findRouteBtn.disabled = true;

    findRouteBtn.textContent =
        "⏳ CALCULATING...";


    try {

        const response =
            await fetch(
                "/api/route",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        source,
                        destination,
                        algorithm,
                        mode
                    })
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            showError(
                data.message ||
                "Route not found."
            );

            return;
        }


        displayResult(data);

    } catch (error) {

        console.error(error);

        showError(
            "Server connection failed."
        );

    } finally {

        findRouteBtn.disabled = false;

        findRouteBtn.textContent =
            "🚀 FIND BEST ROUTE";
    }
}


function displayResult(data) {

    distanceElement.textContent =
        `${data.distance} km`;

    timeElement.textContent =
        `${data.time} min`;

    nodesElement.textContent =
        data.nodesExplored;

    algorithmElement.textContent =
        data.algorithm;

    modeElement.textContent =
        data.mode;


    results.classList.remove(
        "hidden"
    );


    routePanel.classList.remove(
        "hidden"
    );


    routeDescription.textContent =
        `${data.algorithm} calculated the optimal route from ${data.path[0]} to ${data.path[data.path.length - 1]}.`;


    routeSteps.innerHTML = "";


    data.path.forEach(
        (location, index) => {

            const step =
                document.createElement("div");

            step.className =
                "route-step";

            step.textContent =
                location;

            routeSteps.appendChild(
                step
            );


            if (
                index <
                data.path.length - 1
            ) {

                const arrow =
                    document.createElement("span");

                arrow.className =
                    "arrow";

                arrow.textContent =
                    "→";

                routeSteps.appendChild(
                    arrow
                );
            }
        }
    );


    drawRoute(
        data.path,
        allLocations
    );
}


function clearRoute() {

    sourceSelect.value = "";

    destinationSelect.value = "";

    results.classList.add(
        "hidden"
    );

    routePanel.classList.add(
        "hidden"
    );

    clearError();

    clearMap();

    showLocations(allLocations);
}


function swapLocations() {

    const temp =
        sourceSelect.value;

    sourceSelect.value =
        destinationSelect.value;

    destinationSelect.value =
        temp;
}


function showError(message) {

    errorBox.textContent =
        message;
}


function clearError() {

    errorBox.textContent =
        "";
}


findRouteBtn.addEventListener(
    "click",
    findRoute
);


clearRouteBtn.addEventListener(
    "click",
    clearRoute
);


swapBtn.addEventListener(
    "click",
    swapLocations
);


loadLocations();