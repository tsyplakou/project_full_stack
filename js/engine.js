const game = new zombieGameEngineInit(zombies, 1)

function zombieGameEngineInit(zombies=[], maxZombiesOnBattleground=1) {
    this.zombiesArmy = []
    this.aliveZombiesCounter = 0
    this.maxZombiesOnBattleground = maxZombiesOnBattleground

    for (let i=0; i < zombies.length; i++) {
        this.zombiesArmy.push(new zombieInit(zombies[i].type, zombies[i].health))
    }

    this.playerHP = this.zombiesArmy.length

    this.isGameOver = function() {
        return (this.emptyArmy() && this.aliveZombiesCounter == 0)
    }
    this.checkWin = function() {
        return (this.isGameOver() && this.playerHP > 0)
    }
    this.getNextZombie = function() {
        return this.zombiesArmy.shift()
    }
    this.emptyArmy = function() {
        return (this.zombiesArmy.length == 0)
    }
    this.canAddZombieElement = function() {
        return (!game.emptyArmy() && game.aliveZombiesCounter < game.maxZombiesOnBattleground)
    }
    this.createZombieElement = function(zombie) {
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
                    this.aliveZombiesCounter--
                    zombieElement.remove()
                }, 2000)
            }
        })

        zombieElement.addEventListener('animationend', () => {
            zombieElement.remove()
            this.aliveZombiesCounter--
            this.playerHP--
        })

        this.aliveZombiesCounter++
        return zombieElement
    }
    this.addZombieToContainer = function(container) {
        container.appendChild(this.createZombieElement(this.getNextZombie()))
    }
}
