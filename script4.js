const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
const centerRect = {
    x: 150,
    y: 150,
    width: 100,
    height: 200
};

function getRandomSpeed() {
    return (Math.random() - 0.5) * 9; 
}

let balls = [
    {
        x: 50,
        y: 50,
        radius: ballRadius,
        dx: getRandomSpeed(),
        dy: getRandomSpeed(),
        color: "blue"
    },
    {
        x: 350,
        y: 450,
        radius: ballRadius,
        dx: getRandomSpeed(),
        dy: getRandomSpeed(),
        color: "brown"
    }
];

function drawCanvas() {
    ctx.fillStyle = "khaki";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawCenterRect() {
    ctx.fillStyle = "teal";
    ctx.fillRect(centerRect.x, centerRect.y, centerRect.width, centerRect.height);
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

    if (ball.x + ball.radius > centerRect.x && ball.x - ball.radius < centerRect.x + centerRect.width &&
        ball.y + ball.radius > centerRect.y && ball.y - ball.radius < centerRect.y + centerRect.height) {
        const overlapLeft = ball.x + ball.radius - centerRect.x;
        const overlapRight = centerRect.x + centerRect.width - (ball.x - ball.radius);
        const overlapTop = ball.y + ball.radius - centerRect.y;
        const overlapBottom = centerRect.y + centerRect.height - (ball.y - ball.radius);

        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

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
        const angle = Math.atan2(dy, dx);
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        const vx1 = b1.dx * cos + b1.dy * sin;
        const vy1 = b1.dy * cos - b1.dx * sin;
        const vx2 = b2.dx * cos + b2.dy * sin;
        const vy2 = b2.dy * cos - b2.dx * sin;

        const temp_vx1 = vx2;
        const temp_vx2 = vx1;

        b1.dx = temp_vx1 * cos - vy1 * sin;
        b1.dy = vy1 * cos + temp_vx1 * sin;
        b2.dx = temp_vx2 * cos - vy2 * sin;
        b2.dy = vy2 * cos + temp_vx2 * sin;
    }
}

function render() {
    drawCanvas();
    drawCenterRect();
    
    balls.forEach(ball => {
        updateBall(ball);
        drawBall(ball);
    });

    checkCollision(balls[0], balls[1]);
    
    requestAnimationFrame(render);
}



render();