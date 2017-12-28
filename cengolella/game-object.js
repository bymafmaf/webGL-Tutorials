class GameObject
{
    constructor(mesh, position){
        var program = initShaders(gl, 'vertex-shader-object', 'fragment-shader-object');
        program.viewProjection = gl.getUniformLocation(program, "viewProjection");
        program.model = gl.getUniformLocation(program, "model");
        program.lightPos = gl.getUniformLocation(program, "lightPos");
        program.hasTexture = gl.getUniformLocation(program, "hasTexture");
        program.samplerUniform = gl.getUniformLocation(program, "uSampler");
        program.cameraPos = gl.getUniformLocation(program, "cameraPos");
        program.screenSize = gl.getUniformLocation(program, "screenSize");

        program.vpos_attr = gl.getAttribLocation(program, 'vPosition');
        gl.enableVertexAttribArray(program.vpos_attr);

        program.texture_attr = gl.getAttribLocation(program, "aTextureCoord");
        //gl.enableVertexAttribArray(program.texture_attr);
        program.vnor_attr = gl.getAttribLocation(program, "vNormal");
        gl.enableVertexAttribArray(program.vnor_attr);

        this.program = program;
        this.mesh = mesh;
        this.model = position || mat4();
    }

    draw(cameraPos, lightPos, viewProjection, model){
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

        if(!this.mesh.textures.length){
          gl.disableVertexAttribArray(this.program.texture_attr);
          gl.uniform1i(this.program.hasTexture, false);
        }
        else{
          gl.uniform1i(this.program.hasTexture, true);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.uniform1i(this.program.samplerUniform, 0);

          gl.enableVertexAttribArray(this.program.texture_attr);
          gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.textureBuffer);
          gl.vertexAttribPointer(this.program.texture_attr, this.mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    }

    getPosition(){
      return vec3(this.model[0][3], this.model[1][3],this.model[2][3]);
    }
}
