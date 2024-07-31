
const humanSelection = () => prompt();
const computerSelection = () => {
    const num = getRandomInt(1, 3);
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


//playRound(humanSelection, computerSelection);

// a <p> with red text that says “Hey I’m red!”
// an <h3> with blue text that says “I’m a blue h3!”
// a <div> with a black border and pink background color with the following elements inside of it:
//  another <h1> that says “I’m in a div”
//   a <p> that says “ME TOO!”
//  Hint for this one: after creating the <div> with createElement, append the <h1> and <p> to it before adding it to the container.

const container = document.querySelector('.practice');
const text = document.createElement('p');
text.innerText = 'Hey im red!';
text.style.color ='red'

const h3 = document.createElement('h3');
h3.innerText = 'im a blue h3';
h3.style.color = 'blue';

console.log(container)
container.appendChild(text);
container.appendChild(h3);

const div = document.createElement('div');
div.style.cssText = 'border: 1px solid black; background-color: pink';

const h1 = document.createElement('h1');
h1.innerHTML = "im in a div";

const p = document.createElement('p');
p.innerText = 'me too!';

div.appendChild(h1);
div.appendChild(p);

container.appendChild(div);