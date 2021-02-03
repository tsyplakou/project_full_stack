function Zombie(zombieModel, events){
   let health = zombieModel.health
   let isAlive = true
   const zombieElement = document.createElement("div")
   const zombieHealthBar = document.createElement("progress")

   this.addZombieToContainer = (container) => {
       zombieElement.classList.add("zombie")
       zombieHealthBar.classList.add("zombie-status")
       zombieHealthBar.max = health
       zombieHealthBar.value = health

       zombieElement.appendChild(zombieHealthBar)
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
      zombieHealthBar.value = health

      if (isAlive && health =< 0) {
         isAlive = false
         zombieHealthBar.remove()
         zombieElement.classList.add("dead")
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
