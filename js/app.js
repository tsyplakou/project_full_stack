const zombiesCounter = {
    dead: 0,
    small: 0,
    mad: 0,
    strong: 0,
}

for (let i = 0; i < zombiesData.length; i++) {
    const HP = Number(zombiesData[i])

    if (isNaN(HP) || HP < 1) {
        zombiesCounter.dead++
    } else if (HP < 11) {
        zombiesCounter.small++
    } else if (HP < 21) {
        zombiesCounter.mad++
    } else {
        zombiesCounter.strong++
    }
}

const totalZombiesElement = document.querySelector(".total-zombies")
const deadZombiesElement = document.querySelector(".dead-zombies")
const smallZombiesElement = document.querySelector(".small-zombies")
const madZombiesElement = document.querySelector(".mad-zombies")
const strongZombiesElement = document.querySelector(".strong-zombies")

totalZombiesElement.textContent += zombiesData.length
deadZombiesElement.textContent += zombiesCounter.dead
smallZombiesElement.textContent += zombiesCounter.small
madZombiesElement.textContent += zombiesCounter.mad
strongZombiesElement.textContent += zombiesCounter.strong

console.info(totalZombiesElement.innerText)
console.info(deadZombiesElement.innerText)
console.info(smallZombiesElement.innerText)
console.info(madZombiesElement.innerText)
console.info(strongZombiesElement.innerText)
