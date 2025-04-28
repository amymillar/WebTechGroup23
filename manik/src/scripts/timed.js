let timeLeft = 10; // 10 seconds per question
let timer;

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion(); // Auto-skip if time runs out
    }
  }, 1000);
}

function loadQuestion() {
  startTimer(); // Start countdown on new question
}
