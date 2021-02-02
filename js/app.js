function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
    const events = {
        onLose: () => {
            document.querySelector(".battleground").classList.add("loser")
        },
        onWin: () => {
            document.querySelector(".battleground").classList.add("winner")
        },
    }
    const game = new Game(document.querySelector(`.line${getRandomInt(1, 4)}`), events)
    game.start()
})
