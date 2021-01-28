let deadZombiesCount = 0
let smallZombiesCount = 0
let madZombiesCount = 0
let strongZombiesCount = 0

for (let i = 0; i < zombiesData.length; i++) {
    let HP = Number(zombiesData[i])

    if (isNaN(HP) || HP < 1) {
        deadZombiesCount++
    } else if (HP < 11) {
        smallZombiesCount++
    } else if (HP < 21) {
        madZombiesCount++
    } else {
        strongZombiesCount++
    }
}


let elementsValues = [
    [".total-zombies", zombiesData.length],
    [".dead-zombies", deadZombiesCount],
    [".small-zombies", smallZombiesCount],
    [".mad-zombies", madZombiesCount],
    [".strong-zombies", strongZombiesCount],
]

for (let i = 0; i < elementsValues.length; i++) {
    const element = document.querySelector(elementsValues[i][0])
    element.textContent += elementsValues[i][1]
    console.info(element.innerText)
}
