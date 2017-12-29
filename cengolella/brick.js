class Brick extends GameObject {
  constructor(position, isRotated){
    if (isRotated) {
      super(models.meshes.rotatedBrick, position, "textures/brick.jpg");
    }
    else{
      super(models.meshes.brick, position, "textures/brick.jpg");
    }

  }
}
