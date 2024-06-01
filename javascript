var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        subdomains:['mt0','mt1','mt2','mt3']});

var url = 'Nepal.json';
var hospital = 'hospital.geojson';

// Set style function that sets fill color property
function style(feature) {
    return {
        fillColor: 'blue',
        fillOpacity: 0.5,
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        dashArray: '3'
    };
}
    var highlight = {
        'fillColor': 'yellow',
        'weight': 2,
        'opacity': 1
    };

        function forEachFeature(feature, layer) {

            var popupContent = "<p><b>DISTRICT: </b>"+ feature.properties.ADM2NM_1 +
                "</br>DISTRICT CODE: "+ feature.properties.ADM2CD +
                "</br>PROVINCE: "+ feature.properties.ADM1NM +
                "</br>PROVINCE CODE: "+ feature.properties.ADM1CD +'</p>';
        
            layer.bindPopup(popupContent);
        
            layer.on("click", function (e) {
                theLayer.setStyle(style); //resets layer colors
                layer.setStyle(highlight);  //highlights selected.
            });
        }   

        function forEachFeaturehos(feature, layer) {

            var popupContent = "<p><b>Name: </b>"+ feature.properties.name +
                "</br>Type: "+ feature.properties.amenity +
                "</br>Website: "+ feature.properties.website +
                '</p>';
        
            layer.bindPopup(popupContent);
        
              
            }
        


var map = L.map('map', {
    center: [27.68723120070982, 85.32372326123497],
    zoom: 12,
    layers: [osm]
});


// Null variable that will hold layer nepal
var theLayer = L.geoJson(null, {onEachFeature: forEachFeature, style: style});

$.getJSON(url, function(data) {
    theLayer.addData(data);
});

theLayer.addTo(map);



// Null variable that will hold layer hospital
var health = L.geoJson(null, {onEachFeature: forEachFeaturehos, style: style});

$.getJSON(hospital, function(data) {
    health.addData(data);
});

health.addTo(map);


var baseLayers = {
    'OpenStreetMap': osm,
    'OpenStreetMap.HOT': osmHOT,
    'satellite': googleSat
};
var overlayMaps = { 'District Boundary':theLayer,
                     'Hospital':health

};

var layerControl = L.control.layers(baseLayers, overlayMaps).addTo(map);

