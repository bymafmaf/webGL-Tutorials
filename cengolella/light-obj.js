var player;
var block, speed;
var models = {};
var things = [];
var collisionActives = [];

var lightPos = vec3(0, 250, 50);

var at = vec3(0, 0, 0);
var eye = vec3(0,7, 13);
var toCam = subtract(eye, at);
var proj;
var view;
var leftNum = 0;
var rightNum = 0;
var then=0;
var timeNode = document.createTextNode("");
var spe = document.createTextNode("");

var GAME_SPEED = 1000;

function initMeshes(meshes){
  models.meshes = meshes;
  OBJ.initMeshBuffers(gl, models.meshes.player);
  OBJ.initMeshBuffers(gl, models.meshes.brick);
  OBJ.initMeshBuffers(gl, models.meshes.rotatedBrick);
  OBJ.initMeshBuffers(gl, models.meshes.pole);
  OBJ.initMeshBuffers(gl, models.meshes.uppole);
  OBJ.initMeshBuffers(gl, models.meshes.universe);
  OBJ.initMeshBuffers(gl, models.meshes.lowsphere);
  OBJ.initMeshBuffers(gl, models.meshes.highsphere);
  modelLoad();
}
function modelLoad() {
  player= new Player(mult(mult(mat4(), translate(45,2.25,55)), scalem(0.05,0.05,0.05)), toCam, [0.05,0.05,0.05]);
  things.push(player);

  var pole = new Gate(mat4());
  things.push(pole);

  var universe = new Universe(mult(mat4(), translate(0, 0,45)));
  things.push(universe);

  var brick = new Brick(mult(mat4(), translate(-30,2,40)));
  collisionActives.push(brick);
  things.push(brick);

  var brick2 = new Brick(mult(mat4(), translate(30,2,40)));
  collisionActives.push(brick2);
  things.push(brick2);

  var brick3 = new Brick(mult(mat4(), translate(-45,2,50)), true);
  collisionActives.push(brick3);
  things.push(brick3);

  var brick4 = new Brick(mult(mat4(), translate(20,2,30)), true);
  collisionActives.push(brick4);
  things.push(brick4);

  var brick6 = new Brick(mult(mat4(), translate(-2,2,20)));
  collisionActives.push(brick6);
  things.push(brick6);

  var sphere = new Zipzip(mult(mat4(), translate(0, 3, 45)));
  things.push(sphere);
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

  var speedElement = document.getElementById("speed");
  speedElement.appendChild(spe);
  screenSize = [canvas.width, canvas.height];

  gl.viewport(0, 0, screenSize[0], screenSize[1]);
  gl.clearColor(0.6, 0.1, 0.1, 1);

  OBJ.downloadMeshes({
    'pole': 'models/direk.obj',
    'uppole': 'models/ustdirek.obj',
    'universe': 'models/universe.obj',
    'player': 'models/carsu.obj',
    'brick': 'models/brick.obj',
    'rotatedBrick': 'models/rotatedBrick.obj',
    'lowsphere': 'models/lowres-sphere.obj',
    'highsphere': 'models/highres-sphere.obj'
  }, initMeshes);
}

var gameEnded = false;
const gameLoop = function (clock) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  if (!gameEnded) {
    at = player.getPosition();
    speed = player.getSpeed();
    view = lookAt(add(at, player.moveCamera()), at, [0, 1, 0]);
    proj = perspective(60, screenSize[0] / screenSize[1], 0.2, 300);

    clock *= 0.001;
    timeNode.nodeValue = clock.toFixed(2);
    spe.nodeValue = speed.toFixed(2);

    for(let object of collisionActives){
      player.checkCollision(object);
    }

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
