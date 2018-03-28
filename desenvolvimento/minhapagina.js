// document.write("Teste arquivo externo");
window.onload = function() {
  //Criacao do mapa
  var mapa = L.map("meumapa").setView([-25.45, -49.27], 11);
  //Tile OpenStreetMap
  var osm = L.tileLayer("http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg").addTo(mapa);

  //Tile Mapbox
  var mapbox = L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
        id: "mapbox.pirates",
        accessToken: "pk.eyJ1IjoiZWR1YXJkb3NpbHZlcmlvIiwiYSI6ImNqZHVnOTZ5azNiaDEzM3FoNDdoem9udWkifQ.GsvrPIoq69zXdLWSlO2ykw"
    }
);

//Tasmania geoserver
var tasmania = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
        layers: "tasmania",
        transparent: "true",
        format: "image/png"
}).addTo(mapa);

//Pontos
var ponto1 = L.marker([-25.45, -49.27]);
    ponto2 = L.marker([-25.43, -49.29]);

//Linhas
var linha1 = L.polyline([[-25.4, -49.2], [-25.5, -49.1]]);
    linha2 = L.polyline([[-25.4, -49.1], [-25.5, -49.2]]);

//Poligono
var poligono = L.polygon([
    [-25.5, -49.3],
    [-25.5, -49.5],
    [-25.6, -49.3]
], {
  color: "#00ff00",
  fillColor: "000",
  fillOpacity: 1
});

//Circulo
var circulo = L.circle(
  [-25.45, -49.35],
  {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 5000
   }
);

 var pontos = L.layerGroup([ponto1, ponto2]).addTo(mapa);
 var linhas = L.layerGroup([linha1, linha2]).addTo(mapa);
// var combinacao = L.layerGroup([ponto1, ponto2,  linha1, linha2, osm]).addTo(mapa);

var baseCartografica = {
	"Base OpenStreetMap": osm,
	"Mapbox": mapbox
}

var informacaoTematica = {
	"Pontos": pontos,
	"Linhas": linhas,
	"Poligono": poligono,
	"Geoserver": tasmania
}

L.control.layers(baseCartografica, informacaoTematica).addTo(mapa);

L.control.scale({position: 'bottomleft'}).addTo(mapa);


// ponto.bindPopup("Eu sou um ponto!");
// linha.bindPopup("Eu sou uma linha!");
// poligono.bindPopup("Eu sou um polígono!");
// circulo.bindPopup("Eu sou um círculo");

// ponto.openPopup();
// linha.openPopup();
// poligono.openPopup();
// circulo.openPopup();

// var popup = L.popup()
//       .setLatLng([-25.44, -49.51])
//       .setContent("Eu sou uma popup!")
//       .openOn(mapa);

      // mapa.on('dragend', function (evento) {
      //   alert("Você moveu o mapa por : " + evento.distance.toFixed() + " pixels");
      // });




}
