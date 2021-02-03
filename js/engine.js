function Game(container, events) {
    if (Game.instance) {
        return Game.instance
    }
    Game.instance = this

    let alreadyStarted = false
    let zIndex = 0

    this.start = () => {
        if (!alreadyStarted){
            alreadyStarted = true
            createZombie()
        }
    }
    const createZombie = () => {
        if (zIndex >= zombies.length) {
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
                onGameOver()
            },
        }
        const zombie = new ZombieClass(zombieModel, events)
        zombie.addZombieToContainer(container)
        zIndex++
    }
    const onGameOver = () => {
        if (zIndex == zombies.length) {
            events.onWin()
        }
        else {
            events.onLose()
        }
    }
}
