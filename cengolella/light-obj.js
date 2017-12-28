var player;
var plane;
var block, cut;
var pole, map, evren, zipzip;
var models = {};
var things = [];

var lightPos = vec3(0, 250, 50);

var at = vec3(0, 0, 0);
var eye = vec3(0,2, 5.5);
var toCam = subtract(eye, at);
var proj;
var view;
var leftNum = 0;
var rightNum = 0;
var then=0;
var timeNode = document.createTextNode("");

var GAME_SPEED = 1000;

function initMeshes(meshes){
  models.meshes = meshes;
  OBJ.initMeshBuffers(gl, models.meshes.plane);
  OBJ.initMeshBuffers(gl, models.meshes.player);
  OBJ.initMeshBuffers(gl, models.meshes.block);
  OBJ.initMeshBuffers(gl, models.meshes.pole);
  OBJ.initMeshBuffers(gl, models.meshes.uppole);
  OBJ.initMeshBuffers(gl, models.meshes.map);
  OBJ.initMeshBuffers(gl, models.meshes.universe);
  OBJ.initMeshBuffers(gl, models.meshes.zipzip);
  modelLoad();
}
function modelLoad() {
  player= new Player(mult(mult(mat4(), translate(45,6.2,55)), scalem(0.01,0.01,0.01)), toCam);
  pole = new Gate(mat4());
  map = new Road(mult(mat4(), translate(0, 5.75, 50)));
  evren = new Universe(mult(mult(mat4(), translate(0, 4,45)), scalem(1.05,1.05 ,1.1)));

  zipzip = new Zipzip(models.meshes.zipzip, mult(mult(translate(45.2, 6.5, 40), rotateX(0)), rotateY(90)));
  cut = new Cutter ();

  things.push(player);
  things.push(pole);
  things.push(map);
  things.push(evren);
  //things.push(zipzip);
  things.push(cut);

  gameLoop();
}
window.onload = function () {
  let canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("yo");
  }
  var timeElement = document.getElementById("time");

  timeElement.appendChild(timeNode);

  screenSize = [canvas.width, canvas.height];

  gl.viewport(0, 0, screenSize[0], screenSize[1]);
  gl.clearColor(0.6, 0.1, 0.1, 1);

  OBJ.downloadMeshes({
    'plane': 'models/plane.obj',
    'pole': 'models/direk.obj',
    'uppole': 'models/ustdirek.obj',
    'block': 'models/maya.obj',
    'universe': 'models/universe.obj',
    'player': 'models/carsu.obj',
    'zipzip': 'models/direk.obj',
    'map': 'models/textured-map.obj'
  }, initMeshes);
}

var gameEnded = false;
const gameLoop = function (clock) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  if (!gameEnded) {
    at = player.getPosition();
    view = lookAt(add(at, player.moveCamera()), at, [0, 1, 0]);
    proj = perspective(60, screenSize[0] / screenSize[1], 0.2, 200);

    clock *= 0.001;
    var deltaTime = clock - then;
    then = clock;
    timeNode.nodeValue = clock.toFixed(2);
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
