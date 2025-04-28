let questionStartTime;

function startTimer() {
  questionStartTime = Date.now();
}

function submitAnswer(index) {
  let elapsedTime = (Date.now() - questionStartTime) / 1000;
  let quiz = quizData[currentQuestionIndex];
  let correct = index === quiz.correct;

  saveStats(correct, elapsedTime);
  correct ? score++ : null;
  nextQuestion();
}

function saveStats(correct, timeTaken) {
  let stats = JSON.parse(localStorage.getItem("quizStats")) || [];
  stats.push({ correct, timeTaken });
  localStorage.setItem("quizStats", JSON.stringify(stats));
}


/* incase shit abocve fgails

let questionStartTime;

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    document.getElementById("time-left").innerText = timeLeft;
    questionStartTime = Date.now(); // Store start time

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function submitAnswer(index) {
    let elapsedTime = (Date.now() - questionStartTime) / 1000; // Time in seconds
    let quiz = quizData[currentQuestionIndex];
    let correct = index === quiz.correct;

    saveStats(correct, elapsedTime);
    correct ? score++ : null;
    nextQuestion();
}

function saveStats(correct, timeTaken) {
    let stats = JSON.parse(localStorage.getItem("quizStats")) || [];
    stats.push({ correct, timeTaken });
    localStorage.setItem("quizStats", JSON.stringify(stats));
}

*/