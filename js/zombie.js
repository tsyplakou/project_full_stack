function Zombie(zombieModel, events){
   let health = zombieModel.health
   let isAlive = true
   const zombieElement = document.createElement("div")
   const zombieStatusElement = document.createElement("progress")

   this.addZombieElementToContainer = (container) => {
       zombieElement.classList.add("zombie")
       zombieStatusElement.classList.add("zombie-status")
       zombieStatusElement.max = health
       zombieStatusElement.value = health

       zombieElement.appendChild(zombieStatusElement)
       zombieElement.classList.add(this.className)

       zombieElement.addEventListener('click', () => {
           hitZombie(HIT_DAMAGE)
       })

       zombieElement.addEventListener('animationend', () => {
           zombieElement.remove()
          events.onFinish()
       })

       container.appendChild(zombieElement)
   }
   const hitZombie = (hitDamage) => {
      health -= hitDamage
      zombieStatusElement.value = health

      if (isAlive && health < 0) {
         isAlive = false
         zombieElement.classList.add("dead")
         zombieStatusElement.remove()
         setTimeout(() => {
            zombieElement.remove()
            events.onDead()
         }, 2000);
      }
   }
}

function SmallZombie(){
   Zombie.apply(this, arguments)
   this.className = "small"
}

function MadZombie(){
   Zombie.apply(this, arguments)
   this.className = "mad"
}

function StrongZombie(){
   Zombie.apply(this, arguments)
   this.className = "strong"
}
