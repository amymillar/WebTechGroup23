// Variable to store all the quiz questions grouped by categories
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
            // Picture choice question type 
            type: "picture-choice",
            // Question text
            question: "Which mob explodes when it gets close to the player?",
            // Answer options 
            answers: [
                { src: "images/skeleton.webp", correct: false },
                { src: "images/enderman.webp", correct: false },
                { src: "images/creeper.png", correct: true },
                { src: "images/blaze.webp", correct: false }
            ]
        },
        {
            type: "true-false",
            question: "Sheep only spawn with white wool",
            answers: [
                { text: "True", correct:  false},
                { text: "False", correct: true }
            ]
        },
        {
            type: "multiple-choice",
            question: "What mob does not burn in sunlight?",
            answers: [
                { text: "Zombie", correct: false },
                { text: "Skeloton", correct: false }, 
                { text: "Phantom", correct: false },
                { text: "Spider", correct: true }
            ]
        },
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
            type: "picture-choice",
            question: "What is the crafting recipe for a Fence Gate",
            answers: [
                { src: "images/fence.png", correct: false },
                { src: "images/ladder.png", correct: false },
                { src: "images/sticks.png", correct: false },
                { src: "images/gate.png", correct: true }
            ]
        },
        {
            type: "true-false",
            question: "A bow and Arrow is the best way to kill an endermen",
            answers: [
                { text: "True", correct: false },
                { text: "False", correct: true }
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
        {
            type: "multiple-choice",
            question: "Which of these is not a weapon in Minecraft",
            answers: [
                { text: "Macel", correct: false },
                { text: "Sword", correct: false },
                { text: "Trident", correct: false },
                { text: "Spear", correct: true }
            ]
        }
    ],
    // Storyline quiz contents
    storyline: [
        {
            type: "picture-choice",
            question: "What boss has to be defeated to 'complete' the game?",
            answers: [
                { src: "images/warden.webp", correct: false },
                { src: "images/dragon.webp", correct: true },
                { src: "images/guardian.webp", correct: false },
                { src: "images/wither.webp", correct: false }
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
            question: "The Deep Dark biome was the original home of Endermen",
            answers: [
                { text: "True", correct: false },
                { text: "False", correct: true },
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
        },
        {
            type: "multiple-choice",
            question: "Wich structure hides a portal to another dimension?",
            answers: [
                { text: "Stronghold", correct: true },
                { text: "Ocean Monument", correct: false },
                { text: "Jungle Temple", correct: false },
                { text: "Ancient City", correct: false }
            ]
        }
    ],
    // Ranndom Questions quiz contents
    random: [
        {
            type: "multiple-choice",
            question: "Which biome is the rarest in the game?",
            answers: [
                { text: "Mesa", correct: false },
                { text: "Ice Spikes", correct: false },
                { text: "Mushroom Island", correct: true },
                { text: "Swamp", correct: false }
            ]
        },
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
            type: "true-false",
            question: "You can sleep in a bed to save your spawn",
            answers: [
                { text: "True", correct: true },
                { text: "False", correct: false }
            ]
        },
        {
            type: "picture-choice",
            question: "Which villeger has the job of a Librarian?",
            answers: [
                { src: "images/librarian.webp", correct: true },
                { src: "images/blacksmith.webp", correct: false },
                { src: "images/trader.webp", correct: false },
                { src: "images/fletcher.webp", correct: false }
            ]
        }
    ]
};

// Initialise variables
let quizName = "";
let score = 0;
let currentQuestionIndex = 0;
let timeLeft = 30;
let timerInterval;
let quizData = []; 
let button;

// Get HTML elements
const timerEl = document.getElementById("timer");
const timerContainer = document.getElementById("timer-container");
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const quizHeader = document.getElementById("quiz-info");
const endQuizBtns = document.getElementById("end-quiz-buttons");
const endScore = document.getElementById("end-quiz");

// Load quiz questions based on quiz name
function loadQuizData() {
    // Get the quiz from URL parameters
    const params = new URLSearchParams(window.location.search);
    quizName = params.get("quiz");
    // Load the questions for the chosen quiz
    quizData = questions[quizName];
    // Display the quizzes name and initial score
    quizHeader.textContent = `${quizName.toUpperCase()} QUIZ: SCORE: ${score} / ${quizData.length}`; 

    // Check if the quiz chosen is the random quiz and start the timer
    if (quizName === "random") {
        // Set timer to 30 seconds
        timeLeft = 30;
        timerEl.textContent = timeLeft;
        // Update timer display
        timerContainer.style.display = "block";
        // Start timer
        startTimer();
    // For other quizzes hide the timer
    } else {
        clearInterval(timerInterval);
        timerContainer.style.display = "none"; // Hide timer for non-random quizzes
    }
    
    //Load the first question
    loadQuestion();  
}

// function to load a question
function loadQuestion() {
    // Check if there is another question to answer
    if (currentQuestionIndex >= quizData.length) {
        // If all questions are completed end the quiz
        endQuiz();
        return;
    }

    // Get the question data
    const currentQuiz = quizData[currentQuestionIndex];
    // Display the question
    questionEl.textContent = currentQuiz.question;
    // Reset the answer
    answerButtons.innerHTML = ""; 

    // Loop through the answers and create buttons or image options
    currentQuiz.answers.forEach(answer => {
            // if the question type is a picture-choice, display buttons as images
        if (currentQuiz.type === "picture-choice") {
            // Create image element for picture choice
            button = document.createElement("img");
            button.src = answer.src;
            // Add class for styling
            button.className = "picture-option"; 
            // When a button is clicked check if its correct
            button.onclick = () => checkAnswer(answer);
        // If its a multiple choice or true/false question display text buttons
        } else {
            // Create text-based button for multiple choice or true/false
            button = document.createElement("button");
            button.textContent = answer.text || "";
            // Add class for styling
            button.className = "btn";
            // When a button is clicked check if its correct
            button.onclick = () => checkAnswer(answer);
        }
        // Add button to the page
        answerButtons.appendChild(button);
    });
}

// Function to check users answer
function checkAnswer(selectedAnswer) {
     // If the answer chosen is right add 1 to the score
    if (selectedAnswer.correct) {
        score++;
        alert("Correct!");
    }
    else{
        alert("Wrong");
    }

    // Update the header
    quizHeader.textContent = `${quizName.toUpperCase()} QUIZ: SCORE: ${score} / ${quizData.length}`; 

    // Move to the next question
    currentQuestionIndex++;

     // If that was the final question end the quiz
    if (currentQuestionIndex >= quizData.length) {
        endQuiz(); 
    // If not load on to next question
    } else {
        loadQuestion();  
    }
}

// Function to start the quiz timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            endQuiz();
        }
    }, 1000); // run every second
}

// Function to end the quis and display the final score
function endQuiz() {
    // Stop timer and hide timer, question and the answer buttons
    clearInterval(timerInterval);  
    timerContainer.style.display = "none";  
    questionEl.style.display = "none";  
    answerButtons.style.display = "none";  
    // Show the final score and the retry butttons
    endScore.style.display = "block"; 
    endQuizBtns.style.display = "block"; 

    // clear the quiz header
    quizHeader.textContent = "";

    // Display final score
    document.getElementById("score").textContent = `${score} / ${quizData.length}`;

    // Play victory sound
    var audio = new Audio("audios/victory.mp3");
    audio.play();
}

// Function to retry the quiz the user just attempted
function retryQuiz() {
    // Reset score and question index
    score = 0;
    currentQuestionIndex = 0;

    // Hide end quiz buttons and final score
    endQuizBtns.style.display = "none"; 
    endScore.style.display = "none";  
    // Show question and answer buttons
    questionEl.style.display = "block";  
    answerButtons.style.display = "grid"; 

    // Reset timer
    timeLeft = 30;
    timerEl.textContent = timeLeft;

    // Only show the timer if its the random quiz
    if (quizName === "random") {
        timerContainer.style.display = "block";  
    } else {
        timerContainer.style.display = "none";  
    }

    // Load quiz data to restart the quiz
    loadQuizData();  
}

// Load quiz data when page is loaded
loadQuizData();