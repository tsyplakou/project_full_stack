function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFromArray(array=[]) {
    return array[Math.floor(Math.random() * array.length)]
}

document.addEventListener("DOMContentLoaded", () => {
    const events = {
        onLose: () => {
            document.querySelector(".battleground").classList.add("loser")
        },
        onWin: () => {
            document.querySelector(".battleground").classList.add("winner")
        },
        onPause: () => {
            // Show PAUSED element
        },
        onContinue: () => {
            // Hide PAUSED element
        },
    }
    const game = new Game(document.querySelectorAll(".baseline"), events)
    game.start()

    const pauseButton = document.querySelector(".pause")
    const continueButton = document.querySelector(".continue")
    const restartButton = document.querySelector(".restart")

    pauseButton.addEventListener("click", () => {
        game.pause()
    })
    continueButton.addEventListener("click", () => {
        game.continue()
    })
    restartButton.addEventListener("click", () => {
        document.location.reload()
    })
})
