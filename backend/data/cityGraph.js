const graph = {
    "Salt Lake": [
        {
            node: "New Town",
            distance: 8.5,
            speed: 40,
            traffic: 0.35,
            blocked: false
        },
        {
            node: "Sealdah",
            distance: 6.2,
            speed: 35,
            traffic: 0.45,
            blocked: false
        }
    ],

    "New Town": [
        {
            node: "Salt Lake",
            distance: 8.5,
            speed: 40,
            traffic: 0.35,
            blocked: false
        },
        {
            node: "Airport",
            distance: 10.5,
            speed: 45,
            traffic: 0.25,
            blocked: false
        },
        {
            node: "Sealdah",
            distance: 9.2,
            speed: 35,
            traffic: 0.55,
            blocked: false
        }
    ],

    "Airport": [
        {
            node: "New Town",
            distance: 10.5,
            speed: 45,
            traffic: 0.25,
            blocked: false
        },
        {
            node: "Shyambazar",
            distance: 12.5,
            speed: 35,
            traffic: 0.65,
            blocked: false
        }
    ],

    "Sealdah": [
        {
            node: "Salt Lake",
            distance: 6.2,
            speed: 35,
            traffic: 0.45,
            blocked: false
        },
        {
            node: "New Town",
            distance: 9.2,
            speed: 35,
            traffic: 0.55,
            blocked: false
        },
        {
            node: "Esplanade",
            distance: 3.5,
            speed: 30,
            traffic: 0.75,
            blocked: false
        },
        {
            node: "Shyambazar",
            distance: 4.2,
            speed: 30,
            traffic: 0.60,
            blocked: false
        }
    ],

    "Esplanade": [
        {
            node: "Sealdah",
            distance: 3.5,
            speed: 30,
            traffic: 0.75,
            blocked: false
        },
        {
            node: "Park Street",
            distance: 2.0,
            speed: 25,
            traffic: 0.80,
            blocked: false
        },
        {
            node: "Howrah",
            distance: 3.8,
            speed: 30,
            traffic: 0.65,
            blocked: false
        }
    ],

    "Park Street": [
        {
            node: "Esplanade",
            distance: 2.0,
            speed: 25,
            traffic: 0.80,
            blocked: false
        },
        {
            node: "Gariahat",
            distance: 5.5,
            speed: 30,
            traffic: 0.50,
            blocked: false
        }
    ],

    "Howrah": [
        {
            node: "Esplanade",
            distance: 3.8,
            speed: 30,
            traffic: 0.65,
            blocked: false
        },
        {
            node: "Shyambazar",
            distance: 6.0,
            speed: 30,
            traffic: 0.45,
            blocked: false
        }
    ],

    "Shyambazar": [
        {
            node: "Howrah",
            distance: 6.0,
            speed: 30,
            traffic: 0.45,
            blocked: false
        },
        {
            node: "Sealdah",
            distance: 4.2,
            speed: 30,
            traffic: 0.60,
            blocked: false
        },
        {
            node: "Airport",
            distance: 12.5,
            speed: 35,
            traffic: 0.65,
            blocked: false
        }
    ],

    "Gariahat": [
        {
            node: "Park Street",
            distance: 5.5,
            speed: 30,
            traffic: 0.50,
            blocked: false
        },
        {
            node: "Jadavpur",
            distance: 4.5,
            speed: 35,
            traffic: 0.40,
            blocked: false
        }
    ],

    "Jadavpur": [
        {
            node: "Gariahat",
            distance: 4.5,
            speed: 35,
            traffic: 0.40,
            blocked: false
        }
    ]
};

module.exports = graph;