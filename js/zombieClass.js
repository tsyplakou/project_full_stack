function zombieInit(type=ZOMBIE_TYPE.SMALL, health=70){
	this.health = health
	this.currentHealth = this.health
	this.type = type

	this.hitZombie = function(hitDamage) {
		this.currentHealth -= hitDamage
	}
	this.isAlive = function() {
		return this.currentHealth > 0
	}
}
