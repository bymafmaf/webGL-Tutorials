var sphere;
var plane;
var block;
var models = {};

var lightPos = vec3(0, -3, 0);

var at = vec3(0, 0, 0);
var eye = vec3(0, 0, 10);
var toCam = subtract(eye, at);
var proj;
var view;

var displacement = mult(mat4(), translate(0, -1, 5));


function modelLoad(meshes) {
    models.meshes = meshes;

    OBJ.initMeshBuffers(gl, models.meshes.plane);
    OBJ.initMeshBuffers(gl, models.meshes.sphere);
    OBJ.initMeshBuffers(gl, models.meshes.block);

    plane = new GameObject(models.meshes.plane, mult(mat4(), translate(0,-2.5,-2)));
    sphere = new GameObject(models.meshes.sphere);
    block = new GameObject(models.meshes.block, mult(mat4(), translate(5, -2.5, 0)));

    gameLoop();
}


window.onload = function () {
    let canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("yo");
    }

    screenSize = [canvas.width, canvas.height];

    gl.viewport(0, 0, screenSize[0], screenSize[1]);
    gl.clearColor(0, 1.0, 0, 1);

    OBJ.downloadMeshes({
      'plane': 'plane.obj',
      'sphere': 'sphere.obj',
      'block': 'block.obj'
    }, modelLoad);


}

var gameEnded = false;
const gameLoop = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    if (!gameEnded) {
      view = lookAt(add(at, toCam), at, [0, 1, 0]);
      proj = perspective(45, screenSize[0] / screenSize[1], 0.1, 10);

      plane.draw(eye, lightPos, mult(proj,view));
      sphere.draw(eye, lightPos, mult(proj,view), displacement);
      block.draw(eye, lightPos, mult(proj,view));

      window.requestAnimationFrame(gameLoop);
    }
    else {
        window.cancelAnimationFrame(gameLoop);
    }
}

document.onkeydown = function(key){
  console.log(key.keyCode);
  if (key.keyCode == 39) {
    displacement = mult(displacement, translate(0.1, 0, 0));
  }
  else if (key.keyCode == 37) {
    displacement = mult(displacement, translate(-0.1, 0, 0));
  }
  else if (key.keyCode == 38) {
    displacement = mult(displacement, translate(0, 0, -0.1));
  }
  else if (key.keyCode == 40) {
    displacement = mult(displacement, translate(0, 0, 0.1));
  }
}
