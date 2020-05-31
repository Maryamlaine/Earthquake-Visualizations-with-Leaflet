var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3
  }); 


L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(map);


function chooseColor(magnitude){
    return magnitude > 5 ? "#581845":
    magnitude > 4 ? "#900C3F":
    magnitude > 3 ? "#C70039":
    magnitude > 2 ? "#FF5733":
    magnitude > 1 ? "#FFC300":
                    "#DAF7A6";
}

function markerSize(magnitude){
    return magnitude * 50000
}


d3.json(earthquakeURL, function(data) {
    createFeatures(data.features);
});


function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer){
    layer.bindPopup("<h3>Location: "+ feature.properties.place + "</h3><hr> Magnitude: " + feature.properties.mag +
    "<br> Time: " + feature.properties.time)
    }

    function pointToLayer(feature, latlng) {
        return L.circle(latlng, {
            fillOpacity: 0.75,
            color: "black",
            weight: 0.3,
            fillColor: chooseColor(feature.properties.mag),
            radius: markerSize(feature.properties.mag)
    })}

    var earthquakes = L.geoJson(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer
    });

    earthquakes.addTo(map);

    // Set Up Legend
    // Set Up Legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function(map) {


        var div = L.DomUtil.create("div", "info legend"), 
        Levels = [0, 1, 2, 3, 4, 5];

        div.innerHTML += "<h3>Magnitude</h3>"

        for (var i = 0; i < Levels.length; i++) {
            div.innerHTML +=
                '<i style="background: ' + chooseColor(Levels[i] + 1) + '"></i> ' +
                Levels[i] + (Levels[i + 1] ? '&ndash;' + Levels[i + 1] + '<br>' : '+');
        }
        return div;
    };
    // Add Legend to the Map
    legend.addTo(map);
};