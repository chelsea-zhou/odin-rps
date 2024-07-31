/*
1. 3 buttons for selection
2. button call "playround" with player selection
3. div for displaying results
4. display running score and announce winner once one player reaches 5 points
5. merge ui to main 
*/

const computerSelection = () => {
    const num = getRandomInt(1, 4);
    if (num === 1) {
        return 'r';
    } else if (num ===2) {
        return 'p';
    } 
    return 's';
};

const rule = {
    r: {
        p: 0,
        s: 1
    },
    p: {
        r: 1,
        s: 0
    },
    s: {
        p: 1,
        r: 0
    }
}
function game(hc, cc) {
    if (hc === cc){
        return [0, 0]
    }
    const h_score = rule[hc][cc];
    return [h_score, 1 - h_score];
    
}

function playRound(humanChoice, computerSelection) {
    const rounds = 5;
    let cur = 1;
    let h_score = 0;
    let c_score = 0;
    while (cur < rounds) {
        const human = humanChoice();
        const computer = computerSelection();
        console.log(`human choice: ${human} - computer choice: ${computer}`);
        const result = game(human, computer);
        h_score += result[0];
        c_score += result[1];
        cur +=1
    }
    console.log(`scores: human ${h_score} computer ${c_score}`);
    let winner = '';
    if (h_score === c_score) {
        winner = 'tie'
    } else if(h_score > c_score) {
        winner = 'human'
    } else{
       winner = 'computer'
    }
    console.log(`winner is ${winner}`);
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function playOneRound(humanChoice) {

    
    const computerChoice = computerSelection();
    console.log(`human ${humanChoice} - computer ${computerChoice}`);
    const result = game(humanChoice, computerChoice);
    h_score += result[0];
    c_score += result[1];
    console.log(`score : ${h_score}, ${c_score}`)
    return [h_score, c_score];

}

function updateScoreSection(score, id) {
    const element=document.querySelector(`#${id}`);
    element.innerHTML = score;
}

function declareWinner(winner) {
    const element = document.querySelector('.winner');
    element.innerHTML = `winner is ${winner}!`;
}
function undeclareWinner(winner) {
    const element = document.querySelector('.winner');
    element.innerHTML = '';
}

function disableButtons(isDisabled){
    buttons.forEach((button) => button.disabled = isDisabled);
}

function restart() {
    h_score, c_score = 0;
    winner = '';
    disableButtons(false);
    updateScoreSection(0, 'player_score');
    updateScoreSection(0, 'computer_score');
    undeclareWinner();
}

let h_score = 0;
let c_score = 0;
const MAX_SCORE = 5;
let winner='';

const buttons = document.querySelectorAll(".choice");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const humanChoice = e.target.id;
        const result = playOneRound(humanChoice);
        updateScoreSection(result[0], 'player_score');
        updateScoreSection(result[1], 'computer_score');
        if (h_score === MAX_SCORE) {
            winner = 'player';
        } else if (c_score === MAX_SCORE) {
            winner = 'computer'
        }
        if (winner.length >0) {
            declareWinner(winner);
            disableButtons(true);
        }
    });
})

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", restart);
