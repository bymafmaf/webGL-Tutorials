class Player extends GameObject {

  constructor(mesh, position){
    super(mesh, position);
    this.spine = mat4();
    this.maxSpeed = 0.1;
    this.acceleration = 0.2;
    this.forwardMaxAchieved = false;
    this.backwardMaxAchieved = false;
    this.rotation = mat4();
  }

  rotateCamera(toCam, rotation){
    var fourDtoCam = mult(rotation, vec4(toCam, 1));
    for (var i = 0; i < fourDtoCam.length-1; i++) {
      toCam[i] = fourDtoCam[i];
    }
    return toCam;
  }

  steerLeft(toCam){
    this.model = mult(this.model, rotateY(-1));
    return this.rotateCamera(toCam, rotateY(-1));
  }

  steerRight(toCam){
    this.model = mult(this.model, rotateY(1));
    return this.rotateCamera(toCam, rotateY(1));
  }

  moveForward(){
    if (!this.forwardMaxAchieved) {
      this.spine = mult(this.spine, translate(0, 0, -0.01));
      this.backwardMaxAchieved = false;
      if (this.spine[0][3]*this.spine[0][3] + this.spine[1][3]*this.spine[1][3] + this.spine[2][3]*this.spine[2][3] >= this.maxSpeed * this.maxSpeed) {
        this.forwardMaxAchieved = true;
      }
    }
  }

  moveBackward(){
    if (!this.backwardMaxAchieved) {
      this.spine = mult(this.spine, translate(0, 0, 0.01));
      this.forwardMaxAchieved = false;
      if (this.spine[0][2]*this.spine[0][3] + this.spine[1][3]*this.spine[1][3] + this.spine[2][3]*this.spine[2][3] >= this.maxSpeed * this.maxSpeed) {
        this.backwardMaxAchieved = true;
      }
    }
  }

  draw(cameraPos, lightPos, viewProjection){
    //console.log(this.spine);
    this.model = mult(this.model, this.spine);
    super.draw(cameraPos, lightPos, viewProjection);
  }
}
