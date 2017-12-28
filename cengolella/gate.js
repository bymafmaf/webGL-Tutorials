class Gate {

  constructor(position){
    this.children = [ //46.51
      new GameObject(models.meshes.pole, mult(position, mult(translate(6.5, 8.25, 0.6), rotateX(90)))),
      new GameObject(models.meshes.pole, mult(position, mult(translate(0.5, 8.25, 0.6), rotateX(90)))),
      new GameObject(models.meshes.uppole, mult(position, mult(mat4(), translate(0, 10, 0))))
    ];
  }

  draw(cameraPos, lightPos, viewProjection, model){
    for (let child of this.children){
      child.draw(cameraPos, lightPos, viewProjection, model);
    }
  }
}
