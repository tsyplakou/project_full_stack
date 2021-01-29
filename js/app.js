const iconsPath = "icons/"

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < zombies.length; i++) {

        const zombieElement = document.createElement("img")
        zombieElement.addEventListener('click', () => {
            zombieElement.src = iconsPath + "zombie-dead.gif"
        })
        let zombieImgName

        if (zombies[i].type === ZOMBIE_TYPE.SMALL){
            zombieImgName = "zombie-small.gif"
        }
        else if (zombies[i].type === ZOMBIE_TYPE.MAD){
            zombieImgName = "zombie-mad.gif"
        }
        else if (zombies[i].type === ZOMBIE_TYPE.STRONG){
            zombieImgName = "zombie-strong.gif"
        }

        zombieElement.src = iconsPath + zombieImgName
        document.querySelector(".zombies").appendChild(zombieElement)
    }
})
