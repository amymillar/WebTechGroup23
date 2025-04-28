document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('category-container');
    const randomBtn = document.getElementById('randomQuizBtn');
  
    // 1) Load questions.json
    fetch('../data/questions.json')
      .then(res => {
        if (!res.ok) throw new Error('Could not load questions.json');
        return res.json();
      })
      .then(data => {
        // assume data is an object whose keys are your category names
        const categories = Object.keys(data);
  
        // 2) Render a button for each
        categories.forEach(cat => {
          const btn = document.createElement('button');
          btn.textContent = cat;
          btn.classList.add('category-btn');
          btn.addEventListener('click', () => startQuiz(cat));
          container.appendChild(btn);
        });
  
        // 3) Wire up “Random Quiz”
        randomBtn.addEventListener('click', () => {
          const randomCat = categories[Math.floor(Math.random() * categories.length)];
          startQuiz(randomCat);
        });
      })
      .catch(err => console.error(err));
  });
  
  // Replace with whatever function you use to actually launch the quiz:
  function startQuiz(category) {
    // e.g. save to storage and redirect:
    sessionStorage.setItem('selectedCategory', category);
    window.location.href = 'quiz.html';
  }
  