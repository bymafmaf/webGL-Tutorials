class Gate {

  constructor(position){
    this.children = [ //46.51
      new GameObject(models.meshes.pole, mult(position, mult(translate(6.5, 5, 0.6), rotateX(90)))),
      new GameObject(models.meshes.pole, mult(position, mult(translate(0.5, 5, 0.6), rotateX(90)))),
      new GameObject(models.meshes.uppole, mult(position, mult(mat4(), translate(0, 6.75, 0))))
    ];
  }

  draw(cameraPos, lightPos, viewProjection, model){
    for (let child of this.children){
      child.draw(cameraPos, lightPos, viewProjection, model);
    }
  }
}
