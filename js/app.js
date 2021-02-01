let playerHP = 3
let timer


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


zombies.addZombieToLine = function(lineNr) {
    if (this.length <=0) {
        const battleground = document.querySelector(".battleground")
        if (playerHP > 0) {
            battleground.classList.add("winner")
        }
        else {
            battleground.classList.add("loser")
        }
    }

    const zombieElement = document.createElement("div")
    const zombieStatusElement = document.createElement("progress")

    zombieElement.classList.add("zombie")
    zombieStatusElement.classList.add("zombie-status")
    zombieStatusElement.max = zombies[0].health
    zombieStatusElement.value = zombies[0].health

    if (this[0].type === ZOMBIE_TYPE.SMALL){
        zombieElement.classList.add("small")
        timer = this[0].timer
    }
    else if (this[0].type === ZOMBIE_TYPE.MAD){
        zombieElement.classList.add("mad")
        timer = this[0].timer
    }
    else if (this[0].type === ZOMBIE_TYPE.STRONG){
        zombieElement.classList.add("strong")
        timer = this[0].timer
    }

    zombieElement.addEventListener('click', () => {
        zombieStatusElement.value -= HIT_DAMAGE
        if (zombieStatusElement.value <= 0 && !zombieElement.classList.contains("dead")) {
            zombieElement.classList.add("dead")
            setTimeout(() => {
                zombieElement.remove()
                this.shift()
                this.addZombieToLine(getRandomInt(1, 4))
            }, 2000)
        }
    })

    zombieElement.appendChild(zombieStatusElement)
    document.querySelector(`.line${lineNr}`).appendChild(zombieElement)
    // Destroy zombie object if it near house
    setTimeout(() => {
        if (!zombieElement.classList.contains("dead")){
            zombieElement.remove()
            playerHP--
            this.shift()
            this.addZombieToLine(getRandomInt(1, 4))
        }
    }, timer)
}

document.addEventListener('DOMContentLoaded', () => {
    zombies.addZombieToLine(getRandomInt(1, 4))
})
