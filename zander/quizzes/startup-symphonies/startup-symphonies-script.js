import { consoleBank } from '../../data/consoleBank.js';

//Filter so it only gets the ones that ive added a videoID to
const allQuestions = consoleBank.filter(c => c.videoID);

let player,
quizContainer,
qNumEl,
playBtn,
optsEl,
initialMarkup = null,
questions, 
currentIdx,
score;

//Youtube player with no height or width so the player cant just see what console the video is
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '0',
		width: '0',
		events: { onReady: initQuiz }
		});
	}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

//
function initQuiz() {
	quizContainer = document.getElementById('quiz-container');

	if (!initialMarkup) {
		initialMarkup = quizContainer.innerHTML;
		} else {
			quizContainer.innerHTML = initialMarkup;
			}

	qNumEl  = document.getElementById('question-number');
	playBtn = document.getElementById('play-button');
	optsEl  = document.getElementById('cards');

	//Picking 10 random consoles from "allQuestions"
	questions  = shuffle(allQuestions).slice(0, 10);
	//Starting score at 0 and question at the first
	currentIdx = 0;
	score      = 0;

	showQuestion();
	}

//Shuffling function that adds a key and sorts by that key
function shuffle(arr) {
	return arr
	.map(v => ({ v, r: Math.random() }))
	.sort((a, b) => a.r - b.r)
	.map(o => o.v);
	}

//Displaying the current question
function showQuestion() {
		optsEl.innerHTML = '';
		playBtn.disabled = false;
		
		//Results are shown if all the questions have been gone through
		if (currentIdx >= questions.length) {
			return showResults();
			}

	//Getting the current question and showing the question counter
	const q = questions[currentIdx];
	qNumEl.textContent = `Question ${currentIdx + 1} of ${questions.length}`;

	//Loading the video from the video id and preparing it to play when it is clicked
	player.loadVideoById(q.videoID);
	playBtn.onclick = () => player.playVideo();

	//15 Second answer countdown
	const timerDisplay = document.getElementById('time-display');
	let timeLeft = 15;
	timerDisplay.textContent = timeLeft;
	if (window.answerTimerId) clearInterval(window.answerTimerId);
	window.answerTimerId = setInterval(() => {
			timeLeft--;
			timerDisplay.textContent = timeLeft;
			if (timeLeft <= 0) {
			clearInterval(window.answerTimerId);
			nextQuestion();
			}
		}, 1000);

	//Finding the wrong answers and shuffling them
	const wrongs = shuffle(
	questions.filter(c => c.videoID !== q.videoID)
	).slice(0, 3);
	const opts = shuffle([q, ...wrongs]);

	//Making the cards 
	opts.forEach(opt => {
		const card = document.createElement('div');
		card.className       = 'card';
		card.dataset.correct = opt.videoID === q.videoID;
		card.onclick         = onSelect;

		const img = document.createElement('img');
		img.src = opt.image;
		img.alt = opt.name;
		card.append(img);

		const lbl = document.createElement('div');
		lbl.textContent = opt.name;
		card.append(lbl);

		optsEl.append(card);
		});
	}


//Stopping the timer and figuring out if it was right or not
function onSelect(e) {
	clearInterval(window.answerTimerId);
	const chosen  = e.currentTarget;
	const correct = chosen.dataset.correct === 'true';
	if (correct) score++;

	//Disabling further clicks and showing the result colour CSS
	document.querySelectorAll('.card').forEach(c => {
		c.onclick = null;
		c.classList.add(
		c.dataset.correct === 'true' ? 'correct' : 'incorrect'
		);
		});

	//Stopping the sound playing after the answer has been made 
	playBtn.disabled = true;

	//Wait a sec then go to the next question
	setTimeout(() => {
		currentIdx++;
		showQuestion();
		}, 1000);
	}

//Going to the next question
function nextQuestion() {
	currentIdx++;
	showQuestion();
	}

//Results function
function showResults() {
	quizContainer.innerHTML = `
	<div class="results">
	<h2>Your score: ${score} / ${questions.length}</h2>
	<div id="controls">
	<button class="btn" id="restart-button">Play Again</button>
	</div>
	</div>
	`;
	//Getting the restart button ready
	document
	.getElementById('restart-button')
	.addEventListener('click', initQuiz);
	}
