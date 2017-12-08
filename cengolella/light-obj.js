var player;
var plane;
var block;
var models = {};
var things = [];

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
    OBJ.initMeshBuffers(gl, models.meshes.player);
    OBJ.initMeshBuffers(gl, models.meshes.block);

    plane = new Road(models.meshes.plane, mult(mat4(), translate(0,-2.5,-2)));
    player = new Player(models.meshes.player);
    block = new Gate(models.meshes.block, mult(translate(2.5, -2.5, -5), rotateY(90)));
    things.push(plane);
    things.push(player);
    things.push(block);
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
      'player': 'long-quad.obj',
      'block': 'maya.obj'
    }, modelLoad);


}

var gameEnded = false;
const gameLoop = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    if (!gameEnded) {
      at = player.getPosition();
      view = lookAt(add(at, toCam), at, [0, 1, 0]);
      proj = perspective(45, screenSize[0] / screenSize[1], 0.1, 30);

      for (let object of things) {
        object.draw(eye, lightPos, mult(proj,view));
      }

      window.requestAnimationFrame(gameLoop);
    }
    else {
        window.cancelAnimationFrame(gameLoop);
    }
}

document.onkeydown = function(key){
  //console.log(key.keyCode);
  if (key.keyCode == 39) {
    toCam = player.steerLeft(toCam);
  }
  else if (key.keyCode == 37) {
    toCam = player.steerRight(toCam);
  }
  else if (key.keyCode == 38) {
    player.moveForward();
  }
  else if (key.keyCode == 40) {
    player.moveBackward();
  }
}
