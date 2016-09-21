$("document").ready(function(){
  console.log("loaded");

  var map = L.map('map', {
      // latitude then longtitude
      center: [1.290270, 103.851959],
      zoom: 11
  });
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
   attribution: '<a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
   zoomControl: false,
   accessToken: 'pk.eyJ1IjoiZXVnZW5lb2VpIiwiYSI6ImNpdDlnanl3bTBqNm8yb3AydGIzdnFncHQifQ.xbhCGgpxzfwL_NtEFDWkXg'
 }).addTo(map)

//  var map = L.map('map', {
//      // latitude then longtitude
//      center: [1.290270, 103.851959],
//      zoom: 13
//  });
//  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: '<a href="http://mapbox.com">Mapbox</a>',
//   maxZoom: 18,
//   zoomControl: false,
//   accessToken: 'pk.eyJ1IjoiZXVnZW5lb2VpIiwiYSI6ImNpdDlnanl3bTBqNm8yb3AydGIzdnFncHQifQ.xbhCGgpxzfwL_NtEFDWkXg'
// }).addTo(map)

  // $("#rightContainer").on("click", "#create", create);
  $("#rightContainer").on("click", "#categories", displayCategories);


});

function displayCategories() {
  console.log("categories button clicked");
  $("#rightContainer").append(
    "<div>" +
      "<a href='posting/categories/cafes'>CAFES</a>" +
    "</div>"
  )
}
