$("document").ready(function(){
  console.log("loaded");

  var map = L.map('map', {
      // latitude then longtitude
      center: [1.290270, 103.851959],
      zoom: 13
  });
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
   attribution: '<a href="http://mapbox.com">Mapbox</a>',
   maxZoom: 18,
   zoomControl: false,
   accessToken: 'pk.eyJ1IjoiZXVnZW5lb2VpIiwiYSI6ImNpdDlnanl3bTBqNm8yb3AydGIzdnFncHQifQ.xbhCGgpxzfwL_NtEFDWkXg'
  }).addTo(map)

  // global variable to store lat-long pair values
  var coordinates = [];
  // attach all latitude values to an array
  var latitude = document.getElementsByClassName("latitude");
  // attach all longitude values to an array
  var longitude = document.getElementsByClassName("longitude");

  // both latitude.length or longitude.length will work fine
  // since they both come as a pair
  for (var i = 0; i < latitude.length; i++) {
  	var pairLatLong = [];
  	pairLatLong.push( latitude[i].value, longitude[i].value );
  	coordinates.push(pairLatLong);
  }

  console.log(coordinates);

  for (var i = 0; i < coordinates.length; i++) {
    L.marker(coordinates[i]).addTo(map);
  }


  // L.marker([1.375133, 103.846914]).addTo(map);


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


  // var address = document.getElementsById("address").textContent;
  //
  // coordinates.push(address);
  //
  // console.log(coordinates);



});

// http://api.mapbox.com/v4/mapbox.streets.html?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbTgzcHQxMzAxMHp0eWx4bWQ1ZHN2NGcifQ.WVwjmljKYqKciEZIC3NfLA#17/1.35808/103.84800

// the below is a public token
// pk.eyJ1IjoiZXVnZW5lb2VpIiwiYSI6ImNpdDlnanl3bTBqNm8yb3AydGIzdnFncHQifQ.xbhCGgpxzfwL_NtEFDWkXg
// different type of tile layers can google for different styles
// load tile layer
