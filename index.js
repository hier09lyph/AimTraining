const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeBtns = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#fc0069', '#980dd9', '#6751f5', '#d90d62', '#cd19fa']

let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeBtns.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    screens[1].classList.add('up')
    createRandomCircle()
    setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00 : ${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomeNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomeNumber(size, width - size)
    const y = getRandomeNumber(size, height - size)
    const color = getRandomColor()
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    circle.style.boxShadow = `0 0 2px ${color},0 0 10px ${color}`
    board.append(circle)
}

function getRandomeNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        if (circle) {
            circle.click()
        }
    }

    setInterval(kill, 30)
}