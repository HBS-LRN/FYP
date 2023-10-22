// Map initialization 
var map = L.map('map').setView([28.2380, 83.9956], 11);
var originLatitude = null;
var originLongitude = null;
//osm layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);




if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    const address = '142,jalan 1A/6,47000 Sungai Buloh';
    getLatLng(address)
        .then(location => {
            console.log('Latitude:', location.latitude);
            console.log('Longitude:', location.longitude);

            var newMarker = L.marker([location.latitude, location.longitude]).addTo(map);
            L.Routing.control({
                waypoints: [
                    L.latLng(originLatitude, originLongitude),
                    L.latLng(location.latitude, location.longitude)
                ]
            }).addTo(map);
        })
        .catch(error => {
            console.error('Geocoding failed:', error);
        });
    navigator.geolocation.getCurrentPosition(getPosition)
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 5000);
}
var taxiIcon = L.icon({
    iconUrl: 'taxi.png',
    iconSize: [50, 50]
})
var marker, circle;

function getPosition(position) {
    // console.log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy
    if (originLatitude == null && originLongitude == null) {
        this.originLatitude = lat;
        this.originLongitude = long;
        console.log("first");
    }

    if (marker) {
        map.removeLayer(marker)
    }

    if (circle) {
        map.removeLayer(circle)
    }

    marker = L.marker([lat, long], { icon: taxiIcon })
    circle = L.circle([lat, long], { radius: accuracy })

    var featureGroup = L.featureGroup([marker, circle]).addTo(map)

    map.fitBounds(featureGroup.getBounds())

    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
}

function getLatLng(address) {
    return new Promise((resolve, reject) => {
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

        fetch(nominatimUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const result = data[0];
                    const { lat, lon } = result;
                    resolve({ latitude: lat, longitude: lon });
                } else {
                    reject(new Error('Geocoding failed'));
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}