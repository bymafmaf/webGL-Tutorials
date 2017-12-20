class Player extends GameObject {

  constructor(mesh, position, initialCameraPosition){
    super(mesh, position);
    this.constantDirectionalAcceleration = 0.01;
    this.constantSteerAcceleration = 0.8;
    this.maxSpeed = 1.5;

    this.spine = mat4();
    this.currentDirectionalAcceleration = 0;
    this.currentSteerAcceleration = 0;
    this.forwardMaxAchieved = false;
    this.backwardMaxAchieved = false;
    this.rotation = mat4();
    this.rotationButtonDown = 0; // -1 left, +1 right
    this.steerMax = 5;

    this.lastCameraPosition = initialCameraPosition;
  }

  leftDown(){
    this.currentSteerAcceleration = -this.constantSteerAcceleration;
  }
  rightDown(){
    this.currentSteerAcceleration = this.constantSteerAcceleration;
  }
  leftUp(){
    this.currentSteerAcceleration = 0;
  }
  rightUp(){
    this.currentSteerAcceleration = 0;
  }
  upDown(){
    this.currentDirectionalAcceleration = this.constantDirectionalAcceleration;
  }
  upUp(){
    this.currentDirectionalAcceleration = 0;
  }
  downDown(){
    this.currentDirectionalAcceleration = -this.constantDirectionalAcceleration;
  }
  downUp(){
    this.currentDirectionalAcceleration = 0;
  }

  applySteering(){
    this.model = mult(this.model, rotateY(this.currentSteerAcceleration));
  }

  moveCamera(){
    let temp = mult(rotateY(this.currentSteerAcceleration), vec4(this.lastCameraPosition, 1));
    this.lastCameraPosition = vec3(temp[0], temp[1], temp[2]);
    return this.lastCameraPosition;
  }

  applyDirectionalMove(){
    if (this.currentDirectionalAcceleration > 0){
      if (!this.forwardMaxAchieved) {
        this.spine = mult(this.spine, translate(0, 0, -this.currentDirectionalAcceleration));
        this.backwardMaxAchieved = false;
        if (this.spine[2][3] <= -this.maxSpeed) {
          this.forwardMaxAchieved = true;
        }
      }
    }
    else if (this.currentDirectionalAcceleration < 0) {
      if (!this.backwardMaxAchieved) {
        this.spine = mult(this.spine, translate(0, 0, -this.currentDirectionalAcceleration));
        this.forwardMaxAchieved = false;
        if (this.spine[2][3] >= this.maxSpeed) {
          this.backwardMaxAchieved = true;
        }
      }
    }
    else {
      // this.spine[2][3] speed at z-axis of the object itself
      if(this.spine[2][3] < 0){ // moving forward
        if (this.spine[2][3] > -0.009){
          this.spine[2][3] = 0;
        }
        this.spine = mult(this.spine, translate(0, 0, this.constantDirectionalAcceleration));
      }
      else if (this.spine[2][3] > 0){ // moving backward
        if (this.spine[2][3] < 0.009){
          this.spine[2][3] = 0;
        }
        this.spine = mult(this.spine, translate(0, 0, -this.constantDirectionalAcceleration));
      }
    }
  }

  draw(cameraPos, lightPos, viewProjection){

    this.applySteering();
    this.applyDirectionalMove();
    this.model = mult(this.model, this.spine);
    super.draw(cameraPos, lightPos, viewProjection);
  }
}
