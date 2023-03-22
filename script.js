//board
let blockSize = 20
let rows = 40
let cols = 88
let board
let context

//snake head
let snakeX = blockSize * 5
let snakeY = blockSize * 5
let velocityX = 0
let velocityY = 0
let snakeBody = []

//food
let foodX
let foodY

let gameOver = false;

window.onload = function() {
    board = document.getElementById('board')
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext('2d') //used for drawing on the board
    placeFood()
    document.addEventListener('keyup', changeDirection)
    setInterval(update, 100)
}

function update() {
    if(gameOver) {
        return;
    }

    //board
    context.fillStyle = '#1a1a1a'
    context.fillRect(0, 0, board.width, board.height)
    //food
    context.fillStyle = '#ff0000'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if(snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    //snake
    context.fillStyle = '#00ff00'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    //Game Over Conditions
    if(snakeX < 0 || snakeY < 0 || snakeX > cols*blockSize || snakeY > rows*blockSize) {
        gameOver = true
        alert('Game Over')
    }
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true
            alert('Game Over')
        }
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

function changeDirection(event) {
    if(event.code === "ArrowUp" && velocityY === 0) {
        velocityX = 0
        velocityY = -1
    }
    else if(event.code === "ArrowDown" && velocityY === 0) {
        velocityX = 0
        velocityY = 1
    }
    else if(event.code === "ArrowLeft" && velocityX === 0) {
        velocityX = -1
        velocityY = 0
    }
    else if(event.code === "ArrowRight" && velocityX === 0) {
        velocityX = 1
        velocityY = 0
    }
}