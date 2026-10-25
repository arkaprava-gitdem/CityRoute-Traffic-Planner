const map =
    L.map("map").setView(
        [22.5726, 88.3639],
        12
    );


L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            "&copy; OpenStreetMap contributors"
    }
).addTo(map);


let routeLine = null;

let markers = [];


function clearMap() {

    if (routeLine) {

        map.removeLayer(routeLine);

        routeLine = null;
    }

    markers.forEach(
        marker => map.removeLayer(marker)
    );

    markers = [];
}


function showLocations(locations) {

    locations.forEach(location => {

        const marker =
            L.marker([
                location.lat,
                location.lng
            ])
            .addTo(map)
            .bindPopup(
                `<strong>${location.name}</strong>`
            );

        markers.push(marker);
    });
}


function drawRoute(path, locations) {

    if (routeLine) {
        map.removeLayer(routeLine);
    }

    const coordinates =
        path.map(name => {

            const location =
                locations.find(
                    item => item.name === name
                );

            return [
                location.lat,
                location.lng
            ];
        });


    routeLine =
        L.polyline(
            coordinates,
            {
                weight: 6,
                opacity: 0.9
            }
        ).addTo(map);


    map.fitBounds(
        routeLine.getBounds(),
        {
            padding: [40, 40]
        }
    );
}