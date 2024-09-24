class CanvasDrawer {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
    }
  
    drawCanvas() {
      this.ctx.fillStyle = "khaki";
      this.ctx.fillRect(0, 0, 400, 500);
    }
  }
  
  class Rect extends CanvasDrawer {
    constructor(canvasId, x, y, width, height, color) {
      super(canvasId);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
  
    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  class Circle extends CanvasDrawer {
    constructor(canvasId, x, y, radius, color) {
      super(canvasId);
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
  
    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fill();
    }
  }
  
  class Platform extends Rect {
    constructor(canvasId, x, y) {
      super(canvasId, x, y, 100, 300, "teal");
    }
  }
  
  class Ball extends Circle {
    constructor(canvasId, x, y) {
      super(canvasId, x, y, 10, "brown");
      this.addX = 1;
      this.addY = -3;
    }
  
    update() {
      this.x += this.addX;
      this.y += this.addY;
  
      if (this.x + this.radius > 400) {
        this.addX = -this.addX;
        console.log("+права стена");
      }
      if (this.x - this.radius < 0) {
        this.addX = -this.addX;
        console.log("+левая стена");
      }
      if (this.y - this.radius < 0) {
        this.addY = -this.addY;
        console.log("+потолок");
      }
      if (this.y + this.radius > 500) {
        this.addY = -this.addY;
        console.log("+пол");
      }
    }
  }
  addEventListener("keydown", function (event) {
    if (event.code === "Enter") {

    }
  });
  class Game {
    constructor(canvasId) {
      this.drawer = new CanvasDrawer(canvasId);
      this.platform = new Platform(canvasId, 150, 100);
      this.ball = new Ball(canvasId, 200, 200);
    }
  
    render() {
      this.drawer.drawCanvas();
      this.platform.draw(); 
      this.ball.update(); 
      this.ball.draw(); 
  
      requestAnimationFrame(() => this.render());
    }
  }
  

  const game = new Game("canvas");
  game.render();

