// Object 'questions' to hold all the quiz questions grouped by categories
const questions = {
    // Mobs and Monsters quiz contents
    mobs: [
        {
            // Multiple choice question type
            type: "multiple-choice",
            // Question text
            question: "Which of the following mobs can you not tame as a pet?",
            // Answer options - correct: true indicates the correct answer choice
            answers: [
                { text: "Parrot", correct: false },
                { text: "Rabbit", correct: true }, 
                { text: "Wolf", correct: false },
                { text: "Horse", correct: false }
            ]
        },
        {
            // True or false question type
            type: "true-false",
            // Question text
            question: "If you attack a neutral mob it will attack you back",
            // Answer options
            answers: [
                { text: "True", correct: true },
                { text: "False", correct: false }
            ]
        },
        {
            // Imagine choice question type 
            type: "image-choice",
            // Question text
            question: "Which mob explodes when it gets close to the player?",
            // Answer options 
            answers: [
                { src: "../images/skeleton.webp", correct: false },
                { src: "../images/enderman.webp", correct: false },
                { src: "../images/creeper.png", correct: true },
                { src: "../images/blaze.webp", correct: false }
            ]
        }
    ],
    // Mechanics: Crafting and Fighting quiz contents
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
    // Storyline quiz contents
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
    // General Knowledge quiz contents
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

// Function to start the quiz
function startQuiz(quizName) {
    // Set quiz name
    currentQuizName = quizName; 
    // Get questions for the selected quiz
    currentQuiz = questions[quizName];
    // Go to the first question
    currentQuestionIndex = 0;
    // Reset score
    score = 0;
    // Show first question
    showQuestion();
     // Update the score header
    updateScoreHeader(quizName);

    // If the general knowledge quiz is selected set up timer
    if (quizName === "general") {
        // Set timer to 30 seconds
        timeLeft = 30;
        // Update timer display
        timerDisplay.textContent = timeLeft;
        // Make the timer visable on the page
        timerContainer.style.display = "block";
        // Start timer
        startTimer();
    // If any othrer quiz is selected 
    } else {
        // Stop timer
        clearInterval(timerInterval);
        // Hide timer from page
        timerContainer.style.display = "none";
    }
}

// function to show a question
function showQuestion() {
    // Reset the page 
    resetState();
    // Get next question
    const currentQuestion = currentQuiz[currentQuestionIndex];
    // Display question
    questionText.innerText = currentQuestion.question;

    // If the question type is image-choice create image buttons 
    if (currentQuestion.type === "image-choice") {
        currentQuestion.answers.forEach(answer => {
            // Create image element
            const img = document.createElement("img");
            // Set the image source to the answers image
            img.src = answer.src;
            // Add class for styling
            img.classList.add("image-option");
            img.addEventListener("click", () => selectAnswer(answer.correct));
            answerButtons.appendChild(img);
        });
    // For multiple-choice and true-false questions
    } else {
        currentQuestion.answers.forEach(answer => {
            // Create button element
            const button = document.createElement("button");
            // Set the button text
            button.innerText = answer.text;
            // Add class for styling
            button.classList.add("btn");
            button.addEventListener("click", () => selectAnswer(answer.correct));
            answerButtons.appendChild(button);
        });
    }
}

// Function to get the quiz name selected from the URL
function getQuizFromURL() {
    // Get URL
    const params = new URLSearchParams(window.location.search);
    // Return the quiz name 
    return params.get("quiz");
}

// Load the quiz
window.onload = () => {
    // Get the quiz name
    const quizName = getQuizFromURL();
    // If the quiz name is valid start the quiz
    if (quizName && questions[quizName]) {
        startQuiz(quizName);
    }
};

// Reset the answer button from last question
function resetState() {
    // Clear answer
    answerButtons.innerHTML = "";
}

// Function to handle selecting an answer
function selectAnswer(correct) {
    // If the answer chosen is right
    if (correct) {
        // Add 1 to score
        score++;
        // Show alert for correct answer
        alert("Correct!");
    // if the answer chosen is wrong
    } else {
        // Show alert for wrong answer
        alert("Wrong answer.");
    }

    // Update score header
    updateScoreHeader(currentQuizName);
    // Move to the next question
    currentQuestionIndex++;

    // If there is another question move on 
    if (currentQuestionIndex < currentQuiz.length) {
        // show next question
        showQuestion();
    // If there are no more questions
    } else {
        // Display score
        showScore();
    }
}

// Function to show the final score at the end of a quiz
function showScore() {
    clearInterval(timerInterval);
    // stop the timer
    const quizName = getQuizFromURL();
    // Get quiz name
    localStorage.setItem('quizScore', score);

    // Play victory sound
    new Audio("sounds/victory.mp3").play();
    setTimeout(() => {
        // Go to the end page after the sound plays
        window.location.href = `end-quiz.html?quiz=${quizName}`;
    // 3 second delay to allow sound to play through
    }, 3000);
}

// Update the score header  with the current score
function updateScoreHeader(quizName = "Quiz") {
    // Display quiz name and score
    scoreHeader.innerText = `${quizName} QUIZ: SCORE: ${score}`;
}

// Function to start the quiz timer
function startTimer() {
    // Reset timer
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        // Reduce the time by 1
        timeLeft = timeLeft - 1;
        // Update the timer display
        timerDisplay.textContent = timeLeft;
        // If time is up
        if (timeLeft <= 0) {
            // Stop the timer
            clearInterval(timerInterval);
            // Show Alert for time is up
            alert("Time's up!");
            // Show score after time is up
            showScore();
        }
    // Run this every second
    }, 1000);
}