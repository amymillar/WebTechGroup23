const quizData = [
    {
        question: "What is the name of Mario's brother in the Super Mario series?", 
        options: ["Luigi", "Bowser", "Toad", "Wario"], 
        answer: "Luigi"
    },
    {
        question: "What is the first level of Super Mario Bros. called?", 
        options: ["Bowser’s Castle", "World 1-1", "Mushroom Kingdom", "Toad’s Fortress"], 
        answer: "World 1-1"
    }, 
    {
        question: "What is the first PlayStation console developed by Sony?", 
        options: ["Nintendo 64", "Sega Saturn", "Xbox", "PlayStation"], 
        answer: "PlayStation"
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.querySelector("#question-container");
    const answerButtons = document.querySelector("#answer-buttons");
    const nextBtn = document.querySelector("#next-btn");
    const timerElement = document.createElement("div"); // Timer element
    timerElement.id = "timer";
    document.querySelector("#quiz-container").insertBefore(timerElement, nextBtn);
    
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const timeLimit = 10; // 10 seconds per question

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextBtn.innerText = "Next";
        nextBtn.style.display = "none";
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = quizData[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            button.addEventListener("click", selectAnswer);
        });

        startTimer(timeLimit);
    }

    function resetState() {
        clearTimeout(timer);
        nextBtn.style.display = "none";
        timerElement.innerText = "";
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function startTimer(seconds) {
        let timeLeft = seconds;
        timerElement.innerText = `Time Left: ${timeLeft}s`;

        timer = setInterval(() => {
            timeLeft--;
            timerElement.innerText = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                disableButtons();
                timerElement.innerText = "Time's up!";
                nextBtn.style.display = "block";
            }
        }, 1000);
    }

    function disableButtons() {
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
        });
    }

    function selectAnswer(e) {
        clearInterval(timer);
        const selectedBtn = e.target;
        const correctAnswer = quizData[currentQuestionIndex].answer;

        if (selectedBtn.innerText === correctAnswer) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
            Array.from(answerButtons.children).forEach(button => {
                if (button.innerText === correctAnswer) {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
        }
        nextBtn.style.display = "block";
    }

    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showScore();
        }
    });

    function showScore() {
        resetState();
        questionElement.innerText = `Your Score: ${score} / ${quizData.length}`;
        nextBtn.innerText = "Play Again";
        nextBtn.style.display = "block";
        nextBtn.removeEventListener("click", showQuestion);
        nextBtn.addEventListener("click", startQuiz);
    }

    startQuiz();
});
