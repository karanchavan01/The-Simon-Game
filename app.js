let level = 0;
let high_level = 0;
let prev_level = 0;
let start = false;
let game = [];
let player = [];
let btns = ["green", "yellow", "red", "blue"];

document.addEventListener("keypress", function(){
    if(start == false){
        console.log("Game is Started.....");
        start = true;
        levelUp();
    }
});

let text = document.querySelector("h2");
function gameFlash(btn){
    btn.classList.add("game-flash");
    setTimeout(function(){
        btn.classList.remove("game-flash");
    }, 1000);
}

function levelUp(){
    player = [];
    level++;
    text.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 3);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    game.push(randColor);
    console.log(game);
    gameFlash(randBtn);
}

function playerFlash(btn){
    btn.classList.add("player-flash");
    setTimeout(function(){
        btn.classList.remove("player-flash");
    }, 1000);
}

function checkAns(index){
    if(player[index] === game[index]){
        if(player.length == game.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        let curr_level = level;
        if(curr_level > high_level){
            high_level = curr_level;
        }
        text.innerHTML = `Game Over! Press any key, to RESTART <br> You are out on Level ${level} <br> HIGH LEVEL : ${high_level} & PREVIOUS LEVEL : ${prev_level}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";
        }, 500)
        reset();
        if(curr_level > high_level){
            reset1();
        }
    }
}

function btnPress(){
    // console.log("Btn was pressed");
    // console.log(this);
    let btn = this;
    playerFlash(btn);
    playerColor = btn.getAttribute("id");
    player.push(playerColor);
    checkAns(player.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    start = false;
    game = [];
    player = [];
    prev_level = level;
    level = 0;
}

function reset1(){
    high_level = level;
}
