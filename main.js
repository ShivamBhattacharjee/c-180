var latitude;
var longitude;
var destination

$(document).ready(function () {
  alert("allow permission");
  initGeolocation();
});

$(function(){
  $("#navigate-button").click(function(){
    window.location.href=`ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
  })
})

function initGeolocation() {
  // console.log(navigator.geolocation)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(currentLocation);
    console.log("location is found");
  } else {
    console.log("alert");
  }
}

function currentLocation(position) {
  console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hpdmFtNTY2NzgiLCJhIjoiY2wzaWx2ZXFjMGJ1ZzNqcGN1YzBzeG4zZiJ9.1FzK8R47RwQutJC8fSsF-A";

  // creating map
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [longitude, latitude],
    zoom: 16,
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: false },
      trackUserLocation: true,
    })
  );

  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-right"
  );

  map.on("click",function(e){
    // console.log(e)
    destination=e.lngLat
    console.log(destination)
  })
}
