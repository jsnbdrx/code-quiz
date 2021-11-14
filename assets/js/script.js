var questions = [{
    title: "What are variables used for in JavaScript?",
    choices: ["Storing numbers, dates, or other values", "varying randomly", "causing scary flashbacks", "none of these"],
    answer: "Storing numbers, dates, or other values"
},
{
    title: "______ tag is an extension to HTML that can enclose any number of JavaScript statements.",
    choices: ["body", "title", "script", "head"],
    answer: "script"
},
{
    title: " Which of the following best describes JavaScript?",
    choices: ["a low-level programming language", "a scripting language precompiled in the browser.", " a compiled scripting language", "an object-oriented scripting language"],
    answer: "an object-oriented scripting language"
},
{
    title: "In JavaScript, _________ is an object of the target language data type that encloses an object of the source language.",
    choices: ["a wrapper", "a link", "a cursor", "a form"],
    answer: "a wrapper"
},
{
    title: "Which of the following is not a valid JavaScript variable name?",
    choices: ["_first_and_last_names", "2names", "FirstAndLast", "None of these"],
    answer: "2names"
}
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeRemaining = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeRemaining = 45;
document.getElementById("timeRemaining").innerHTML = timeRemaining;

timer = setInterval(function() {
    timeRemaining--;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;
    //proceed to end the game function when timer is below 0 at any time
    if (timeRemaining <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quiz-body").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quiz-body").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeRemaining = 0;
timer = null;

document.getElementById("timeRemaining").innerHTML = timeRemaining;

var quizContent = `
<h1>Quiz!</h1>
<h3>Click to play!</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quiz-body").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeRemaining -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quiz-body").innerHTML = quizContent;
}