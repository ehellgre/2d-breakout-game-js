// 2:15:08

const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timerId;
let xDirection = 2;
let yDirection = 2;


const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;


// Create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// All Blocks
const blocks = [
    // Top Row
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    
    // 2nd Row
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    // 3rd Row
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

// console.log(blocks);

// Drawing all blocks
function addBlocks(){
for (let i = 0; i < blocks.length; i++){
    // Creates a div called block
    const block = document.createElement('div'); 
    // Returns the css classnames of an element
    block.classList.add('block');
    // Can apply css to the block now
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    // Append (=liittää)
    grid.appendChild(block);
}
}

addBlocks();

// Add player
const user = document.createElement("div");
user.classList.add("user");
drawPlayer();
grid.appendChild(user);

// Drawing the player
function drawPlayer(){
    user.style.left = currentPosition[0] + "px";
    user.style.bottom = currentPosition[1] + "px";
}

// Drawing the ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0] + "px";
    ball.style.bottom = ballCurrentPosition[1] + "px";
}

// Move player
function movePlayer(event){
    switch(event.key){
        case "ArrowLeft":
            if (currentPosition[0] > 0){
            currentPosition[0] -= 10;
            drawPlayer();
            }
            break;
        case "ArrowRight":
            if (currentPosition[0] < boardWidth - blockWidth){
            currentPosition[0] += 10;
            drawPlayer();
            }
            break;
    }
}

document.addEventListener("keydown", movePlayer);

// Creates a ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// Moves the ball
function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

timerId = setInterval(moveBall, 30);

// Check for collisions
function checkForCollisions(){
    // Check for wall collision
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)
        ){
        changeDirection();
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2)
    {
        xDirection = -2;
        return;
    }
    if(xDirection === -2 && yDirection === -2)
    {
        yDirection = 2;
        return;
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return;
    }
}

