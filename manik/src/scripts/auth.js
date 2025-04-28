document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
});

function checkLoginStatus() {
  const user = localStorage.getItem("currentUser");
  if (!user && window.location.pathname !== "/login.html") {
    window.location.href = "login.html";
  }
}

function loginUser() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") return alert("Enter a username!");

  localStorage.setItem("currentUser", username);
  window.location.href = "index.html";
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}



/* incase shit above fails



document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

function checkLoginStatus() {
    const user = localStorage.getItem("currentUser");
    if (!user && window.location.pathname !== "/login.html") {
        window.location.href = "login.html"; // Redirect if not logged in
    }
}

function loginUser(username) {
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html"; // Redirect to home
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html"; // Redirect to login page
}


*/