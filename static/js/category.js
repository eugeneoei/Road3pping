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


  // L.MakiMarkers.accessToken = "pk.eyJ1IjoiZXVnZW5lb2VpIiwiYSI6ImNpdDlnanl3bTBqNm8yb3AydGIzdnFncHQifQ.xbhCGgpxzfwL_NtEFDWkXg";
  // var icon = L.MakiMarkers.icon({icon: "rocket", color: "#b0b", size: "m"});
  // L.marker([30.287, -97.72], {icon: icon}).addTo(map);

  // global variable to store lat-long pair values
  var coordinates = [];
  // attach all latitude values to a variable
  var latitude = document.getElementsByClassName("latitude");
  // attach all longitude values to a variable
  var longitude = document.getElementsByClassName("longitude");
  // attach all title values to a variable
  var title = document.getElementsByClassName("title");

  console.log(title);

  // both latitude.length or longitude.length will work fine
  // since they both come as a pair
  for (var i = 0; i < latitude.length; i++) {
  	var pairLatLong = [];
  	pairLatLong.push( latitude[i].value, longitude[i].value );
  	coordinates.push(pairLatLong);
  }

  console.log(coordinates);


  for (var i = 0; i < coordinates.length; i++) {
    // L.marker(coordinates[i]).addTo(map).bindPopup(title[i].value).openPopup();

    var circle = L.circle(coordinates[i], 200, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);

    circle.bindPopup(title[i].value);

    // L.marker([30.287, -97.72], {icon: icon}).addTo(map);
    // var markers = [];
    // markers.push(marker);
    // var cities = L.layerGroup(markers);
    // console.log(cities);
  }
  // marker.bindPopup("title").openPopup();


  // L.marker([1.2790971, 103.8414975]).addTo(map).bindPopup("you are here").openPopup();


  // get client's current location
  if (navigator.geolocation) {
    var optn = {
      enableHighAccuracy : true,
  		timeout : Infinity,
  		maximumAge : 0
  	};
  	navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  } else {
    alert('Geolocation is not supported in your browser');
  }

  function showPosition(position) {
    // document.write('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);
    console.log(position.coords.latitude);
    var latitude = position.coords.latitude;
    // 1.2790971
    var longitude = position.coords.longitude;
    // 103.8414975
    console.log(position.coords.longitude);
    L.marker([latitude, longitude]).addTo(map).bindPopup("this is your current location").openPopup();
    // L.marker([1.375133, 103.846914]).addTo(map);
    // L.marker(coordinates[i]).addTo(map).bindPopup(title[i].value).openPopup();

  }

  function showError(error) {
  	switch(error.code) {
  		case error.PERMISSION_DENIED:
  			alert("User denied the request for Geolocation.");
  			break;
  		case error.POSITION_UNAVAILABLE:
  			alert("Location information is unavailable.");
  			break;
  		case error.TIMEOUT:
  			alert("The request to get user location timed out.");
  			break;
  		case error.UNKNOWN_ERROR:
  			alert("An unknown error occurred.");
  			break;
  	}
  }



  $("body").on("click", ".like", like);



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

function like() {
  console.log("like button clicked");
  // var data = {id: parseInt(this.value)};
  // send an ajax POST request
  $.ajax({
    url: "http://localhost:3000/posting/categories/post/" + this.value,
    method: "GET",
    // data: data
  }).done(function(dataFromServer){
    // once POST request is successful, take data sent from server and append
    // new scoreBoard array (received in JSON format) onto html page
    // console.log(dataFromServer);
    // console.log(dataFromServer.id);
    // console.log(dataFromServer.count);

    // append new like value
    for (var key in dataFromServer) {
      for (var i = 0; i < (document.getElementsByClassName("like")).length; i++) {
        if (dataFromServer[key] == document.getElementsByClassName("like")[i].value) {
          document.getElementsByClassName("count")[i].textContent = dataFromServer.count;
          console.log("like increased successfully");
        }
      }
    }
  })
}


// http://api.mapbox.com/v4/mapbox.streets.html?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbTgzcHQxMzAxMHp0eWx4bWQ1ZHN2NGcifQ.WVwjmljKYqKciEZIC3NfLA#17/1.35808/103.84800

// the below is a public token
// pk.eyJ1IjoiZXVnZW5lb2VpIiwiYSI6ImNpdDlnanl3bTBqNm8yb3AydGIzdnFncHQifQ.xbhCGgpxzfwL_NtEFDWkXg
// different type of tile layers can google for different styles
// load tile layer
