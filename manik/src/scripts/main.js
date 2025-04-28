// src/scripts/main.js
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("../components/navbar.html",        "navbar-container");
    //loadComponent("../components/accessibility.html", "accessibility-container");
    loadComponent("../components/footer.html",        "footer-container");
  });
  
  function loadComponent(path, containerId) {
    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} loading ${path}`);
        return res.text();
      })
      .then(html => {
        document.getElementById(containerId).innerHTML = html;
      })
      .catch(err => console.error(err));
  }
  
  

  



/*  old js code, incase new code fails
document.addEventListener("DOMContentLoaded", function () {
  loadComponent("src/components/navbar.html", "navbar-container");
  loadComponent("src/components/footer.html", "footer-container");
});

function loadComponent(file, containerId) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}


function startRandomQuiz() {
    const quizzes = ["quiz1.html", "quiz2.html", "quiz3.html", "quiz4.html"]; // Replace with actual quiz pages
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    window.location.href = randomQuiz;
}

document.addEventListener("DOMContentLoaded", function() {
    function loadNavbar() {
        fetch("components/navbar.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("navbar-container").innerHTML = data;

                // Debugging logs
                console.log("Navbar loaded!");

                // Use setTimeout to attach event listeners properly
                setTimeout(() => {
                    const accessibilityIcon = document.querySelector('.accessibility-icon');
                    const accessibilityMenu = document.getElementById('accessibility-menu');

                    console.log("Accessibility Icon:", accessibilityIcon);
                    console.log("Accessibility Menu:", accessibilityMenu);

                    if (accessibilityIcon && accessibilityMenu) {
                        accessibilityIcon.addEventListener('click', function () {
                            console.log("Accessibility menu toggled"); // Debugging
                            accessibilityMenu.classList.toggle('hidden');
                        });
                    } else {
                        console.error("Error: Accessibility elements not found");
                    }

                    const highContrastToggle = document.getElementById('high-contrast-toggle');
                    if (highContrastToggle) {
                        highContrastToggle.addEventListener('change', function() {
                            document.body.style.backgroundColor = this.checked ? '#000' : '#f4f4f4';
                            document.body.style.color = this.checked ? '#fff' : '#000';
                        });
                    }

                    const largeTextToggle = document.getElementById('large-text-toggle');
                    if (largeTextToggle) {
                        largeTextToggle.addEventListener('change', function() {
                            document.body.style.fontSize = this.checked ? '1.5em' : '1em';
                        });
                    }
                }, 100); // Delay to ensure elements exist
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    loadNavbar();

    function loadFooter() {
        fetch("components/footer.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("footer-container").innerHTML = data;
                console.log("Footer loaded!");
            })
            .catch(error => console.error("Error loading footer:", error));
    }

    loadFooter();

    function loadSidebar() {
        fetch("components/sidebar.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("sidebar-container").innerHTML = data;
                console.log("sidebar loaded!");
            })
            .catch(error => console.error("Error loading sidebar:", error));
    }

    loadSidebar();
    
    // Ensure componenets load when the page loads
    document.addEventListener("DOMContentLoaded", function() {
        loadNavbar();
        loadFooter();
        loadSidebar();
    });

    //sounds
    // Load sounds
    const correctSound = new Audio("src/assets/audio/correct.mp3");
    const wrongSound = new Audio("src/assets/audio/wrong_buzzer.mp3");

    // Handle answer submission
    function submitAnswer(index) {
        const quiz = quizData[currentQuestionIndex];

        if (index === quiz.correct) {
            document.querySelectorAll(".quiz-option")[index].classList.add("correct");
            correctSound.play(); // Play correct answer sound
            score++;
        } else {
            document.querySelectorAll(".quiz-option")[index].classList.add("wrong");
            wrongSound.play(); // Play wrong answer sound
        }

        setTimeout(nextQuestion, 1000);
    }
    //sounds end

    //results page
    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            showResultsPage(); // Show results when all questions are done
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
    
    // Show Results Page
    function showResultsPage() {
        document.querySelector(".quiz-container").innerHTML = `
            <h1>Quiz Completed!</h1>
            <p>Your Score: ${score} / ${quizData.length}</p>
            <p>${getResultsMessage()}</p>
            <button onclick="restartQuiz()">Play Again</button>
        `;
    }
    
    // Generate custom messages based on score
    function getResultsMessage() {
        const percentage = (score / quizData.length) * 100;
        if (percentage === 100) return "Perfect Score! You're a genius!";
        if (percentage >= 70) return "Great Job! You did really well!";
        if (percentage >= 50) return "Good effort! Try again for a higher score!";
        return "Keep practicing! You can do better!";
    }
    
    // Restart quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }
    //results page end    

    //timer ah

    let timeLeft = 10; // Set timer duration in seconds
    let timerInterval;

    // Load the first question
    document.addEventListener("DOMContentLoaded", loadQuestion);

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
            button.disabled = false;
        });

        updateProgress();
        startTimer();
    }

    // Start a timer for each question
    function startTimer() {
        clearInterval(timerInterval); // Clear any previous timers
        timeLeft = 10; // Reset time

        document.getElementById("time-left").innerText = timeLeft;
    
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("time-left").innerText = timeLeft;

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                nextQuestion(); // Auto-skip when time runs out
            }
        }, 1000);
    }  

    // Move to the next question
    function nextQuestion() {
        clearInterval(timerInterval);
        currentQuestionIndex++;
        loadQuestion();
    }

    //timer ah end

    //local ascores
    // Show Results Page
    function showResultsPage() {
        saveScore(score); // Save the score before showing results

        document.querySelector(".quiz-container").innerHTML = `
            <h1>Quiz Completed!</h1>
            <p>Your Score: ${score} / ${quizData.length}</p>
            <p>${getResultsMessage()}</p>
            <button onclick="restartQuiz()">Play Again</button>
            <button onclick="viewLeaderboard()">View Leaderboard</button>
        `;
    }

    // Save score to local storage
    function saveScore(score) {
        let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
            scores.push({ date: new Date().toLocaleString(), score: score });
        localStorage.setItem("quizScores", JSON.stringify(scores));
    }

    //local scores end
    //dynamic injection
    document.addEventListener("DOMContentLoaded", function () {
        loadComponent("components/navbar.html", "navbar-container");
        loadComponent("components/sidebar.html", "sidebar-container");
        loadComponent("components/footer.html", "footer-container");
    });
    
    function loadComponent(file, containerId) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${file}:`, error));
    }
    
});

*/