document.addEventListener("DOMContentLoaded", function() {
    showStats();
});

let player = {
    stats: {
        "level": 1,
        "experience": 0,
        "maxHp": 100,
        "currentHp": 100,
        "maxEnergy": 100,
        "currentEnergy": 100,
        "maxMana": 100,
        "currentMana": 100,
        "credits": 100,
        "force": 0,
    },
    skills: {
        bare_hands: {
            "lvl": 1,
            "exp": 0,
        },
        lightsaber: {
            "lvl": 0,
            "exp": 0,
        },
        blaster: {
            "lvl": 1,
            "exp": 0,
        },
        mind_trick: {
            "lvl": 0,
            "exp": 0,
        },
        surroundings_man: {
            "lvl": 0,
            "exp": 0,
        },
        piloting: {
            "lvl": 1,
            "exp": 0,
        },
        gambling: {
            "lvl": 1,
            "exp": 0,
        },
    }
}

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
}

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
    document.getElementById('info').innerHTML = "";
    showStats();
}

// gamble ACTION
function gamble() {
    if (player.stats.currentEnergy >= 10) {
        info = "";
        earnedcredits = Math.floor((Math.random() < 0.5 ? -5 : 5) + (player.skills.gambling.lvl * 2));
        player.stats.credits += earnedcredits;
        player.stats.currentEnergy -= 10;
        calculateExp(player.skills.gambling, earnedcredits);
        gambleInfo();
    } else info = "Not enough energy";
    gambleInfo();
}

// DISPLAY gambling COMUNICATES
function gambleInfo() {
    document.getElementById('current-credits').innerHTML = earnedcredits;
    document.getElementById('info').innerHTML = info;
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
    document.getElementById('level').innerHTML = player.stats.level;
    document.getElementById('totalExp').innerHTML = player.stats.experience;
    document.getElementById('currentHp').innerHTML = player.stats.currentHp;
    document.getElementById('maxHp').innerHTML = player.stats.maxHp;
    document.getElementById('currentEnergy').innerHTML = player.stats.currentEnergy;
    document.getElementById('maxEnergy').innerHTML = player.stats.maxEnergy;
    document.getElementById('credits').innerHTML = player.stats.credits;
    document.getElementById('force').innerHTML = player.stats.force;
    document.getElementById('bare_hands').innerHTML = player.skills.bare_hands.lvl;
    document.getElementById('lightsaber').innerHTML = player.skills.lightsaber.lvl;
    document.getElementById('blaster').innerHTML = player.skills.blaster.lvl;
    document.getElementById('mind_trick').innerHTML = player.skills.mind_trick.lvl;
    document.getElementById('surroundings_man').innerHTML = player.skills.surroundings_man.lvl;
    document.getElementById('piloting').innerHTML = player.skills.piloting.lvl;
    document.getElementById('gambling').innerHTML = player.skills.gambling.lvl;
}




//TERMINAL

jQuery(function($, undefined) {
    $('#term_demo').terminal(function(command) {
        var coin = 0;

        function town(name) {
            alert("Hello " + name + " !");
            return 0;
        }

        var first_name = window.prompt("Enter your name: ");

        town(first_name);

        //CHARACTER CUSTOMIZATION

        alert("Now, please tell us how you look like " + first_name + ".");

        var height = window.prompt("Choose your height: short/avarage/tall");


        var build = window.prompt("Choose your body type: skinny/slim/avarage/overweight/obese/muscular");


        var skin = window.prompt("Choose your skin: pale/honey/olive/tan/dark");

        var hair_color = window.prompt("Enter your hair color:");


        var eye_color = window.prompt("Enter your eye color:");


        var hair_length = window.prompt("Choose your hair length: bald/short/medium/long");


        var hair_texture = window.prompt("Choose your hair texture: straight/wavy/curly");
    }, {
        greetings: 'Welcome to the temple, young Padawan...\nType "START" and press enter to begin your adventure.',

    });

});