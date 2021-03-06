class Cell {
  constructor(x, y, z, alive = false){
    this.x = x; 
    this.y = y;
    this.z = z;

    this.alive = alive;
    this.neighborCount = null;
    let luck = this.randomLife();
    
  }

  randomLife(){
    const coin = Math.random();
    this.alive = coin > 0.99;
  }

  toggleLife(){
    this.alive = !this.alive;
  }

  printInfo() {
    console.log(`I am located at X:${this.x}, Y:${this.y} Z:${this.z}`);
  }
}

export default Cell;