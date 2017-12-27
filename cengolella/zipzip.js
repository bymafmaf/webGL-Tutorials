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
        model = model || mat4();
        model = mult(this.model, model);
        viewProjection = viewProjection || mat4();
    
        gl.useProgram(this.program);

        gl.uniformMatrix4fv(this.program.model, false, flatten(model));
        gl.uniformMatrix4fv(this.program.viewProjection, false, flatten(viewProjection));
        gl.uniform3f(this.program.lightPos, lightPos[0], lightPos[1], lightPos[2]);
        gl.uniform3f(this.program.cameraPos, cameraPos[0], cameraPos[1], cameraPos[2]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
        gl.vertexAttribPointer(this.program.vpos_attr, this.mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.normalBuffer);
        gl.vertexAttribPointer(this.program.vnor_attr, this.mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);


    }
     
}