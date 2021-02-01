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
        })

        if (zombies[i].type === ZOMBIE_TYPE.SMALL){
            zombieElement.classList.add("small")
        }
        else if (zombies[i].type === ZOMBIE_TYPE.MAD){
            zombieElement.classList.add("mad")
        }
        else if (zombies[i].type === ZOMBIE_TYPE.STRONG){
            zombieElement.classList.add("strong")
        }

        document.querySelector(".line3").appendChild(zombieElement)
    }
})
