// Global javascript to insert the navigation bar

// Get the navbar HTML file
fetch('/pages/navbar.html')
// convert the response into text
    .then(response => response.text())
    .then(data => {
        // Insert the navbar content into the container id
        document.getElementById('navbar-container').innerHTML = data;
    });