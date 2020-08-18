// import Cell from './cell';
// import MathUtils from './utils/math_utils';
const Cell = require("./cell");
const MathUtils = require("./utils/math_utils");
const GraphicUtils = require("./utils/3d_utils");

class Grid {
  constructor(size, cellOptions, scene) {
    this.size = size;
    this.scene = scene;
    const cellGeometry = GraphicUtils.basicGeoCube(
      cellOptions.cubeWidth,
      cellOptions.cubeHeight,
      cellOptions.cubeDepth
    );

    let cells = MathUtils.create3DGrid(Cell, 3);

    // This will create instances of each cell and add them each to the scene
    this.cubes = MathUtils.flattenGrid(cells).map((cell) => {
      return GraphicUtils.makeInstance(cellGeometry, 0x00A878, 0, this.scene)
    });
    debugger;
  }
  // Returns total size of grid
  size() {
    return MathUtils.cellsInGrid(this.grid);
  }

  // Returns Alive # of Cells
  aliveCount() {
    // return MathUtils.cellsInGrid(this.grid);
  }

  // Returns Dead # of Cells
  deadCount() {
    // return MathUtils.cellsInGrid(this.grid);
  }

}

// export default Grid;
module.export = Grid;
