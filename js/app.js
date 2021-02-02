function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function zombieGenerating() {
    if (game.isGameOver()) {
        const battleground = document.querySelector(".battleground")
        if (game.checkWin()) {
            battleground.classList.add("winner")
        }
        else {
            battleground.classList.add("loser")
        }
        return
    }
    else if (game.canAddZombieElement()) {
        game.addZombieToContainer(document.querySelector(`.line${getRandomInt(1, 4)}`))
    }
    setTimeout(zombieGenerating, 500)
}


document.addEventListener('DOMContentLoaded', () => {
    zombieGenerating()
})
