class Player extends GameObject {

  constructor(mesh, position){
    super(mesh, position);
    this.spine = mat4();
    this.maxSpeed = 0.1;
    this.acceleration = 0.2;
    this.forwardMaxAchieved = false;
    this.backwardMaxAchieved = false;

  }


  steerLeft(){
    this.model = mult(this.model, rotateY(-10));
  }

  steerRight(){
    this.model = mult(this.model, rotateY(10));
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
