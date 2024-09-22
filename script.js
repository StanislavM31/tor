let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let drawRect = function () {
  ctx.fillStyle = "khaki";
  ctx.fillRect(0, 0, 400, 500);
};

let circle = function (x, y) {
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 6.28, false); //дуга 
  ctx.fill(); 
};

let point = function (a,b) {
  ctx.fillStyle = "red";
  /* ctx.beginPath(); */
  ctx.arc(100, 0, 50, 0, false); 
  ctx.fill(); 
};


class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  drawPlatform() {
    ctx.fillStyle = "teal";
    /* ctx.clearRect(this.x, this.y, 100, 200); */
    ctx.fillRect(this.x, this.y, 100, 300); //ширина дырки
  }
}
let platform = new Platform(150, 100); //левый верхний угол дырки

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  addX = 1;
  addY = -3;

  drawBall() {
    circle(this.x, this.y);

    this.x += this.addX;
    this.y += this.addY;

    if(this.x + 10 > 400){  
        this.addX = -this.addX;
        console.log("+права стена");
        
    }
    if(this.x - 10 < 0){ 
        this.addX = -this.addX;
        console.log("+левая стена");
    }
    if(this.y - 10 < 0){ 
        this.addY = -this.addY;
        console.log("+потолок");
    }
    if(this.y + 10 > 500){ 
        console.log("+пол");
        this.addY = -this.addY;
    }
    
  }
}
class Point {
    constructor(a,b,c,d){
        this.a=a;
        this.b=b;
        this.c=c;
        this.d=d;
    }

}


let ball = new Ball(200, 490);

let render = function () {
  drawRect();
  platform.drawPlatform();
  ball.drawBall();
  circle(200,200)
  requestAnimationFrame(render);
};

render();

addEventListener("keyup", function (event) {
  if (event.code === "Enter") console.log("enter was pressed");
});
