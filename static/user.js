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
  // $("#rightContainer").on("click", "#submitPost", submitPost);


});

// function create() {
//   console.log("create button has been clicked");
//   $("#rightContainer").append(
//     "<form action='/auth/create' METHOD='POST'>" +
//       "<input type='text' id='title' name='title' placeholder='title here'></input>" +
//       "<input type='text' id='address' name='address' placeholder='address of location'></input>" +
//       "<input type='url' id='imageURL' name='imageURL' placeholder='image link here'></input>" +
//       "<textarea id='description' name='description' cols='40' rows='10' placeholder='your description here'></textarea>" +
//       "<button id='submitPost'>Create Post</button>" +
//     "</form>"
//   )
// }

// function submitPost () {
//   console.log("submit post button has been clicked");
  // package new post and send it to the server together
  // with an ajax POST request
  // var data = {title: $("#title").val(),
  //             url: $("#url").val(),
  //             description: $("#description").val()};
  //
  // // send an ajax POST request
  // $.ajax({
  //   url: "http://localhost:3000/auths",
  //   method:
  //   data:
  // })
// }
