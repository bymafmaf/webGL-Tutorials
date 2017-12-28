class Cutter {

  constructor(){
    this.model = mat4();
    this.model[0][0] *= 1;
    this.model[1][1] *= 1;
    this.model[2][2] *= 1;

    var program = initShaders(gl, 'vertex-shader-object', 'fragment-shader-object');
    program.viewProjection = gl.getUniformLocation(program, "viewProjection");
    program.model = gl.getUniformLocation(program, "model");

    program.lightPos = gl.getUniformLocation(program, "lightPos");
    program.cameraPos = gl.getUniformLocation(program, "cameraPos");
    program.screenSize = gl.getUniformLocation(program, "screenSize");

    this.vao = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);

    this.program = program;

    let vertices = [
      vec3(42.7, 4, 35),
      vec3(42.7, 7, 35),
      vec3(42.7, 7, 34.5),
      vec3(42.7, 4, 34.5),
      vec3(47.7, 4, 35),
      vec3(47.7, 7, 35),
      vec3(47.7, 7, 34.5),
      vec3(47.7, 4, 34.5)
    ];

    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    this.vao_attr = gl.getAttribLocation(this.program, 'vPosition');
    gl.enableVertexAttribArray(this.vao_attr);
    gl.vertexAttribPointer(this.vao_attr, 3, gl.FLOAT, false, 0, 0);

    program.vnor_attr = gl.getAttribLocation(program, "vNormal");
    gl.enableVertexAttribArray(program.vnor_attr);

    let indices =
    [0, 1, 2, 2, 3, 1,
      0, 4, 5, 5, 1, 0,
      4, 7, 6, 6, 5, 4,
      7, 3, 2, 2, 6, 7,
      1, 5, 6, 6, 2, 1,
      0, 4, 7, 7, 3, 0];

      this.indiceSize = indices.length;

      this.ebo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    }

    MovingY(){

      if (this.model[1][3] > 5.5)
      this.isit = false;
      if (this.model[1][3] <= 2)
      this.isit = true;

      if (this.model[1][3] < 5.5 && this.isit){
        this.model = mult(this.model, translate(0,0.05,0));}
        else if (this.isit==false )  {
          this.model = mult(this.model, translate(0,-0.05,0));}

        }
        draw(cameraPos, lightPos, viewProjection, model) {
          this.MovingY();
          model = model || mat4();
          model = mult(this.model, model);
          viewProjection = viewProjection || mat4();


          gl.useProgram(this.program);

          gl.uniformMatrix4fv(this.program.model, false, flatten(model));
          gl.uniformMatrix4fv(this.program.viewProjection, false, flatten(viewProjection));
          gl.uniform3f(this.program.lightPos, lightPos[0], lightPos[1], lightPos[2]);
          gl.uniform3f(this.program.cameraPos, cameraPos[0], cameraPos[1], cameraPos[2]);

          gl.bindBuffer(gl.ARRAY_BUFFER, this.vao);

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
          gl.enableVertexAttribArray(this.vao_attr);
          gl.vertexAttribPointer(this.vao_attr, 3, gl.FLOAT, false, 0, 0);

          gl.drawElements(gl.TRIANGLES, this.indiceSize, gl.UNSIGNED_SHORT, 0);


        }

      }
