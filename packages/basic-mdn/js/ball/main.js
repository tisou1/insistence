let count = 0
const para = document.querySelector('p');
// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min = 0,max = 255) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num
}

function randomColor() {
  return `rgba(${random()}, ${random()}, ${random()})`
}

function Shape(x, y, velX, velY, exists) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.exists = exists
}

function Ball(x, y, velX, velY,exists, color, size) {
  //继承Shape
  Shape.call(this, x, y, velX, velY, exists)
  //颜色和大小
  this.color = color 
  this.size = size
}

Ball.prototype = Object.create(Shape.prototype)
Ball.prototype.constructor = Ball
//画小球的方法
Ball.prototype.draw = function () {
  ctx.beginPath()
  ctx.fillStyle = this.color
  //画一个以x,y为圆心的 this.size为半径的圆弧(圆) 从0 ~ 2*Math.PI个弧度
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.fill()
}
Ball.prototype.update = function () {
  if((this.x + this.size) >= width) {
    this.velX *= -1
  }

  if((this.x - this.size) <= 0) {
    this.velX *= -1
  }

  if((this.y + this.size) >= height) {
    this.velY *= -1
  }

  if((this.y - this.size) <= 0) {
    this.velY *= -1
  }

  this.x += this.velX
  this.y += this.velY
}
//碰撞检测
Ball.prototype.collisionDetect = function () {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x
      const dy = this.y - balls[j].y
      const distance = Math.sqrt(dx**2 + dy**2)

      if(distance < this.size + balls[j].size && balls[j].exists) {
        //改变颜色
        balls.color = this.color = randomColor()
        //改变轨迹
        // this.velX = -this.velX
        // this.velY = -this.velY
        // this.x += this.velX
        // this.y += this.velY

        // balls[j].velX = -balls[j].velX
        // balls[j].velY = -balls[j].velY
        // balls[j].x += balls[j].velX
        // balls[j].y += balls[j].velY

      }
    }
  }
}


function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists)

  this.color = 'white'
  this.size = 10
}

EvilCircle.prototype = Object.create(Shape.prototype)
EvilCircle.prototype.constructor = EvilCircle

EvilCircle.prototype.draw = function () {
  ctx.beginPath()
  ctx.strokeStyle = this.color
  ctx.lineWidth = 3
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.stroke()
}

// 定义 EvilCircle 的边缘检测（checkBounds）方法

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y += this.size;
  }
};

// 定义 EvilCircle 控制设置（setControls）方法

EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    switch(e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        this.x -= this.velX;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        this.x += this.velX;
        break;
      case 'w':
      case 'W':
      case 'ArrowUp':
        this.y -= this.velY;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        this.y += this.velY;
        break;
    }
  };
};

// 定义 EvilCircle 冲突检测函数

EvilCircle.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if( balls[j].exists ) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = '剩余彩球数：' + count;
      }
    }
  }
};

let balls = []
while(balls.length < 25) {
  let size = random(10, 20)
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, width - size),
    random(-7, 10),
    random(-7, 10),
    true,
    randomColor(),
    size
  )
  console.log(ball.x,ball.y,ball.velX, ball.velY )
  balls.push(ball)
  count++
  para.textContent = '剩余彩球数：' + count;
}

let evil = new EvilCircle(random(0, width), random(0, height), true)
evil.setControls()

function loop() {
  ctx.fillStyle = `rgba(0, 0, 0, 0.25)`
  ctx.fillRect(0, 0, width, height)

  for(let i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw()
      balls[i].collisionDetect()
      balls[i].update()
    }
  }

  evil.draw()
  evil.checkBounds()
  evil.collisionDetect()

  requestAnimationFrame(loop)
}

loop()