document.addEventListener("DOMContentLoaded", function () {
	showStats();
});

let player = {
	// tutaj dodalem dodatkowe propety
	physics: {
		name: null,
		height: null,
		skin: null,
		build: null,
		eyeColor: null,
		hairColor: null,
		hairTexture: null,
	},
	stats: {
		level: 1,
		experience: 0,
		maxHp: 100,
		currentHp: 100,
		maxEnergy: 100,
		currentEnergy: 100,
		maxMana: 100,
		currentMana: 100,
		credits: 100,
		force: 0,
	},
	skills: {
		bare_hands: {
			lvl: 1,
			exp: 0,
		},
		lightsaber: {
			lvl: 0,
			exp: 0,
		},
		blaster: {
			lvl: 1,
			exp: 0,
		},
		mind_trick: {
			lvl: 0,
			exp: 0,
		},
		surroundings_man: {
			lvl: 0,
			exp: 0,
		},
		piloting: {
			lvl: 1,
			exp: 0,
		},
		gambling: {
			lvl: 1,
			exp: 0,
		},
	},
};

const skillExp = {
	1: 0,
	2: 500,
	3: 1100,
	4: 2000,
	5: 3500,
	6: 5500,
	7: 8500,
	8: 13000,
	9: 19000,
	10: 27000,
	11: 37000,
};

let earnedcredits = 0;
let info = "";

function main() {
	gamble();
	showStats();
}

// REFILL PLAYERS ENERGY
function addEnergy() {
	player.stats.currentEnergy = 100;
	player.stats.credits -= 100;
	document.getElementById("info").innerHTML = "";
	showStats();
}

// gamble ACTION
function gamble() {
	if (player.stats.currentEnergy >= 10) {
		info = "";
		earnedcredits = Math.floor(
			(Math.random() < 0.5 ? -5 : 5) + player.skills.gambling.lvl * 2
		);
		player.stats.credits += earnedcredits;
		player.stats.currentEnergy -= 10;
		calculateExp(player.skills.gambling, earnedcredits);
		gambleInfo();
	} else info = "Not enough energy";
	gambleInfo();
}

// DISPLAY gambling COMUNICATES
function gambleInfo() {
	document.getElementById("current-credits").innerHTML = earnedcredits;
	document.getElementById("info").innerHTML = info;
}

// ADD EXP AND CHECK FOR LVL UP
function calculateExp(skillName, expGained) {
	skillName.exp += expGained;
	var a;
	for (a in skillExp) {
		a = parseInt(a);
		if (skillExp[a] <= skillName.exp) {
			skillName.lvl = a;
		}
	}
}

// DISPLAY UPDATED STATS
function showStats() {
	document.getElementById("level").innerHTML = player.stats.level;
	document.getElementById("totalExp").innerHTML = player.stats.experience;
	document.getElementById("currentHp").innerHTML = player.stats.currentHp;
	document.getElementById("maxHp").innerHTML = player.stats.maxHp;
	document.getElementById("currentEnergy").innerHTML =
		player.stats.currentEnergy;
	document.getElementById("maxEnergy").innerHTML = player.stats.maxEnergy;
	document.getElementById("credits").innerHTML = player.stats.credits;
	document.getElementById("force").innerHTML = player.stats.force;
	document.getElementById("bare_hands").innerHTML =
		player.skills.bare_hands.lvl;
	document.getElementById("lightsaber").innerHTML =
		player.skills.lightsaber.lvl;
	document.getElementById("blaster").innerHTML = player.skills.blaster.lvl;
	document.getElementById("mind_trick").innerHTML =
		player.skills.mind_trick.lvl;
	document.getElementById("surroundings_man").innerHTML =
		player.skills.surroundings_man.lvl;
	document.getElementById("piloting").innerHTML = player.skills.piloting.lvl;
	document.getElementById("gambling").innerHTML = player.skills.gambling.lvl;
}

//TERMINAL
jQuery(function ($, undefined) {
	$("#term_demo").terminal(
		//dziala to tak ze tutaj nazywamy sobie funkcje iam ktora przyjmuje parametr name
		// czyli zeby ja wywolac z tego terminala to wlasnie tam musimy napisac iam {jakas_wartosc}
		{
			iam: function (name) {
				player.physics.name = name;
				document.getElementById("name").innerHTML = player.physics.name;
				this.echo(
					"Hello, " +
						name +
						". Welcome to your new journey, please choose your height now. To do so please type height and one of the options short/average/tall"
				);
			},
			height: function (height) {
				player.physics.height = height;
				document.getElementById("height").innerHTML = player.physics.height;

				this.echo(
					"Great! Now choose your build. To do so please type build and one of the options skinny/slim/avarage/overweight/obese/muscular"
				);
			},
			build: function (build) {
				player.physics.build = build;
				document.getElementById("build").innerHTML = player.physics.build;

				this.echo(
					`You are ${build}! Now choose your skin tone. To do so please type skin and one of the options pale/honey/olive/tan/dark`
				);
			},
			skin: function (skin) {
				player.physics.skin = skin;
				document.getElementById("skin").innerHTML = player.physics.skin;

				this.echo(
					`You are ${skin}! Now choose your eye color. To do so please type eye 'your_color'`
				);
			},
			eye: function (eyeColor) {
				player.physics.eyeColor = eyeColor;
				document.getElementById("eyes").innerHTML = player.physics.eyeColor;

				this.echo(
					`You've got ${eyeColor} eyes! Now choose your hair color. To do so please type 'hair your_color'`
				);
			},
			hair: function (hairColor) {
				player.physics.hairColor = hairColor;
				document.getElementById("hair_color").innerHTML =
					player.physics.hairColor;

				this.echo(
					`You've got ${hairColor} hair! Now choose your hair texture. To do so please type 'texture' and choose your texture: straight/wavy/curly`
				);
			},
			texture: function (texture) {
				player.physics.hairTexture = texture;
				document.getElementById("hair_texture").innerHTML =
					player.physics.hairTexture;
				this.echo(
					`You've got ${texture} hair! Character initialization completed successfully!`
				);
			},
		},
		{
			greetings:
				'Welcome to the temple, young Padawan...\nType iam "yourname" and press enter to begin your adventure.',
		}
	);
});
