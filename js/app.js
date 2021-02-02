function zombieGenerating() {
    if (document.querySelector(".zombie") == undefined) {
        if (isGameOver()) {
            const battleground = document.querySelector(".battleground")
            if (checkWin()) {
                battleground.classList.add("winner")
            }
            else {
                battleground.classList.add("loser")
            }
        }
        else {
            addZombieToContainer(document.querySelector(`.line${getRandomInt(1, 4)}`))
        }
    }
    setTimeout(zombieGenerating, 500)
}


document.addEventListener('DOMContentLoaded', () => {
    zombieGenerating()
})
