// Catch Selectors
let startButton = document.querySelector('.start');
let lvlSpan = document.querySelector('.game .message .lvl');
let secondsSpan = document.querySelector('.game .message .seconds');
let theWord = document.querySelector('.game .the-word');
let upcomingWords = document.querySelector('.game .upcoming-words');
let input = document.querySelector('.game .input');
let timeLeftSpan = document.querySelector('.time span');
let scoreGot = document.querySelector('.score .got');
let scoreTotal = document.querySelector('.score .total');
let finishMsg = document.querySelector('.finish');
// let select = document.querySelector('.game .message select');





// Array Of Words
let words = [
    'Hello',
    'Programming',
    'Code',
    'Javascript',
    'Town',
    'Country',
    'Testing',
    'Youtube',
    'Linkedin',
    'Twitter',
    'Github',
    'Leetcode',
    'Internet',
    'Python',
    'Scala',
    'Destructuring',
    'Paradigm',
    'Styling',
    'Cascade',
    'Funny',
    'Working',
    'Dependencies',
    'Task',
    'Runner',
    'Roles',
    'Test',
    'Rust',
    'Playing',
    'Angular',
    'React'
];

// Setting Levels
const lvls = {
    'Easy': 5,
    'Normal': 4,
    'Hard': 2
};

// Default Levels
let defaultLevelName = window.prompt('What Kind Of Game Your Want[Easy | Normal | Hard]');
defaultLevelName = defaultLevelName.trim()[0].toUpperCase() + defaultLevelName.trim().slice(1);
let defaultLevelSeconds = lvls[defaultLevelName];


// Start Game
startButton.onclick = function() {
    this.style.display = 'none';
    input.removeAttribute('disabled');
    input.focus();
    // Generate Word Function
    genWords();
};


// Setting Level Name + Score + Seconds
lvlSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function() {
    return false;
};



function genWords() {
    // Get Random Word
    let randamWord = words[Math.floor(Math.random() * words.length)];
    // Get Word Index
    let wordIndex = words.indexOf(randamWord);
    // Remove Word From Array
    words.splice(wordIndex, 1);
    // Remove Upcoming Words From The Old Words
    upcomingWords.innerHTML = '';
    // Show The Random Word
    theWord.innerHTML = randamWord;
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(words[i]));
        upcomingWords.appendChild(div);
    }
    // Start Play Function
    startPlay();
}

function startPlay() {
    // Reset To The Time
    timeLeftSpan.innerHTML = defaultLevelSeconds;

    if (parseInt(scoreTotal.innerHTML) == words.length + 1) {
        timeLeftSpan.innerHTML = defaultLevelSeconds + 2;
    }

    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML == 0) {
            clearInterval(start);
            // Check The Word The Player Write
            if (theWord.innerHTML.toLowerCase() == input.value.toLowerCase()) {
                // Empty Input Field
                input.value = '';
                // Increase The Score
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    genWords();
                } else {
                    let span = document.createElement('span');
                    span.classList.add('good');
                    span.appendChild(document.createTextNode('Congraduation'));
                    finishMsg.appendChild(span);
                    upcomingWords.remove();
                    input.style.pointerEvents = 'none';
                }
            } else {
                input.style.pointerEvents = 'none';
                let span = document.createElement('span');
                span.classList.add('bad');
                span.appendChild(document.createTextNode('Game Over'));
                finishMsg.appendChild(span);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        }
    }, 1000);
}










