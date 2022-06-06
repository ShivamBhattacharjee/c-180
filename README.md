# PRO-C178-Boilerplate
<!DOCTYPE html>
<html>
  <head>
    <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
    <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>

    <!-- jQuery -->
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"
    ></script>
  </head>

  <body style="margin: 0; overflow: hidden">
    <a-scene
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
      id="scene_container"
    >
      <a-assets>
        <a-asset-item id="ball" src="/ball/scene.gltf"></a-asset-item>
      </a-assets>

      <a-entity
        gltf-model="#ball"
        look
        at="[gps-camera]"
        gps-entity-place="latitude: 12.981270411772766; longitude: 77.67612836787966"
        scale="0.5 0.5 0.5"
        position="0 0 0"
        rotation="0 0 -100"
      ></a-entity>

      <a-camera
        gps-camera
        rotation-reader
        minDistance="1"
        positionMinAccuracy="0"
      ></a-camera>
    </a-scene>
  </body>
</html>
