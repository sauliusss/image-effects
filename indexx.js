const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

class Cell {
  // access to properties main effect class
  constructor(effect, x, y, index) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.index = index;
    // variables who move the cell itself
    // horizontal
    // starting position
    this.positionX = this.effect.width;
    // ================================
    // Vertical
    this.positionY = this.effect.width;
    // Speed X
    this.speedX;
    // Speed Y
    this.speedY;
    // same width and height from main effect Object
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;
    // add projectImage
    this.image = document.querySelector("#projectImage");
    // this.slideX = Math.random() * 10;
    this.slideX = 0;
    this.slideY = 0;
    // vx = velocity on the horizontal x aisles
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.01;
    this.friction = 0.9;
    this.randomize = Math.random() * 50 + 2;
    // be sito neveiks cell position performance this.start();
    // galima pakeisti laika
    setTimeout(() => {
      this.start();
    }, this.index * 10);
  }
  //   custom draw method
  draw(context) {
    // call build draw image method (galima be canvas width ir height, bet sitas budas duoda daugiausiai kontroles)
    // po this.image eina sx, sy, sw, sh = source x, source y, source width, source height
    // context.drawImage(this.image, this.x, this.y, this.width, this.height, this.x, this.y, this.width, this.height, 0, 0, canvas.width, canvas.height);
    // context.strokeRect(this.x, this.y, this.width, this.height);
    // senesnis modelis
    // context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
    // naujesnis modelis su positionX,positionY,speedX,speedY
    context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
    // senas modelis
    // context.strokeRect(this.x, this.y, this.width, this.height);
    // naujas modelis
    context.strokeRect(this.positionX, this.positionY, this.width, this.height);
  }
  // be sito neveiks cell position performance
  start() {
    this.speedX = (this.x - this.positionX) / this.randomize;
    this.speedY = (this.y - this.positionY) / this.randomize;
  }
  update() {
    // img vibration effect
    // this.slideX = Math.random() * 10;
    // this.slideY = Math.random() * 10;
    // distance between two points
    // cell position
    // save perfomance part of code (second code)
    if (Math.abs(this.speedX) > 0.1 || Math.abs(this.speedY) > 0.1) {
      this.speedX = (this.x - this.positionX) / this.randomize;
      this.speedY = (this.y - this.positionY) / this.randomize;
      this.positionX += this.speedX;
      this.positionY += this.speedY;
      // console.log(this.index);
    }
    // first code
    // this.speedX = (this.x - this.positionX) / this.randomize;
    // this.speedY = (this.y - this.positionY) / this.randomize;
    // this.positionX += this.speedX;
    // this.positionY += this.speedY;

    // crop effect
    const dx = this.effect.mouse.x - this.x;

    // dy = distance between two points on the vertical y axis
    const dy = this.effect.mouse.y - this.y;
    // kaip apskaiciuoti izambine
    const distance = Math.hypot(dx, dy);
    // galima ir taip const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.effect.mouse.radius) {
      // angle value (advanced stuff)
      const angle = Math.atan2(dy, dx);
      const force = distance / this.effect.mouse.radius;
      this.vx = force * Math.cos(angle);
      this.vy = force * Math.sin(angle);
    }

    // this.slideX += this.vx - this.slideX * this.ease;
    // this.slideY += this.vx - this.slideX * this.ease;

    this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
    this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
  }
}
class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    // Slice canvas into grid
    this.cellWidth = this.width / 25;
    this.cellHeight = this.height / 40;
    // draw multiple cells and organize in grid
    // horizontal cell and vertical
    // create one cell object
    // this.cell = new Cell(this, 0, 0);
    this.imageGrid = [];

    this.createGrid();
    console.log(this.imageGrid);
    // mouse
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 150,
    };
    // mouse cordinats
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }
  //   organize into a grid
  createGrid() {
    let index = 0;
    // create grid
    // y = vertical rows
    for (let y = 0; y < this.height; y += this.cellHeight) {
      // x horizontal columns
      for (let x = 0; x < this.width; x += this.cellWidth) {
        index++;
        // everytime when jump to new cell in the grid, take img grid array(35 kodo eilute) push new cell in there
        this.imageGrid.push(new Cell(this, x, y, index));
      }
    }
  }
  //   custom render method
  render(context) {
    // auto generated index ( is cia galima padaryti visokiu variaciju)
    this.imageGrid.forEach((cell, i) => {
      cell.update();
      cell.draw(context);
    });
  }
}

const effect = new Effect(canvas);

// animation loop to create illusion of movement
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
