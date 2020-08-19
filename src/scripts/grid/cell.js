class Cell {
  constructor(x, y, z, alive = true){
    this.x = x; 
    this.y = y;
    this.z = z;

    this.alive = alive;
  }

  printInfo() {
    console.log(`I am located at X:${this.x}, Y:${this.y} Z:${this.z}`);
  }
}

export default Cell;