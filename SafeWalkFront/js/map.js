// =====================
//  INITIALIZE MAP
// =====================
var map = L.map('map').setView([12.9716, 77.5946], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


// =====================
//  TOMTOM API KEY
// =====================
const TOMTOM_KEY = "YOUR_API_KEY_HERE";


// =====================
//  FUNCTION: GEOCODE ADDRESS → LAT LONG
// =====================
async function geocode(query) {
    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(query)}.json?key=${TOMTOM_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length === 0) {
        alert("Location not found: " + query);
        return null;
    }

    return data.results[0].position; // {lat, lon}
}


// =====================
//  FUNCTION: DRAW ROUTE ON MAP
// =====================
let routeLayer;

async function drawRoute(start, dest) {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${start.lat},${start.lon}:${dest.lat},${dest.lon}/json?instructionsType=text&key=${TOMTOM_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.routes) {
        alert("No route found.");
        return;
    }

    const points = data.routes[0].legs[0].points.map(p => [p.latitude, p.longitude]);

    // Remove old route if exists
    if (routeLayer) map.removeLayer(routeLayer);

    // Draw new route
    routeLayer = L.polyline(points, { color: "blue", weight: 5 }).addTo(map);

    map.fitBounds(routeLayer.getBounds());

    // Temporary fake safety score
    document.getElementById("score").innerText = (Math.random() * 10).toFixed(2);
}


// =====================
//  MAIN: On click Find Route
// =====================
document.getElementById("findRouteBtn").addEventListener("click", async () => {
    let start = document.getElementById("startInput").value.trim();
    let dest = document.getElementById("destInput").value.trim();

    if (!dest) return alert("Enter destination");

    let startCoords;

    // If start = "current", use live location
    if (start.toLowerCase() === "current" || start === "") {
        const pos = await new Promise(resolve =>
            navigator.geolocation.getCurrentPosition(resolve)
        );
        startCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
    } 
    else {
        startCoords = await geocode(start);
    }

    let destCoords = await geocode(dest);

    if (!startCoords || !destCoords) return;

    drawRoute(startCoords, destCoords);
});
