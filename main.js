"use strict"

// Get html needed elements
const level = document.getElementById('level'),
    score = document.getElementById('score'),
    bestScore = document.getElementById('best-score'),
    timer = document.getElementById('timer'),
    game = document.getElementById('game'),
    btnStop = document.getElementById('stop'),
    btnPlay = document.getElementById('play'),
    btnClear = document.getElementById('clear'),
    container = document.querySelector('.container')

// Adding background effects
const effects = () => {
    setInterval(() => {
        if (blocks.length > 10) return
        const block = document.createElement('div')
        const size = randomSize()
        const position = randomPosition()
        block.classList.add('lighter-glass-box')
        block.style.width = `${size}px`
        block.style.height = `${size}px`
        block.style.zIndex = '0'
        block.style.position = 'absolute'
        block.style.top = position.y
        block.style.left = position.x
        container.appendChild(block)
        block.classList.add('rotating-box')
        removeOldDiv(block)
        blocks.push(block)
        console.log(blocks.length);
    }, 300);
}

// Random position for background effects
const randomPosition = () => {
    return {
        x: `${Math.round(Math.random() * container.offsetWidth)}px`,
        y: `${Math.round(Math.random() * container.offsetHeight)}px`
    }
}

// Random size for background effects
const randomSize = () => {
    let size = Math.random() * 400
    return size > 50 ? size : 50
}

// Remove old background effects
const removeOldDiv = (div) => {
    const move = setInterval(() => {
        clearInterval(move)
        container.removeChild(div)
        blocks = blocks.filter((block) => block != div)
        return
    }, 30000);
}

// Adding button functions
btnStop.addEventListener('pointerdown', () => stop())
btnPlay.addEventListener('pointerdown', () => play())
btnClear.addEventListener('pointerdown', () => clear())

// Changing data variables
let scoreCount = 0,
    levelCount = 0,
    timerCount = 0,
    enemyPos = 0,
    cells = [],
    blocks = [],
    bestScoreCount = window.localStorage.BEST_SCORE ? parseInt(window.localStorage.BEST_SCORE) : 0

// Show game info
const showInfo = () => {
    level.innerText = `Level: ${levelCount}`
    score.innerText = `Score: ${scoreCount}`
    timer.innerText = `Timer: ${timerCount}`
    bestScore.innerText = `Best Score: ${bestScoreCount}`
}

// Update enemy position
const update = () => {
    const clock = setInterval(() => {
        if (clock && timerCount <= 0) {
            clearInterval(clock)
            if (scoreCount > bestScoreCount) {
                bestScoreCount = scoreCount
                window.localStorage.BEST_SCORE = bestScoreCount
            }
        }
        showInfo()
        timerCount--
        enemyPos = Math.floor(Math.random() * 100)
        cells.forEach(cell => cell.classList.remove('enemy'))
        const enemy = document.getElementById(`${enemyPos}`)
        enemy.classList.add('enemy')
    }, 1000);
}

// Make game grid
const makeGrid = () => {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell', i % 2 == 0 ? 'dark-cell' : 'light-cell')
        cell.innerText = `${i}`
        cell.setAttribute('id', `${i}`)
        cell.addEventListener('pointerdown', () => {
            if (timerCount > 0 && cell.classList.contains('enemy')) {
                scoreCount++
            }
        })
        game.appendChild(cell)
        cells.push(cell)
    }
}

// Stop button function
const stop = () => {
    console.log('stop');
    if (timerCount) {
        timerCount = 0
    }
}

// Clear button function
const clear = () => {
    console.log('clear');
    stop()
    bestScoreCount = 0
    scoreCount = 0
    window.localStorage.BEST_SCORE = 0
}

// Play button function
const play = () => {
    console.log('play');
    timerCount = 60
    update()
}

// Program start function
function main() {
    console.log('starting game');
    showInfo()
    makeGrid()
    effects()
}

// Just in case wait the DOM to be loaded to start
document.addEventListener('DOMContentLoaded', () => {
    main()
})

// Todo Add more levels to the game

// Todo Add sound to the game

// Todo Add game feel