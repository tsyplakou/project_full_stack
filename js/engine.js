function Game(containers, events) {
    if (Game.instance) {
        return Game.instance
    }
    Game.instance = this

    let started = false
    let paused = false
    const activeInstances = []
    let tickCounter = 0
    const actionsOnTick = {}

    const tick = () => {
        if (checkGameEnd()) {
            onGameOver()
            return
        }

        setTimeout(() => {
            tickCounter++

            if (paused) {
                return
            }

            if (actionsOnTick[tickCounter]) {
                for (let i = 0; i < actionsOnTick[tickCounter].length; i++) {
                    actionsOnTick[tickCounter][i]()
                }
                delete actionsOnTick[tickCounter]
            }

            for (let i=0; i < activeInstances.length; i++) {
                activeInstances[i].doNextStep()
            }

            tick()
        }, 20);
    }
    this.start = () => {
        if (started) {
            return
        }

        for (let i = 0; i < zombies.length; i++) {
            const randomTick = getRandomInt(1, 10) * 25
            addTickAction(randomTick, () => createZombie(i))
        }

        tick()
    }
    this.pause = () => {
        paused = true
        events.onPause()
    }
    this.continue = () => {
        if (!paused) {
            return
        }

        paused = false
        events.onContinue()
        tick()
    }
    const addTickAction = (tickNr, action) => {
        if (!actionsOnTick[tickNr]) {
            actionsOnTick[tickNr] = [action]
        }
        else {
            actionsOnTick[tickNr].push(action)
        }
    }
    const removeActiveInstance = (instance) => {
        activeInstances.splice(activeInstances.indexOf(instance), 1)
    }
    const createZombie = (zIndex) => {
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
        else if (zombieModel.type == ZOMBIE_TYPE.BIRD) {
            ZombieClass = BirdZombie
        }

        const events = {
            onDead: (zombie) => {
                zombie.destroy()
                removeActiveInstance(zombie)
            },
            onFinish: (zombie) => {
                zombie.destroy()
                removeActiveInstance(zombie)
                onGameOver()
            },
            onClick: (zombie) => {
                if (paused) {
                    return
                }
                zombie.hitZombie(HIT_DAMAGE)
            }
        }
        const zombie = new ZombieClass(zombieModel, events)

        zombie.addZombieToContainer(getRandomFromArray(containers))
        activeInstances.push(zombie)
    }
    const checkGameEnd = () => {
        return (!Object.keys(actionsOnTick).length && !activeInstances.length)
    }
    const onGameOver = () => {
        for (let i=0; i < activeInstances.length; i++ ) {
            activeInstances[i].destroy()
        }

        for (let i=0; i < actionsOnTick.length; i++ ) {
            delete actionsOnTick[i]
        }

        if (!activeInstances.length) {
            events.onWin()
        }
        else {
            events.onLose()
        }
    }
}
