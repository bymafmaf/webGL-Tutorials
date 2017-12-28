class Zipzip extends GameObject{

    MovingY(){

        if (this.model[1][3] > 9)
            this.isit = false;
        if (this.model[1][3] <= 6.5)
            this.isit = true;

        if (this.model[1][3] < 9 && this.isit){
            this.model = mult(this.model, translate(0,0.04,0));}
        else if (this.isit==false )  {
            this.model = mult(this.model, translate(0,-0.04,0));}
    }
        draw(cameraPos, lightPos, viewProjection, model){
            this.MovingY();
            super.draw(cameraPos, lightPos, viewProjection, model);
    }
     
}