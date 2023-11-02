import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axiosClient from '../../../axios-client.js';
import { useNotificationContext } from "../../../contexts/NotificationProvider.jsx";
export default function RealTimeDeliveryTrack() {



    let { id } = useParams();
    const mapRef = useRef(null);
    const navigate = useNavigate();
    function hideThirdMarker() {
        // Check if the third img element exists before removing it
        const leafletMarkerPane = document.querySelector('.leaflet-marker-pane');
        if (leafletMarkerPane) {
            const imgElements = leafletMarkerPane.querySelectorAll('img');
            if (imgElements.length >= 3) {
                leafletMarkerPane.removeChild(imgElements[2]); // Remove the third img element
            }
        }
    }
    const taxiIcon = L.icon({
        iconUrl: '../../../assets/img/taxi.png',
        iconSize: [50, 50]
    })




    //fetch delivery data
    // useEffect(() => {
    //   getDelivery();
    // }, [])




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
    const getAddressFromData = (data) => {
        let address = '';
        if (data.street) {
            address += data.street + ", ";
        }
        if (data.city) {
            address += data.city + ", ";
        }
        if (data.state) {
            address += data.state + ", ";
        }
        if (data.postcode) {
            address += data.postcode;
        }
        return address;
    };

    const updateDelivery = async (longitude, latitude, accuracy) => {
        console.log("updating");

        const payload = {
            longitude: longitude,
            latitude: latitude,
            accuracy: accuracy
        };
        try {
            await axiosClient
                .put(`/delivery/${id}`, payload)
                .then((data) => {
                    console.log(data)
                });
        } catch (error) {
            console.log(error);

        }
    };


    useLayoutEffect(() => {

        const map = L.map(mapRef.current).setView([28.2380, 83.9956], 11);
        var originLatitude = null;
        var originLongitude = null;
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);


        if (!navigator.geolocation) {
            console.log("Your browser doesn't support geolocation feature!")
        } else {


            axiosClient
                .get(`/userDelivery/${id}`)
                .then(({ data }) => {
                    console.log(data);

                    // After setting the address data, call getLatLng
                    const address = getAddressFromData(data);

                    console.log(address)
                    getLatLng(address)
                        .then(location => {
                            console.log('Latitude:', location.latitude);
                            console.log('Longitude:', location.longitude);

                            // Create waypoints
                            const startWaypoint = L.latLng(location.latitude, location.longitude);
                            const endWaypoint = L.latLng(originLatitude, originLongitude);

                            var newMarker = L.marker([location.latitude, location.longitude]).addTo(map);

                            // Now, create the routing control and set the waypoints
                            L.Routing.control({
                                waypoints: [startWaypoint, endWaypoint], // Set the waypoints
                            }).addTo(map);
                        })
                        .catch(error => {
                            setWarningNotification("Geocoding Failed", "Customer address could not be found in the geolocation service. You Only Able To See The Delivery Man Current Location.");
                        });
                })
                .catch((error) => {
                    console.log(error);
                    setWarningNotification("Geocoding Failed", "Customer address could not be found in the geolocation service. You Only Able To See The Delivery Man Current Location.");
                    // navigate('/myOrder');
                });



            //when first time get user current location
            navigator.geolocation.getCurrentPosition(getPosition)

            //refresh location data in an interval
            setInterval(() => {
                navigator.geolocation.getCurrentPosition(getPosition)
            }, 10000);
        }
        var marker, circle;
        function getPosition(position) {
            // console.log(position)

            var lat = position.coords.latitude
            var long = position.coords.longitude
            var accuracy = position.coords.accuracy
            if (originLatitude == null && originLongitude == null) {
                originLatitude = lat;
                originLongitude = long;
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
            hideThirdMarker()
            var featureGroup = L.featureGroup([marker, circle]).addTo(map)

            map.fitBounds(featureGroup.getBounds())



            console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)

            //update the latest delivery man current location
            updateDelivery(long, lat, accuracy)
        }


        return () => {
            map.remove();
        };
    }, []);

    return (<div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }}>  <Helmet>
        <link rel="stylesheet" href="../../../../assets/css/realtimeTracking.css" />
    </Helmet>
    </div>

        //how can i display inline style with 
        //.leaflet-pane leaflet-marker-pane  img:nth-of-type(3) {
        //   display: none;
        // }

    );
}
