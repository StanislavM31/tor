const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
const centerRect = {
  x: 150,
  y: 150,
  width: 100,
  height: 200,
};

function getSpeed() {
  return Math.floor(Math.random() * 16);
}
//случайный вектор XY ( случайное направление)
function getVectorX() {
  let sign = Math.floor(Math.random() * 2);// +/-
  let vectorX = Math.floor(Math.random() *10)+1;//избегаем нуля
  if (sign) {
    return vectorX;
  } else {
    return -vectorX;
  }
}
function getVectorY() {
  let sign = Math.floor(Math.random() * 2);// +/-
  let vectorY = Math.floor(Math.random() * 10)+1;
  if (sign) {
    return vectorY;
  } else {
    return -vectorY;
  }
}

let balls = [
  {
    x: 256,
    y: 40,
    radius: 25,
    dx: getVectorX(),
    dy: getVectorY(),
    color: "blue",
  },
  {
    x: 350,
    y: 450,
    radius: ballRadius,
    dx: getVectorX(),
    dy: getVectorY(),
    color: "brown",
  },
];

function drawCanvas() {
  ctx.fillStyle = "khaki";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall(ball) {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 6, false);
  ctx.fill();
}

function drawCenterRect() {
  ctx.fillStyle = "teal";
  ctx.clearRect(centerRect.x, centerRect.y, centerRect.width, centerRect.height);
}

function updateBall(ball) {
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dx = -ball.dx;
  }
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy;
  }

  if (
    ball.x + ball.radius > centerRect.x &&
    ball.x - ball.radius < centerRect.x + centerRect.width &&
    ball.y + ball.radius > centerRect.y &&
    ball.y - ball.radius < centerRect.y + centerRect.height
  ) {
    const overlapLeft = ball.x + ball.radius - centerRect.x;
    const overlapRight =
      centerRect.x + centerRect.width - (ball.x - ball.radius);
    const overlapTop = ball.y + ball.radius - centerRect.y;
    const overlapBottom =
      centerRect.y + centerRect.height - (ball.y - ball.radius);

    const minOverlap = Math.min(
      overlapLeft,
      overlapRight,
      overlapTop,
      overlapBottom
    );

    if (minOverlap === overlapLeft || minOverlap === overlapRight) {
      ball.dx = -ball.dx;
    } else {
      ball.dy = -ball.dy;
    }
  }
}

function checkCollision(b1, b2) {
    const dx = b1.x - b2.x;
    const dy = b1.y - b2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < b1.radius + b2.radius) {
        // перекрытие
        const overlap = b1.radius + b2.radius - distance;


        const normX = dx / distance;
        const normY = dy / distance;

        // Устанавливаем позицию шаров, чтобы они не перекрывались
        b1.x += normX * (overlap / 2);
        b2.x -= normX * (overlap / 2);
        
        b1.y += normY * (overlap / 2);
        b2.y -= normY * (overlap / 2);

        // Округляем координаты
        b1.x = Math.round(b1.x);
        b1.y = Math.round(b1.y);
        b2.x = Math.round(b2.x);
        b2.y = Math.round(b2.y);

        // Инвертируем направления движения
        if (Math.abs(normX) > Math.abs(normY)) {
            b1.dx = -b1.dx; 
            b2.dx = -b2.dx; 
        } else {
            b1.dy = -b1.dy;
            b2.dy = -b2.dy;
        }
    }
}

let flag = true;

function render() {
  if (flag) {
    drawCanvas();
    drawCenterRect();

    balls.forEach((ball) => {
      updateBall(ball);
      drawBall(ball);
    });

    checkCollision(balls[0], balls[1]);
    let blue = balls[0];
    let brown = balls[1];
    console.log(`blue x:${blue.x} y:${blue.y} dx:${blue.dx} dy:${blue.dy}`);
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
