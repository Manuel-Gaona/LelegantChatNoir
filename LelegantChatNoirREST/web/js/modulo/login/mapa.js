/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


mapboxgl.accessToken = "pk.eyJ1IjoiZ2FiaWRpbm9vbyIsImEiOiJjbHpuZDY5OG4wbTlvMmtxMnpmNXo5Z3g3In0.zJUbbmddeygXpjxx0V7dfQ";

const apiKey = "4khE2o8TsRXG5HslTGPwHJ2OpWZ_i7Zbgqfnu6Nialw";
const direccion = "Blvd. Aeropuerto No. 104, Cerrito de Jerez, 37545 León de los Aldama, Gto.";
const latd = 21.1025497;
const long = -101.7182172;

fetch('https://geocode.search.hereapi.com/v1/geocode?q=' + direccion + '&apiKey=' + apiKey)
        .then(response => response.json())
        .then(response => {
            const latitud = response.items[0].position.lat;
            const longitud = response.items[0].position.lng;

            console.log(longitud);

            const mapa = new mapboxgl.Map({
                container: "contenedor-del-mapa",
                style: "mapbox://styles/mapbox/streets-v12",
                center: [longitud, latitud],
                zoom: 15
            });

            const marcador = new mapboxgl.Marker({
                color: "green",
                rotation: 45
            }).setLngLat([longitud, latitud]).addTo(mapa);
        });

fetch('https://revgeocode.search.hereapi.com/v1/revgeocode?at=' + latd +','+ long + '&apiKey=' + apiKey)
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });