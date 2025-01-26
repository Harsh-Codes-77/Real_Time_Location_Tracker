**Real Time Location Tracker Using Socket.io**

Things We Do: 

1. Check the browsers supports geolocation.
2. Set option for high accuracy, a 5 second timeout, and no caching.
3. Use watchPosition to track the users location continuously.
4. Emit the latitude and longitude via a socket with "send-location". Log any errors to the console.
5. Initialize the map centered at coordinates (0,0) with a zoom level of 15 using Leaflet. Add OpenStreetMap tiles to the map.
6. Create an empty object markers.
7. When receiving location data via socket, extract id, latitude, and longitude, and center the map on the new coordinates.
8. If a marker for the id exists, update its position, otherwise, create a new marker at the given coordinates and add it to the map. When a user disconnects, remove their marker from the map and delete it from markers.

Dependencies you need to install:

1.     npm install ejs

2.     npm install express

3.     npm install socket.io

Also you can use this localhost server your another devices by creating a link from **ngrok**
