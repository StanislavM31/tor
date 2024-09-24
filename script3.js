const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ball = {
  x: 240,
  y: 200,
  radius: 10,
  addX: 20,
  addY: -1,
};

let points = [
  { x: 150, y: 100 },
  { x: 250, y: 100 },
  { x: 250, y: 400 },
  { x: 150, y: 400 },
];

let flag = 1;
let insidePlatform = false;

function drawCanvas() {
  ctx.fillStyle = "khaki";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPoints() {
  ctx.fillStyle = "red";
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPlatform() {
  ctx.fillStyle = "teal";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.lineTo(points[3].x, points[3].y);
  ctx.closePath();
  ctx.fill();
}

function updateBall() {
  ball.x += ball.addX;
  ball.y += ball.addY;
  console.log(`addX:${ball.addX} ball.addY:${ball.addY} x:${ball.x} y:${ball.y}`);
  
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.addX = -ball.addX;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.addY = -ball.addY;
  }
  //отскок шарика от платформы
  if (150 < ball.x + ball.radius < 250  && y == 100) {//верх
    ball.addY = -ball.addY;
  }
  if (150 < ball.x + ball.radius < 250  && y == 100) {//право
    ball.addY = -ball.addY;
  }

}

function checkBallInPlatform() {
  const minX = Math.min(points[0].x, points[1].x);
  const maxX = Math.max(points[0].x, points[1].x);
  const minY = Math.min(points[0].y, points[2].y);
  const maxY = Math.max(points[0].y, points[2].y);

  if (
    ball.x + ball.radius > minX && ball.x - ball.radius < maxX && ball.y + ball.radius > minY && ball.y - ball.radius < maxY
  ) {
    console.log("ВНИМАНИЕ!"); // на платформе
    insidePlatform = true; 
    ball.addX = -ball.addX;
  } else {
    insidePlatform = false; 
  }
}

function render() {
  if (flag) {
    drawCanvas();
    drawPlatform(); 
    updateBall();
    drawBall();
    drawPoints();
    checkBallInPlatform(); 
    requestAnimationFrame(render);
  }
}

addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    flag = !flag; 
    if (flag) render(); 
  }
});

render();
