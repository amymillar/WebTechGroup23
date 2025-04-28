// src/scripts/quiz.js
document.addEventListener("DOMContentLoaded", () => {
  let questionsData = null;
  fetch('../data/questions.json')
    .then(r => {
      if (!r.ok) throw new Error(`Loading JSON failed: ${r.status}`);
      return r.json();
    })
    .then(data => {
      questionsData = data;
      initQuiz();
    })
    .catch(err => console.error(err));

  // DOM references
  const heroCont = document.getElementById('hero-container');
  const selectionCont = document.getElementById('quiz-selection-container');
  const quizOptCont = document.getElementById('quiz-options-container');
  const quizOpt = document.getElementById('quiz-options');
  const quizCont = document.getElementById('quiz-container');
  const resultsCont = document.getElementById('results-container');
  const timerDisp = document.getElementById('question-timer');
  const QuesTxt = document.getElementById('question-text');
  const ansList = document.getElementById('answer-list');
  const skipBtn = document.getElementById('skip-button');
  const retryBtn = document.getElementById('retry-button');
  const scoreSpan = document.getElementById('score');

  // sfx
  const correctSnd = new Audio('../assets/sfx/correct.mp3');
  const wrongSnd = new Audio('../assets/sfx/incorrect.mp3');
  const passSnd = new Audio('../assets/sfx/pass.mp3');
  const failSnd = new Audio('../assets/sfx/fail.mp3');

  // expose sfx for accessibility.js
  window.sfxList = [ correctSnd, wrongSnd, passSnd, failSnd ];

  let questions = [], idx = 0, score = 0, timerId;
  const timeLimit = 10;

  //saving volume to local storage
  const savedVol = parseFloat(localStorage.getItem('sfxVol'));
  if (!isNaN(savedVol)) {
    window.sfxList.forEach(a => a.volume = savedVol);
  }


  function initQuiz() {
    showOptions();
    retryBtn.addEventListener('click', () => {
      resetFlow();
      showOptions();
    });

    const randBtn = document.getElementById('random-quiz-btn');
    if (randBtn) {
      randBtn.addEventListener('click', () => {
        // pick a random quiz
        const keys = Object.keys(questionsData);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        // start that quiz
        startQuiz(randomKey);
      });
    }

    skipBtn.addEventListener('click', () => {
      clearInterval(timerId);
      answer(false); //next question(wrong, update fidelity later)
    });
    
  }

  function showOptions() {
    selectionCont.classList.remove('hidden');
    quizCont.classList.add('hidden');
    resultsCont.classList.add('hidden');
    quizOpt.innerHTML = '';
    Object.keys(questionsData).forEach(key => {
      const qz = questionsData[key];
      const btn = document.createElement('button');
      btn.className = 'quiz-options';
      btn.textContent = key;
      btn.title = qz.description;
      btn.onclick = () => startQuiz(key);
      quizOpt.appendChild(btn);
    });
  }

  function startQuiz(key) {
    questions = questionsData[key].questions;
    idx = 0; score = 0;
    heroCont.classList.add('hidden');
    selectionCont.classList.add('hidden');
    quizCont.classList.remove('hidden');
    showQuestion();
  }

  function showQuestion() {
    if (idx >= questions.length) return showResults();
    const q = questions[idx];
    QuesTxt.textContent = q.question;
    ansList.innerHTML = '';
    q.answers.forEach(opt => {
      const li = document.createElement('li');
      const b  = document.createElement('button');
      b.textContent = opt;
      b.onclick = () => answer(opt === q.correct);
      li.appendChild(b);
      ansList.appendChild(li);
    });
    startTimer();
  }

  function startTimer() {
    let t = timeLimit;
    timerDisp.textContent = `Time: ${t}s`;
    clearInterval(timerId);
    timerId = setInterval(() => {
      t--;
      timerDisp.textContent = `Time: ${t}s`;
      if (t <= 0) {
        clearInterval(timerId);
        answer(false);
      }
    }, 1000);
  }

  function answer(isRight) {
    clearInterval(timerId);
    if (isRight) { score++; correctSnd.play(); }
    else { wrongSnd.play(); }
    idx++;
    setTimeout(showQuestion, 500);
  }

  function showResults() {
    quizCont.classList.add('hidden');
    resultsCont.classList.remove('hidden');
    scoreSpan.textContent = `${score}/${questions.length}`;
    const pct = (score / questions.length) * 100;
    (pct >= 50 ? passSnd : failSnd).play();
  }

  function sfxStop() {
    correctSnd.pause(); correctSnd.currentTime = 0;
    wrongSnd.pause(); wrongSnd.currentTime = 0;
    passSnd.pause(); passSnd.currentTime = 0;
    failSnd.pause(); failSnd.currentTime = 0;
  }

  function resetFlow() {
    clearInterval(timerId);
    sfxStop();
    heroCont.classList.remove('hidden');
    selectionCont.classList.remove('hidden');
    quizCont.classList.add('hidden');
    resultsCont.classList.add('hidden');
  }
});




/* incase above code faisl
const quizData = [];
fetch("data/questions.json")
  .then(response => response.json())
  .then(data => (quizData.push(...data), loadQuestion()));

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  if (currentQuestionIndex >= quizData.length) {
    showResultsPage();
    return;
  }

  const quiz = quizData[currentQuestionIndex];
  document.getElementById("quiz-question").innerText = quiz.question;

  document.querySelectorAll(".quiz-option").forEach((button, index) => {
    button.innerText = quiz.options[index];
    button.classList.remove("correct", "wrong");
  });
}

function submitAnswer(index) {
  const quiz = quizData[currentQuestionIndex];
  if (index === quiz.correct) {
    score++;
  }
  currentQuestionIndex++;
  loadQuestion();
}

const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
    { question: "Which planet is closest to the sun?", options: ["Earth", "Venus", "Mercury", "Mars"], correct: 2 },
    { question: "What is 5 + 3?", options: ["5", "8", "10", "3"], correct: 1 }
];

let currentQuestionIndex = 0;
let score = 0;

// Load the first question
document.addEventListener("DOMContentLoaded", loadQuestion);

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        document.querySelector(".quiz-container").innerHTML = `<h1>Quiz Completed!</h1><p>Your score: ${score}/${quizData.length}</p>`;
        return;
    }

    const quiz = quizData[currentQuestionIndex];
    document.getElementById("quiz-question").innerText = quiz.question;

    document.querySelectorAll(".quiz-option").forEach((button, index) => {
        button.innerText = quiz.options[index];
        button.classList.remove("correct", "wrong");
        button.disabled = false;
    });

    updateProgress();
}

// Handle answer submission
function submitAnswer(index) {
    const quiz = quizData[currentQuestionIndex];

    if (index === quiz.correct) {
        document.querySelectorAll(".quiz-option")[index].classList.add("correct");
        score++;
    } else {
        document.querySelectorAll(".quiz-option")[index].classList.add("wrong");
    }

    setTimeout(nextQuestion, 1000);
}

// Load the next question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Update progress bar
function updateProgress() {
    const progress = document.querySelector(".progress");
    const percentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progress.style.width = percentage + "%";
}

// Handle keyboard navigation
document.addEventListener("keydown", (event) => {
    const options = document.querySelectorAll(".quiz-option");

    if (event.key >= "1" && event.key <= "4") {
        submitAnswer(parseInt(event.key) - 1);
    }

    if (event.key === "Enter") {
        nextQuestion();
    }

    if (event.key === "ArrowRight") {
        nextQuestion();
    }

    const quizData = [];
fetch("data/questions.json")
    .then(response => response.json())
    .then(data => (quizData.push(...data), loadQuestion()));

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResultsPage();
        return;
    }

    const quiz = quizData[currentQuestionIndex];
    document.getElementById("quiz-question").innerText = quiz.question;

    document.querySelectorAll(".quiz-option").forEach((button, index) => {
        button.innerText = quiz.options[index];
        button.classList.remove("correct", "wrong");
    });
}

function submitAnswer(index) {
    const quiz = quizData[currentQuestionIndex];
    if (index === quiz.correct) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

});

*/