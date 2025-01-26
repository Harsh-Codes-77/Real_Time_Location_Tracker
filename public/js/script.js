// const socketio = io();

// if(navigator.geolocation){
//     navigator.geolocation.watchPosition((position) => {
//         const {latitude, longitude} = position.coords;
//         socketio.emit("send-location", {latitude, longitude});
//     }, (error) => {
//         console.error(error);
//     },
//     {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//     }
//     );
// } else {
//     console.log("Geolocation is not supported by your browser.")
// }

// const map = L.map("map").setView([0, 0], 7);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Harsh-Codes-77"
// }).addTo(map)

// const markers = {};

// socketio.on("receive-location", (data) => {
//     const {id, latitude, longitude} = data;
//     map.setView([latitude, longitude]);
//     if(markers[id]){
//         markers[id].setLatLng([latitude, longitude]);
//     } else{
//         markers[id] = L.marker([latitude, longitude]).addTo(map);
//     }
// });


const socketio = io();

const map = L.map("map").setView([0, 0], 16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

const markers = {};

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socketio.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error("Geolocation error:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 0,
        }
    );
} else {
    console.error("Geolocation is not supported by your browser.");
}

socketio.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    map.setView([latitude, longitude]);

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socketio.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});