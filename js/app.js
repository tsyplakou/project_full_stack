let dead_zombies = 0
let small_zombies = 0
let mad_zombies = 0
let strong_zombies = 0

for (let i = 0; i < zombiesData.length; i++) {

	let HP = Number(zombiesData[i])

	if (isNaN(HP) || HP < 1) {
		dead_zombies++
	} else if (HP < 11) {
		small_zombies++
	} else if (HP < 21) {
		mad_zombies++
	} else {
		strong_zombies++
	}
}

document.querySelector('.total-zombies').textContent += '{' + zombiesData.length + '}'
document.querySelector('.dead-zombies').textContent += '{' + dead_zombies + '}'
document.querySelector('.small-zombies').textContent += '{' + small_zombies + '}'
document.querySelector('.mad-zombies').textContent += '{' + mad_zombies + '}'
document.querySelector('.strong-zombies').textContent += '{' + strong_zombies + '}'
