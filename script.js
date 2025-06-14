// script.js

var map = L.map('map').setView([48.0, 8.0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Start- en eindiconen
const startIcon = L.divIcon({
    html: '<span class="material-symbols-outlined" style="color: #1e8e3e;">play_circle</span>',
    className: 'gpx-marker',
    iconSize: [48, 48],
    iconAnchor: [24, 48]
});

const endIcon = L.divIcon({
    html: '<span class="material-symbols-outlined" style="color: #d93025;">flag</span>',
    className: 'gpx-marker',
    iconSize: [48, 48],
    iconAnchor: [24, 48]
});

fetch('reizen.json')
    .then(response => response.json())
    .then(reizen => {
        let loadedBounds = L.latLngBounds();

        reizen.forEach(reis => {
            if (!reis.gpxBestand) return;

            new L.GPX(reis.gpxBestand, {
                async: true,
                marker_options: { startIcon, endIcon, shadowUrl: '' },
                gpx_options: { joinTrackSegments: false }
            }).on('loaded', function(e) {
                // --- NIEUWE, VEREENVOUDIGDE POPUP-CONTENT ---

                // 1. Bouw de HTML voor de infolijst
                let infoLijst = '<ul class="info-lijst">';
                if (reis.info) {
                    // Loop door alle key-value paren in het info-object
                    for (const [key, value] of Object.entries(reis.info)) {
                        infoLijst += `<li><strong>${key}:</strong> ${value}</li>`;
                    }
                }
                infoLijst += '</ul>';

                // 2. Bouw de volledige HTML voor de popup
                const popupContent = `
                    <div class="popup-header">
                        <h3>${reis.titel}</h3>
                        <p>${reis.datum}</p>
                    </div>
                    ${reis.info ? infoLijst : ''}
                `;

                // 3. Bind de popup aan de laag
                this.bindPopup(popupContent);

                // Werk de kaartgrenzen bij
                loadedBounds.extend(e.target.getBounds());
                map.fitBounds(loadedBounds);

            }).addTo(map);
        });
    })
    .catch(error => console.error('Fout bij het laden van reizen.json:', error));