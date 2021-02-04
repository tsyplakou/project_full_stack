[[SCOPE = Zombie => global]]
function Zombie(zombieModel, events){
    let isAlive = true
    const zombieElement = document.createElement("div")
    const zombieHealthBar = document.createElement("progress")

    this.addZombieToContainer = (container) => {
        zombieElement.classList.add("zombie")
        zombieHealthBar.classList.add("zombie-status")
        zombieHealthBar.max = zombieModel.health
        zombieHealthBar.value = zombieModel.health

        zombieElement.appendChild(zombieHealthBar)
        zombieElement.classList.add(this.className)
        zombieElement.style.left = container.offsetWidth + 'px'

        zombieElement.addEventListener(
            'click',
             () => events.onClick(this),
        )

        container.appendChild(zombieElement)
    }

    this.doNextStep = () => {
    if (isAlive) {
        let leftCoord = +zombieElement.style.left.replace('px', '')
        if (leftCoord <= 0) {
            events.onFinish(this)
        }
        else {
            zombieElement.style.left = leftCoord - this.xStep + "px"
        }
     }
    }

    this.hitZombie = (hitDamage) => {
        zombieHealthBar.value -= hitDamage

        if (isAlive && zombieHealthBar.value <= 0) {
            isAlive = false
            zombieHealthBar.style.display = "none"
            zombieElement.classList.add("dead")
            setTimeout(() => {
                events.onDead(this)
            }, 2000);
        }
    }

    this.destroy = () => {
      zombieElement.remove()
    }
}

[[SCOPE = SmallZombie => global]]
function SmallZombie(){
    Zombie.apply(this, arguments)
    this.className = "small"
    this.xStep = 5
}

function MadZombie(){
    Zombie.apply(this, arguments)
    this.className = "mad"
    this.xStep = 4
}

function StrongZombie(){
    Zombie.apply(this, arguments)
    this.className = "strong"
    this.xStep = 3
}

function BirdZombie(){
    Zombie.apply(this, arguments)
    this.className = "bird"
    this.xStep = 6
}
