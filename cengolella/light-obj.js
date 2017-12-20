var player;
var plane;
var block;
var pole1, pole2,pole3, pole4, uppole3, uppole, map,evren;
var models = {};
var things = [];

var lightPos = vec3(0, 250, 50);

var at = vec3(0, 0, 0);
var eye = vec3(0,1.5, 5);
var toCam = subtract(eye, at);
var proj;
var view;
var leftNum = 0;
var rightNum = 0;

var GAME_SPEED = 1000;

function modelLoad(meshes) {
    models.meshes = meshes;

    OBJ.initMeshBuffers(gl, models.meshes.plane);
    OBJ.initMeshBuffers(gl, models.meshes.player);
    OBJ.initMeshBuffers(gl, models.meshes.block);
    OBJ.initMeshBuffers(gl, models.meshes.pole1);
    OBJ.initMeshBuffers(gl, models.meshes.pole2);
    OBJ.initMeshBuffers(gl, models.meshes.uppole);
    OBJ.initMeshBuffers(gl, models.meshes.pole3);
    OBJ.initMeshBuffers(gl, models.meshes.pole4);
    OBJ.initMeshBuffers(gl, models.meshes.uppole3);
    OBJ.initMeshBuffers(gl, models.meshes.map);
    OBJ.initMeshBuffers(gl, models.meshes.evren);

  
    player= new Player(models.meshes.player,mult(mult(mat4(), translate(45,7,55)), scalem(0.3,0.3,0.3)), toCam);
    pole1 = new Gate(models.meshes.pole1, mult(mult(translate(48.1, 8, 80), rotateX(90)), rotateY(0)));
    pole2 = new Gate(models.meshes.pole2,mult(mult(translate(42.08, 8, 80), rotateX(90)), rotateY(0)));
    uppole = new Gate(models.meshes.uppole, mult(translate(41.55, 9.7, 79.3), rotateZ(0)));
    pole3 = new Gate(models.meshes.pole3, mult(mult(translate(48.1, 8, 60), rotateX(90)), rotateY(0)));
    pole4 = new Gate(models.meshes.pole4,mult(mult(translate(42.08, 8, 60), rotateX(90)), rotateY(0)));
    uppole3 = new Gate(models.meshes.uppole3, mult(translate(41.55, 9.7, 59.3), rotateZ(0)));
    map = new Road(models.meshes.map,  mult(mult(mat4(), translate(-50, 0,-20)), scalem(1,1,1)));
    evren = new Road(models.meshes.evren,  mult(mult(mat4(), translate(0, 0,45)), scalem(1.15,1.15,1.15)));

    things.push(player);
    things.push(pole1);
    things.push(pole2);
    things.push(uppole);
    things.push(pole3);
    things.push(pole4);
    things.push(uppole3);
    things.push(map);
    things.push(evren);
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
    gl.clearColor(0.6, 0.1, 0.1, 1);

    OBJ.downloadMeshes({
      'plane': 'plane.obj',
      'pole1': 'direk.obj',
      'pole2': 'direk.obj',
      'uppole': 'ustdirek.obj',
      'pole3': 'direk.obj',
      'pole4': 'direk.obj',
      'uppole3': 'ustdirek.obj',
      'player': 'long-quad.obj',
      'block': 'maya.obj',
      'evren': 'evren.obj',
      'map': 'map.obj'
    }, modelLoad);


}

var gameEnded = false;
const gameLoop = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    if (!gameEnded) {
      at = player.getPosition();
      view = lookAt(add(at, player.moveCamera()), at, [0, 1, 0]);
      proj = perspective(60, screenSize[0] / screenSize[1], 0.1, 135);

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
    player.leftDown();
  }
  else if (key.keyCode == 37) {
    player.rightDown();
  }
  else if (key.keyCode == 38) {
    player.upDown();
  }
  else if (key.keyCode == 40) {
    player.downDown();
  }
}

document.onkeyup = function(key){
  if (key.keyCode == 39) {
    player.leftUp();
  }
  else if (key.keyCode == 37) {
    player.rightUp();
  }
  else if (key.keyCode == 38) {
    player.upUp();
  }
  else if (key.keyCode == 40) {
    player.downUp();
  }
}
