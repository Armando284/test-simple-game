const level = document.getElementById('level'),
    score = document.getElementById('score'),
    bestScore = document.getElementById('best-score'),
    timer = document.getElementById('timer'),
    game = document.getElementById('game'),
    btnStop = document.getElementById('stop'),
    btnPlay = document.getElementById('play'),
    btnClear = document.getElementById('clear')

btnStop.addEventListener('pointerdown', () => stop())
btnPlay.addEventListener('pointerdown', () => play())
btnClear.addEventListener('pointerdown', () => clear())

let scoreCount = 0,
    levelCount = 0,
    timerCount = 0,
    enemyPos = 0,
    cells = [],
    bestScoreCount = window.localStorage.BEST_SCORE ? parseInt(window.localStorage.BEST_SCORE) : 0

const showInfo = () => {
    level.innerText = `Level: ${levelCount}`
    score.innerText = `Score: ${scoreCount}`
    timer.innerText = `Timer: ${timerCount}`
    bestScore.innerText = `Best Score: ${bestScoreCount}`
}

showInfo()

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

makeGrid()

const stop = () => {
    console.log('stop');
    if (timerCount) {
        timerCount = 0
    }
}

const clear = () => {
    console.log('clear');
    stop()
    bestScoreCount = 0
    scoreCount = 0
    window.localStorage.BEST_SCORE = 0
}

const play = () => {
    console.log('play');
    timerCount = 60
    update()
}