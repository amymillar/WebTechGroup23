const questions = {
    mobs: [
        {
            type: "multiple-choice",
            question: "Which of the following mobs can you not tame as a pet?",
            answers: [
                { text: "Parrot", correct: false },
                { text: "Rabbit", correct: true },
                { text: "Wolf", correct: false },
                { text: "Horse", correct: false }
            ]
        },
        {
            type: "true-false",
            question: "If you attack a neutral mob it will attack you back",
            answers: [
                { text: "True", correct: true },
                { text: "False", correct: false }
            ]
        },
        {
            type: "image-choice",
            question: "Which mob explodes when it gets close to the player?",
            answers: [
                { src: "../images/skeleton.webp", correct: false },
                { src: "../images/enderman.webp", correct: false },
                { src: "../images/creeper.png", correct: true },
                { src: "../images/blaze.webp", correct: false }
            ]
        }
    ],
    mechanics: [
        {
            type: "true-false",
            question: "An Anvil uses over 30 iron ingots to craft",
            answers: [
                { text: "True", correct: true },
                { text: "False", correct: false }
            ]
        },
        {
            type: "image-choice",
            question: "What is the crafting recipe for a Fence Gate",
            answers: [
                { src: "../images/fence.png", correct: false },
                { src: "../images/ladder.png", correct: false },
                { src: "../images/sticks.png", correct: false },
                { src: "../images/gate.png", correct: true }
            ]
        },
        {
            type: "multiple-choice",
            question: "what dyes combined make Cyan dye?",
            answers: [
                { text: "Lapis lazuli, Bonemeal", correct: false },
                { text: "Cactus green, Lapis lazuli", correct: true },
                { text: "lime, Rose red", correct: false },
                { text: "Ink sack, Lapis lazuli", correct: false }
            ]
        },
    ],
    storyline: [
        {
            type: "image-choice",
            question: "What boss has to be defeated to 'complete' the game?",
            answers: [
                { src: "../images/warden.webp", correct: false },
                { src: "../images/dragon.webp", correct: true },
                { src: "../images/guardian.webp", correct: false },
                { src: "../images/wither.webp", correct: false }
            ]
        },
        {
            type: "multiple-choice",
            question: "Who is the main male protagonist in Minecraft?",
            answers: [
                { text: "Alex", correct: false },
                { text: "Herobrine", correct: false },
                { text: "Steve", correct: true },
                { text: "Notch", correct: false }
            ]
        },
        {
            type: "true-false",
            question: "Is Herobrine real?",
            answers: [
                { text: "True", correct: false },
                { text: "False", correct: false },
                { text: "Neither...", correct: true }
            ]
        }
    ],
    general: [
        {
            type: "true-false",
            question: "The maximum stack capacity of ender pearls is 64",
            answers: [
                { text: "True", correct: false },
                { text: "False", correct: true }
            ]
        },
        {
            type: "multiple-choice",
            question: "What ore is required to enchant using an enchating table?",
            answers: [
                { text: "Lapis Lazuli", correct: true },
                { text: "Emerald", correct: false },
                { text: "Diamond", correct: false },
                { text: "Redstone", correct: false }
            ]
        },
        {
            type: "image-choice",
            question: "Which villeger has the job of a Librarian?",
            answers: [
                { src: "../images/librarian.webp", correct: true },
                { src: "../images/blacksmith.webp", correct: false },
                { src: "../images/trader.webp", correct: false },
                { src: "../images/fletcher.webp", correct: false }
            ]
        }
    ]
};

let currentQuiz = [];
let currentQuizName = "";
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 30;

const questionText = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreHeader = document.getElementById("score-header");
const timerDisplay = document.getElementById("timer");
const timerContainer = document.getElementById("timer-container");

function startQuiz(quizName) {
    currentQuizName = quizName; 
    currentQuiz = questions[quizName];
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    updateScoreHeader(quizName);

    if (quizName === "general") {
        timeLeft = 30;
        timerDisplay.textContent = timeLeft;
        timerContainer.style.display = "block";
        startTimer();
    } else {
        clearInterval(timerInterval);
        timerContainer.style.display = "none";
    }
}

function showQuestion() {
    resetState();
    const currentQuestion = currentQuiz[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    if (currentQuestion.type === "image-choice") {
        currentQuestion.answers.forEach(answer => {
            const img = document.createElement("img");
            img.src = answer.src;
            img.classList.add("image-option");
            img.addEventListener("click", () => selectAnswer(answer.correct));
            answerButtons.appendChild(img);
        });
    } else {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectAnswer(answer.correct));
            answerButtons.appendChild(button);
        });
    }
}

function getQuizFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("quiz");
}

window.onload = () => {
    const quizName = getQuizFromURL();
    if (quizName && questions[quizName]) {
        startQuiz(quizName);
    } else {
        alert("Returning to categories.");
        window.location.href = "category1.html";
    }
};

function resetState() {
    answerButtons.innerHTML = "";
}

function selectAnswer(correct) {
    if (correct) {
        score++;
        alert("Correct!");
    } else {
        alert("Wrong answer.");
    }

    updateScoreHeader(currentQuizName);
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuiz.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    clearInterval(timerInterval);
    const quizName = getQuizFromURL();
    localStorage.setItem('quizScore', score);

    new Audio("sounds/victory.mp3").play();
    setTimeout(() => {
        window.location.href = `end-quiz.html?quiz=${quizName}`;
    }, 3000);
}

function updateScoreHeader(quizName = "Quiz") {
    scoreHeader.innerText = `${quizName} QUIZ: SCORE: ${score}`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            showScore();
        }
    }, 1000);
}