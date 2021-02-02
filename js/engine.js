const zombiesArmy = []
let playerHP = zombies.length

for (let i=0; i < zombies.length; i++) {
    zombiesArmy.push(new zombieInit(zombies[i].type, zombies[i].health))
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkWin() {
    return (playerHP > 0 && zombiesArmy.length == 0)
}


function isGameOver() {
    return (zombiesArmy.length == 0)
}


function getNextZombie() {
    return zombiesArmy.shift()
}


function createZombieElement(zombie) {
    const zombieElement = document.createElement("div")
    const zombieStatusElement = document.createElement("progress")

    zombieElement.classList.add("zombie")
    zombieStatusElement.classList.add("zombie-status")
    zombieStatusElement.max = zombie.health
    zombieStatusElement.value = zombie.currentHealth

    zombieElement.appendChild(zombieStatusElement)

    if (zombie.type === ZOMBIE_TYPE.SMALL){
        zombieElement.classList.add("small")
    }
    else if (zombie.type === ZOMBIE_TYPE.MAD){
        zombieElement.classList.add("mad")
    }
    else if (zombie.type === ZOMBIE_TYPE.STRONG){
        zombieElement.classList.add("strong")
    }

    zombieElement.addEventListener('click', () => {
        zombie.hitZombie(HIT_DAMAGE)
        zombieStatusElement.value = zombie.currentHealth
        if (!zombie.isAlive() && !zombieElement.classList.contains("dead")) {
            zombieElement.classList.add("dead")
            zombieStatusElement.remove()
            setTimeout(() => {
                zombieElement.remove()
            }, 2000)
        }
    })

    zombieElement.addEventListener('animationend', () => {
        zombieElement.remove()
        playerHP--
    })

    return zombieElement
}


function addZombieToContainer(container, zombie_type) {
    container.appendChild(createZombieElement(getNextZombie()))
}
