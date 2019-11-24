var NPC = function(name, hitpoints = 100) {
  this.name = name;
  this.hitpoints = hitpoints;
  console.log("New NPC created " + this.name);
};

NPC.prototype.status = function() {
  console.log("Name: " + this.name + " hitpoints: " + this.hitpoints);
  if (this.hitpoints <= 0) {
    if (this.name % 2) {
      console.log("NPC " + this.name + " has died");
    } else {
      console.log("Hero " + this.name + " has died");
    }
  }
};

function Hero(name, hitpoints = 100, damage = 10) {
  NPC.call(this, name, hitpoints);
  this.critical = false;
  this.damage = damage;
}

Hero.prototype = Object.create(NPC.prototype); // See note below

Hero.prototype.attack = function(character) {
  if (this.critical) {
    console.log(
      this.name +
        " is attacking " +
        character.name +
        " and inflicting " +
        this.damage * 1.5 +
        " damage -- CRITICAL HIT"
    );
    character.hitpoints = character.hitpoints - this.damage * 1.5;

    if (character instanceof Hero) {
      this.critical = false;
      if (character.hitpoints > 0) {
        character.critical = true;
      }
    }
  } else {
    console.log(
      this.name +
        " is attacking " +
        character.name +
        " and inflicting " +
        this.damage +
        " damage"
    );
    character.hitpoints = character.hitpoints - this.damage;
  }
  character.status();
};

function chooseAttacker(random) {
  if (karakteri.filter(k => k.name == random).length > 0) {
    //console.log("postoi");
    return true;
  } else {
    //console.log("ne postoi");
    return false;
  }
}

function chooseAttacked(rand, random) {
  if (karakteri.filter(k => k.name == rand).length > 0 && rand != random) {
    //console.log("postoi");
    return true;
  } else {
    //console.log("ne postoi");
    return false;
  }
}

var karakteri = [];

for (i = 0; i <= 24; i++) {
  if (i % 2) {
    var char = new NPC(i);
  } else {
    var char = new Hero(i);
  }
  karakteri.push(char);
}
karakteri[2].critical = true;

while (karakteri.length > 1) {
  do {
    var random = Math.floor(Math.random() * (25 / 2)) * 2 || 0;
    var chosen = chooseAttacker(random);
  } while (!chosen);

  var attacker = karakteri.filter(k => k.name == random);

  do {
    var rand = Math.floor(Math.random() * 25) || 0;
    var chosenAttacked = chooseAttacked(rand, random);
  } while (!chosenAttacked);

  var attacked = karakteri.filter(k => k.name == rand);

  attacker[0].attack(attacked[0]);

  if (attacked[0].hitpoints <= 0) {
    karakteri = karakteri.filter(k => k.name != rand);
  }
}

console.log(karakteri);
