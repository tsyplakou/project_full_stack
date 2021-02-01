let HP = 100
let timer

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < zombies.length; i++) {

        const zombieElement = document.createElement("div")
        zombieElement.classList.add("zombie")

        zombieElement.addEventListener('click', () => {
            if (zombieElement.classList.contains("dead")) {
                zombieElement.classList.remove("dead")
            }
            else {
                zombieElement.classList.add("dead")
            }
            setTimeout(() => {
                zombieElement.remove()
            }, 3000)
        })

        if (zombies[i].type === ZOMBIE_TYPE.SMALL){
            zombieElement.classList.add("small")
            timer = zombies[i].timer
        }
        else if (zombies[i].type === ZOMBIE_TYPE.MAD){
            zombieElement.classList.add("mad")
            timer = zombies[i].timer
        }
        else if (zombies[i].type === ZOMBIE_TYPE.STRONG){
            zombieElement.classList.add("strong")
            timer = zombies[i].timer
        }

        document.querySelector(".line3").appendChild(zombieElement)
        // Destroy zombie object if it near house
        setTimeout(() => {
            zombieElement.remove()
            HP--
        }, timer)
    }
})
