var sphere;
var plane;
var block;
var models = {};

var lightPos = vec3(0, 5, 10);

var at = vec3(0, 0, 0);
var eye = vec3(0, 10, 10);
var toCam = subtract(eye, at);
var proj;
var view;

var GAME_SPEED = 1000;

function modelLoad(meshes) {
    models.meshes = meshes;

    OBJ.initMeshBuffers(gl, models.meshes.plane);
    OBJ.initMeshBuffers(gl, models.meshes.sphere);
    OBJ.initMeshBuffers(gl, models.meshes.block);

    plane = new GameObject(models.meshes.plane, mult(mat4(), translate(0,-2.5,-2)));
    sphere = new Player(models.meshes.sphere, mat4());
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
    gl.clearColor(0.7, 0.2, 0, 1);

    OBJ.downloadMeshes({
      'plane': 'plane.obj',
      'sphere': 'long-quad.obj',
      'block': 'block.obj'
    }, modelLoad);


}

var gameEnded = false;
const gameLoop = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    if (!gameEnded) {
      at = sphere.getPosition();
      view = lookAt(add(at, toCam), at, [0, 1, 0]);
      proj = perspective(45, screenSize[0] / screenSize[1], 0.1, 30);

      plane.draw(eye, lightPos, mult(proj,view));
      sphere.draw(eye, lightPos, mult(proj,view));
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
    sphere.steerLeft();
  }
  else if (key.keyCode == 37) {
    sphere.steerRight();
  }
  else if (key.keyCode == 38) {
    sphere.moveForward();
  }
  else if (key.keyCode == 40) {
    sphere.moveBackward();
  }
}
