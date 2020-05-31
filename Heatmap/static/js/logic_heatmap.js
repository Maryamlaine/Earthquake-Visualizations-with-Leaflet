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

d3.json(earthquakeURL, function(data) {
    response = data.features;
  
    var heatArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i].geometry;
        console.log(location);
  
      if (location) {
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 25,
      maxZoom: 12,
      minOpacity: 0.5,
      radius: 10,
      max: 1,
      blur: 10,
      gradient: {
          0: "#000000",
          0.2: "#570000",
          0.4: "#ff0000",
          0.6: "#ffc800",
          0.8: "#ffff00",
          "1.0": "#FFFFFF" ,
      }
  }).addTo(map)
});