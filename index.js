const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

class Cell {
  // access to properties main effect class
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    // same width and height from main effect Object
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    // add projectImage
    this.image = document.querySelector("#projectImage");
  }
  //   custom draw method
  draw(context) {
    // call build draw image method (galima be canvas width ir height, bet sitas budas duoda daugiausiai kontroles)
    // po this.image eina sx, sy, sw, sh = source x, source y, source width, source height
    context.drawImage(this.image, this.x, this.y, this.width, this.height, this.x, this.y, this.width, this.height, 0, 0, canvas.width, canvas.height);
    context.strokeRect(this.x, this.y, this.width, this.height);
  }
}
class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Slice canvas into grid

    this.cellWidth = this.width / 30;
    this.cellHeight = this.height / 45;
    // draw multiple cells and organize in grid
    // horizontal cell and vertical
    // create one cell object
    this.cell = new Cell(this, 0, 0);

    this.imageGrid = [];
    this.createGrid();
    console.log(this.imageGrid);
  }
  //   organize into a grid
  createGrid() {
    // create grid
    // y = vertical rows
    for (let y = 0; y < this.height; y += this.cellHeight) {
      // x horizontal columns
      for (let x = 0; x < this.width; x += this.cellWidth) {
        // everytime when jump to new cell in the grid, take img grid array(35 kodo eilute) push new cell in there
        this.imageGrid.push(new Cell(this, x, y));
      }
    }
  }
  //   custom render method
  render(context) {
    // auto generated index ( is cia galima padaryti visokiu variaciju)
    this.imageGrid.forEach((cell, i) => {
      cell.draw(context);
    });
  }
}

const effect = new Effect(canvas);
console.log(effect);
effect.render(ctx);
