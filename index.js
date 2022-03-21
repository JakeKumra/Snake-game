const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start-btn")
const scoreDisplay = document.getElementById("score")
let message = document.getElementById("message")
const width = 10
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.5
let timerId = 0
createGrid()

// for each element in the array, carry out the function of adding the classlist of "snake" to style the element
currentSnake.forEach(indexItem => squares[indexItem].classList.add("snake"))

// listen on the document for a keydown event, and invoke controlDirection function
document.addEventListener("keydown", controlDirection)

startBtn.addEventListener("click", startGame)

function startGame() {
    message.textContent = "Good luck!"
    // remove snake from grid
    currentSnake.forEach(indexItem => squares[indexItem].classList.remove("snake"))
    // remove the apple
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    direction = 1
    score = 0
    // re add new score to browser 
    scoreDisplay.textContent = score
    speed = 0.9
    intervalTime = 1000
    generateApples()
    // add new snake to grid
    currentSnake.forEach(indexItem => squares[indexItem].classList.add("snake"))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
            (currentSnake[0] - width < 0 && direction === -width) || // top
            (currentSnake[0] + width >= width*width && direction === width) || // bottom
            (currentSnake[0] % width === width-1 && direction === 1) || // right
            (currentSnake[0] % width === 0 && direction === -1) || // left   
            squares[currentSnake[0] + direction].classList.contains('snake')
         )  {
            message.textContent = "Game Over! Play Again?" 
            return clearInterval(timerId)
             
        }
         
        // remove last element in the snake array and store in variable
        let tail = currentSnake.pop()
        // remove styling from the last element in the array
        squares[tail].classList.remove('snake')
        // add an extra element to the start of the array corresponding to the next number
        currentSnake.unshift(currentSnake[0] + direction)

        // deal with snake head
        if ( squares[currentSnake[0]].classList.contains("apple") ) {
            // remove apple class from square array
            squares[currentSnake[0]].classList.remove("apple")
            // grow snake by adding class of snake to square
            squares[tail].classList.add('snake')
            // grow snake array
            currentSnake.push(tail)
            // generate new apple
            generateApples()
            // add one to score
            score++
            scoreDisplay.textContent = score
            // increase speed of snake
            clearInterval(timerId)
            intervalTime = intervalTime * speed
            timerId = setInterval(move, intervalTime)
        }

        // style the first element 
         squares[currentSnake[0]].classList.add("snake")
}

function controlDirection(e) {
    if (e.keyCode === 39) {
        // right
        direction = 1
    } else if (e.keyCode === 37) {
        // left
        direction = -1
    } else if (e.keyCode === 38) {
        // up
        direction = -width
    } else {
        // down
        direction = +width}
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

function createGrid() {
    for (let i = 0; i < width*width; i++) {
        // create a div element and store in variable square
        let square = document.createElement("div")
        // add styling to the square
        square.classList.add("square")
        // append the square element child to the grid
        grid.appendChild(square)
        // add the square into an array called squares
        squares.push(square)
        // loop through to create 100 squares
        console.log(squares)
    }
}
