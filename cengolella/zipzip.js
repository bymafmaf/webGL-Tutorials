class Zipzip extends GameObject {

  constructor(position){
    super(models.meshes.highsphere, position);
  }

  movingY(){
    if (this.model[1][3] > 14)
      this.isit = false;
    if (this.model[1][3] <= 6.5)
      this.isit = true;

    if (this.model[1][3] < 14 && this.isit){
      this.model = mult(this.model, translate(0,0.04,0));
    }
    else if (this.isit==false )  {
      this.model = mult(this.model, translate(0,-0.04,0));
    }
  }

  draw(cameraPos, lightPos, viewProjection){
    this.movingY();
    super.draw(cameraPos, lightPos, viewProjection);
  }
}
