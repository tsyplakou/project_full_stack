function Game(container, events) {
    if (Game.instance) {
        return Game.instance
    }
    Game.instance = this

    let started = false
    let zIndex = 0
    let playerHP = 2

    this.start = () => {
        if (!started){
            started = true
            createZombie()
        }
    }
    const createZombie = () => {
        if (zIndex >= zombies.length || playerHP <= 0) {
            onGameOver()
            return
        }

        const zombieModel = zombies[zIndex]
        let ZombieClass

        if (zombieModel.type == ZOMBIE_TYPE.SMALL) {
            ZombieClass = SmallZombie
        }
        else if (zombieModel.type == ZOMBIE_TYPE.MAD) {
            ZombieClass = MadZombie
        }
        else if (zombieModel.type == ZOMBIE_TYPE.STRONG) {
            ZombieClass = StrongZombie
        }

        const events = {
            onDead: () => {
                createZombie()
            },
            onFinish: () => {
                playerHP--
                createZombie()
            },
        }
        const zombie = new ZombieClass(zombieModel, events)
        zombie.addZombieElementToContainer(container)
        zIndex++
    }
    const onGameOver = () => {
        if (playerHP > 0) {
            events.onWin()
        }
        else {
            events.onLose()
        }
    }
}
