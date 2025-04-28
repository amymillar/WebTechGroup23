function saveScore(score) {
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  let user = localStorage.getItem("currentUser") || "Guest";

  scores.push({ username: user, score: score, date: new Date().toLocaleString() });
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

function loadLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  let leaderboardBody = document.getElementById("leaderboard-body");

  leaderboardBody.innerHTML = scores
    .sort((a, b) => b.score - a.score)
    .map(score => `<tr><td>${score.username}</td><td>${score.score}</td><td>${score.date}</td></tr>`)
    .join("");
}


/* incase above code fails

function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    let user = localStorage.getItem("currentUser") || "Guest";

    scores.push({ username: user, score: score, date: new Date().toLocaleString() });
    localStorage.setItem("quizScores", JSON.stringify(scores));
}

function loadLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    let leaderboardBody = document.getElementById("leaderboard-body");

    leaderboardBody.innerHTML = scores
        .sort((a, b) => b.score - a.score)
        .map(score => `<tr><td>${score.username}</td><td>${score.score}</td><td>${score.date}</td></tr>`)
        .join("");
}

*/