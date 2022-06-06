coordinates = {};

$(document).ready(function () {
  getData();
  getLocation();
});

function getData() {
  var searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);
  if (searchParams.has("source") && searchParams.has("destination")) {
    var source = searchParams.get("source");
    console.log(source);
    var destination = searchParams.get("destination");

    coordinates.source_lat = source.split(";")[0];
    console.log(coordinates.source_lat);

    coordinates.source_long = source.split(";")[1];
    console.log(coordinates.source_long);

    coordinates.destination_lat = destination.split(";")[0];
    console.log(coordinates.destination_lat);

    coordinates.destination_long = destination.split(";")[1];
    console.log(coordinates.destination_long);
  } else {
    alert("co-ordinates are not selected");
    window.history.back();
  }
}

function getLocation() {
  $.ajax({
    url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.source_long}%2C${coordinates.source_lat}%3B${coordinates.destination_long}%2C${coordinates.destination_lat}?alternatives=true&geometries=polyline&steps=true&access_token=pk.eyJ1Ijoic2hpdmFtNTY2NzgiLCJhIjoiY2wzaWx2ZXFjMGJ1ZzNqcGN1YzBzeG4zZiJ9.1FzK8R47RwQutJC8fSsF-A`,
    type: "get",
    success: function (response) {
      var steps = response.routes[0].legs[0].steps;
      console.log(steps);

      let images = {
        turn_right: "ar_right.png",
        turn_left: "ar_left.png",
        slight_right: "ar_slight_right.png",
        slight_left: "ar_slight_left.png",
        straight: "ar_straight.png",
      };

      for (let i = 0; i < steps.length; i += 1) {
        let myImage;
        let myDistance = steps[i].distance;
        // console.log(myDistance)
        let Myinstruction = steps[i].maneuver.instruction;
        console.log(Myinstruction);

        if (Myinstruction.includes("Turn right")) {
          myimage = "turn_right";
        } else if (Myinstruction.includes("Turn left")) {
          myimage = "turn_left";
        }
        console.log(Myinstruction + myImage);

        if (i > 0) {
         $("#scene_container").append(
            `<a-entity
          gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]}"
           <a-image
            name="${"Myinstruction"}"
            src="./assets/${images[myImage]}
            look-at="#step_${i - 1}"
            scale="5 5 5"
            id="steps_${i}"
            postion="0 0 0">
           </a-image>
           <a-entity>
            <a-text height="50" value="${Myinstruction} (${myDistance}m)"></a-text>
           </a-entity>
         </a-entity>
           `
          );
          // console.log(e)
        }
        
        else{
          $("#scene_container").append(
            `<a-entity
          gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]}"
           <a-image
            name="${"Myinstruction"}"
            src="./assets/ar_start.png"
            look-at="#step_${i + 1}"
            scale="5 5 5"
            id="steps_${i}"
            postion="0 0 0">
           </a-image>
           <a-entity>
            <a-text height="50" value="${Myinstruction} (${myDistance}m)"></a-text>
           </a-entity>
         </a-entity>
           `
          );
        }
      }
    },
  });
}
