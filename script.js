var map = L.map('map').setView([51.505, -0.09], 4); // Stel het beginweergavepunt en de zoomniveau in

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Voeg de GPX-track toe aan de kaart
var gpx = 'gpx/route_1_alex_tincave.gpx'; // Vervang dit met de naam van je GPX-bestand
new L.GPX(gpx, {
    async: true,
    marker_options: {
        startIconUrl: '',
        endIconUrl: '',
        shadowUrl: ''
        }
}).on('loaded').addTo(map);

// Voeg de GPX-track toe aan de kaart
var gpx = 'gpx/route_2_italiaanse_alpen.gpx'; // Vervang dit met de naam van je GPX-bestand
new L.GPX(gpx, {
    async: true,
    marker_options: {
        startIconUrl: '',
        endIconUrl: '',
        shadowUrl: ''
        }
}).on('loaded').addTo(map);
