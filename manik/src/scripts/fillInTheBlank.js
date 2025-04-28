function submitFillAnswer() {
  let userAnswer = document.getElementById("user-answer").value.trim().toLowerCase();
  let correctAnswer = quizData[currentQuestionIndex].correctAnswer.toLowerCase();

  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").innerText = "✅ Correct!";
    score++;
  } else {
    document.getElementById("feedback").innerText = "❌ Incorrect!";
  }

  setTimeout(nextQuestion, 1000);
}
