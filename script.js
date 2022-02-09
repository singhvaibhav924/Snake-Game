var board = document.getElementsByClassName("board")[0];
var food  =document.createElement("div");
var score = 0;
var lastPaintTime = 0;
var foodRow;
var foodCol;
var colInc = 1;
var rowInc = 0;
var gameStarted;
var directionchanged;

let snakeBody = [
    {rowStart : 10, colStart : 11,},
    {rowStart : 10, colStart : 10,},
    {rowStart : 10, colStart : 9,},
];
alert("Welcome to the game press any key to start !!")

function reset() {
    score = 0;
    lastPaintTime = 0;
    gameStarted = false;
    foodRow = Math.floor(Math.floor(Math.random()*100)/5)+1;
    foodCol = Math.floor(Math.floor(Math.random()*100)/5)+1;
    colInc = 1;
    rowInc = 0;
    snakeBody = [
        {rowStart : 10, colStart : 11,},
        {rowStart : 10, colStart : 10,},
        {rowStart : 10, colStart : 9,},
    ];
    directionchanged = true;
    document.getElementsByClassName("score")[0].innerHTML = "Score : "+score;
}
gameEngine();


function gameEngine() {
    reset();
    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
        switch(e.key) {
            case "ArrowUp":
                if((rowInc==0 && directionchanged) || !gameStarted) {
                    rowInc = -1;
                    colInc = 0;
                    directionchanged = false;
                    gameStarted = true;
                    
                }
                break;
            case "ArrowDown":
                if((rowInc==0 && directionchanged) || !gameStarted) {
                    colInc = 0;
                    rowInc = 1;
                    directionchanged = false;
                    gameStarted = true;
                }
                break;
            case "ArrowLeft":
                if((colInc==0 && directionchanged)) {
                    colInc = -1;
                    rowInc = 0;
                    directionchanged = false;
                    
                }
                break;
            case "ArrowRight":
                if((colInc==0 && directionchanged) || !gameStarted) {
                    colInc = 1;
                    rowInc = 0;
                    directionchanged = false;
                    gameStarted = true;
                }
                break;
            default :
            if(!gameStarted) {
                colInc = 1;
                rowInc = 0;
                directionchanged = false;
                gameStarted = true;
            }
            break;
        }
    });
}

function main(ctime) {
    if((ctime-lastPaintTime)/1000>=1/3) {
        board.innerHTML = "";
        for(let i = 1;i<snakeBody.length;i++) {
            var tail = document.createElement("div");
            tail.style.gridRowStart = snakeBody[i].rowStart;
            tail.style.gridColumnStart = snakeBody[i].colStart;
            tail.classList.add("tail");
            board.appendChild(tail);
        }
        food.style.gridColumnStart = foodCol;
        food.classList.add("food");
        food.style.gridRowStart = foodRow;
        board.appendChild(food);
        var head = document.createElement("div");
        head.style.gridColumnStart = snakeBody[0].colStart;
        head.innerHTML = ":";
        head.style.gridRowStart = snakeBody[0].rowStart;
        head.classList.add("head");
        board.appendChild(head);
        if(gameStarted) {
            checkEaten();
            checkCollision();
            updateCoordinates();
        }
        lastPaintTime = ctime;
        
    }
   // console.log(count);
    requestAnimationFrame(main);
}

function updateCoordinates() {
        
    for(let i = snakeBody.length-1; i>=1;i--) {
        snakeBody[i].rowStart = snakeBody[i-1].rowStart;
        snakeBody[i].colStart = snakeBody[i-1].colStart;
    }
    snakeBody[0].colStart = snakeBody[0].colStart+ colInc;
    snakeBody[0].rowStart = snakeBody[0].rowStart+ rowInc;
    directionchanged = true;
}
function checkCollision() {
    if(snakeBody[0].rowStart==21||snakeBody[0].rowStart==0||snakeBody[0].colStart==21||snakeBody[0].colStart==0) {
        alert("Oh Shit You Crashed !! Press Any Key to Start Again");
        reset();
    }
    for(let i = 1; i<snakeBody.length; i++) {
        if(snakeBody[0].colStart==snakeBody[i].colStart && snakeBody[0].rowStart==snakeBody[i].rowStart) {
            alert("Oh Shit You Crashed !! Press Any Key to Start Again");
            reset();
            break;
        }       
    }
}
function checkEaten() {
    if(snakeBody[0].colStart == foodCol && snakeBody[0].rowStart == foodRow) {
        foodCol = Math.floor(Math.floor(Math.random()*100)/5)+1;
        foodRow = Math.floor(Math.floor(Math.random()*100)/5)+1;
        snakeBody.push({
            rowStart : 1,
            colStart : 1
        });
        score+=10;
        document.cookie = score;
        console.log(document.cookie.split("=")[1]);
        document.getElementsByClassName("score")[0].innerHTML = "Score : "+score;
    }
    
}
function onUpPress() {
    if((rowInc==0 && directionchanged) || !gameStarted) {
        rowInc = -1;
        colInc = 0;
        directionchanged = false;
        gameStarted = true;
        
    }
}
function onLeftPress() {
    if((colInc==0 && directionchanged)) { 
        colInc = -1;
        rowInc = 0;
        directionchanged = false;
        
    }
}
function onRightPress() {
    if((colInc==0 && directionchanged) || !gameStarted) {
        colInc = 1;
        rowInc = 0;
        directionchanged = false;
        gameStarted = true;
    }
}
function onDownPress() {
    if((rowInc==0 && directionchanged) || !gameStarted) {
        colInc = 0;
        rowInc = 1;
        directionchanged = false;
        gameStarted = true;
    }
}