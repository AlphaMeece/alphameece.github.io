let statMod = 1;
let maxHP = 1;
let hp = 1;
let baseHP = 1;
let speed = 1;
let catchRate = 1;
let ballMod = 1;
let level = 1;
let turn = 1;
let ball = "PokeBall"
let pokemon = "Abomasnow"
let isWaterTerrain = false;
let isDark = false;
let caught = false;
let heavyBonus = 0;
let yourLevel = 1;
let sameGender = false;
let fished = false;
let status = "none";
let hpType = 0;

let pokeballs = [
    "Pokeball",
    "Great Ball",
    "Ultra Ball",
    "Master Ball",
    "Safari Ball",
    "Net Ball",
    "Dive Ball",
    "Nest Ball",
    "Repeat Ball",
    "Timer Ball",
    "Luxury Ball",
    "Premier Ball",
    "Dusk Ball",
    "Heal Ball",
    "Quick Ball",
    "Cherish Ball",
    "Park Ball",
    "Dream Ball",
    "Fast Ball",
    "Friend Ball",
    "Heavy Ball",
    "Level Ball",
    "Love Ball",
    "Lure Ball",
    "Moon Ball",
    "Sport Ball",
    "Beast Ball"
]

let catchValue = function() {
    if(ball != "Beast Ball" && pokemonList[pokemon].ub == "true") ballMod = 0.1;
    let c = (((3 * maxHP - 2 * hp) * (catchRate * ballMod) / (3 * maxHP) ) * statMod);
    if(c >= 255 || ballMod == -1) {
        document.getElementById("catchChance").innerHTML = 100;
        return;
    }
    document.getElementById("catchChance").innerHTML = (Math.floor((((65536/((255/c)**(3/16)))/65536)**4)*10000))/100;
    return
}

let updateBoxes = function() {
    isWaterTerrain = document.getElementById("waterBox").checked;
    isDark = document.getElementById("darkBox").checked;
    caught = document.getElementById("caughtBox").checked;
    sameGender = !document.getElementById("genderBox").checked;

    setBallMod();
    catchValue();
}

let changeHPType = function() {
    if(hpType == 0) {
        hpType = 1;
        document.getElementById("percent").disabled = true;
    } else {
        hpType = 0;
        document.getElementById("percent").disabled = false;
    }
    updateHealth();
}

let updateHealth = function() {
    level = parseInt(document.getElementById("levelSelect").value);
    maxHP = Math.ceil(((baseHP+31)*level)/100+level+10);
    hp = (hpType == 0) ? (Math.floor(parseInt(document.getElementById("percent").value)/100*maxHP)):1;
    catchValue();
}

let changeMon = function() {
    pokemon = document.getElementById("pokeSelect").value;
    let n = pokemonList[pokemon].num
    catchRate = parseInt(pokemonList[pokemon].catchRate);
    speed = parseInt(pokemonList[pokemon].speed);
    baseHP = parseInt(pokemonList[pokemon].hp);
    document.getElementById("pokeImage").src=`imgs/pokemon/${n < 10 ? "00"+n:n < 100 ? "0"+n:n}.png`
    updateHealth();
}

let setBallMod = function() {
    ball = document.getElementById("ballSelect").value;
    document.getElementById("ballImage").src=`imgs/balls/${ball}.png`
    switch(ball) {
        case "PokeBall":
            ballMod = 1;
            break;
        case "Great Ball":
            ballMod = 1.5;
            break;
        case "Ultra Ball":
            ballMod = 2;
            break;
        case "Master Ball":
            ballMod = -1;
            break;
        case "Safari Ball":
            ballMod = 1.5;
            break;
        case "Net Ball":
            if(pokemonList[pokemon].type1 == "water" || pokemonList[pokemon].type1 == "bug" || pokemonList[pokemon].type2 == "water" || pokemonList[pokemon].type2 == "bug") {
                ballMod = 3.5;
            } else ballMod = 1;
            break;
        case "Dive Ball":
            if(isWaterTerrain) ballMod = 3.5;
            else ballMod = 1;
            break
        case "Nest Ball":
            ballMod = (8-0.2*(level-1));
            if(ballMod < 1) ballMod = 1;
            break;
        case "Repeat Ball":
            if(caught) ballMod = 3;
            else ballMod = 1;
            break;
        case "Timer Ball":
            ballMod = 1+0.3*turn;
            if(ballMod > 4) ballMod = 4;
            break;
        case "Luxury Ball":
            ballMod = 1;
            break;
        case "Premier Ball":
            ballMod = 1;
            break;
        case "Dusk Ball":
            if(isDark) ballMod = 3;
            else ballMod = 1;
            break;
        case "Heal Ball":
            ballMod = 1;
            break;
        case "Quick Ball":
            if(turn == 1) ballMod = 4;
            else ballMod = 1;
            break;
        case "Cherish Ball":
            ballMod = 1;
            break;
        case "Park Ball":
            ballMod = -1;
            break;
        case "Dream Ball":
            if(status == "sleep") ballMod = 4;
            else ballMod = 1;
            break;
        case "Fast Ball":
            if(parseInt(pokemonList[pokemon].speed) >= 100) ballMod = 4;
            else ballMod = 1;
            break;
        case "Friend Ball":
            ballMod = 1;
            break;
        case "Heavy Ball":
            ballMod = 1;
            if(parseInt(pokemonList[pokemon].weight) < 451.1) heavyBonus = -20;
            else if(parseInt(pokemonList[pokemon].weight) >= 903) heavyBonus = 40;
            else if(parseInt(pokemonList[pokemon].weight) >= 677.3) heavuBonus = 30;
            else if(parseInt(pokemonList[pokemon].weight) >= 451.1) heavyBonus = 20;
            break;
        case "Level Ball":
            if(yourLevel/4 > level) ballMod = 8;
            else if(yourLevel/2 > level) ballMod = 4;
            else if(yourLevel > level) ballMod = 2;
            else ballMod = 1;
            break;
        case "Love Ball":
            if(!sameGender) ballMod = 8;
            else ballMod = 1;
            break;
        case "Lure Ball":
            if(fished) ballMod = 5;
            else ballMod = 1;
            break;
        case "Moon Ball":
            if(pokemonList[pokemon].moonstone == "true") ballMod = 4;
            else ballMod = 1;
            break;
        case "Sport Ball":
            ballMod = 1.5;
            break;
        case "Beast Ball":
            if(pokemonList[pokemon].ub == "true") ballMod = 5;
            else ballMod = 0.1;
    }
    catchValue();
}

let init = function() {
    changeMon();
    updateHealth();
    catchValue();
}

init();