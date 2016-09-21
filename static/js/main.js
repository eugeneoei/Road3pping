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


});

// http://api.mapbox.com/v4/mapbox.streets.html?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbTgzcHQxMzAxMHp0eWx4bWQ1ZHN2NGcifQ.WVwjmljKYqKciEZIC3NfLA#17/1.35808/103.84800

// the below is a public token
// pk.eyJ1IjoiZXVnZW5lb2VpIiwiYSI6ImNpdDlnanl3bTBqNm8yb3AydGIzdnFncHQifQ.xbhCGgpxzfwL_NtEFDWkXg
// different type of tile layers can google for different styles
// load tile layer

// function logIn() {
//   // log to check if login button has been clicked
//   console.log("login button clicked");
//   // package login information and send it to server together
//   // with an ajax post request
//   var data = {username: $("#longinEmail").val(),
//               password: $("longinPassword").val()};
//   // send an ajax POST request
//   $.ajax({
//     url: "http://localhost:3000/login",
//     method: "POST",
//     data: data
//   })
//   console.log("login POST request submitted");
// }
//
//
// function signUp() {
//   // log to check if login button has been clicked
//   console.log("signup button clicked");
//   // package signup information and send it to server together
//   // with an ajax post request
//   var data = {username: $("#signupEmail").val(),
//               firstName: $("#firstName").val(),
//               lastName: $("#lastName").val(),
//               password: $("#signupPassword").val()};
//   // send an ajax POST request
//   $.ajax({
//     url: "http://localhost:3000/signup",
//     method: "POST",
//     data: data
//   })
// }
