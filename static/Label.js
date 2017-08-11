THREE.Label = function(text, parameters) {
  parameters = parameters || {};

  var labelCanvas = document.createElement( "canvas" );

  function create() {
    var xc = labelCanvas.getContext("2d");
    var fontsize = "100pt";

    // set font size to measure the text
    xc.font = fontsize + " Arial";
    var len = xc.measureText(text).width;

    labelCanvas.setAttribute('width', len);

    // set font size again cause it will be reset
    // when setting a new width
    xc.font = fontsize + " Arial";
    xc.textBaseline = 'top';
    xc.fillText(text, 0, 0);

    var geometry = new THREE.BoxGeometry(len, 200, 0);
    var xm = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(
        labelCanvas,
        THREE.UVMapping,
        THREE.ClampToEdgeWrapping,
        THREE.ClampToEdgeWrapping,
        THREE.LinearFilter,
        THREE.LinearFilter
      ),
      transparent: true
    });
    xm.map.needsUpdate = true;

    // set text canvas to cube geometry
    var labelObject = new THREE.Mesh(geometry, xm);
    return labelObject;
  }

  return create();
};
