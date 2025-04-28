import { consoleBank } from '../../data/consoleBank.js';

const input = document.getElementById('answer-input');
const timeDisplay = document.getElementById('time-display');
const resultsDiv = document.getElementById('results');
const matchedList = document.getElementById('matched-list');
const restartBtn = document.getElementById('restart');

let timeLeft;
let timerId;
//Ensures there are no duplicates
const matched = new Set();

//Controls the correct and incorrect flash
function flash(element, correct) {
	const cls = correct ? 'flash-correct' : 'flash-incorrect';
	element.classList.add(cls);
	setTimeout(() => element.classList.remove(cls), 500);
	}

//Normalizes the input so it is case insensitive
function normalize(str) {
	return str.trim().toLowerCase();
	}

//Answer checking function
function checkAnswer(answer) {
//Normalizes
const norm = normalize(answer);
		//Iterates through the bank
		for (const c of consoleBank) {
		//Checks for full and name only matches
		const full = normalize(c.manufacturer + ' ' + c.name);
		const nameOnly = normalize(c.name);
		//If it matches then return the full manufacturer and name
		if ((norm === full || norm === nameOnly) && !matched.has(full)) {
		  matched.add(full);
		  return `${c.manufacturer} ${c.name}`;
		}}
	//If it doesnt match then return null
	return null;
	}

//End of quiz function to show the amount of matched consoles and the list of the entered items
function endQuiz() {
	//Stops the countdown, disables the input and shows the text
	clearInterval(timerId);
	input.disabled = true;
	resultsDiv.innerHTML = `
	<h3>Time's up!</h3>
	<p>You named ${matched.size} of ${consoleBank.length} consoles.</p>
	`;
	restartBtn.style.display = 'inline-block';
	}

//Starting the quiz clears the matched list to reset everything
function startQuiz() {
	matched.clear();
	matchedList.innerHTML = '';
	resultsDiv.innerHTML = '';
	//Re-Enables input
	input.disabled = false;
	restartBtn.style.display = 'none';
	input.value = '';
	input.focus();

	//90 seconds on the clock and functions for the countdown
	timeLeft = 90;
	timeDisplay.textContent = timeLeft;
	clearInterval(timerId);
	timerId = setInterval(() => {
		timeLeft -= 1;
		timeDisplay.textContent = timeLeft;
		if (timeLeft <= 0) endQuiz();
		}, 1000);
	}

//Restart button handler so it restarts the quiz when pressed
restartBtn.addEventListener('click', startQuiz);

//Answer submission logic
input.addEventListener('keydown', e => {
	if (e.key === 'Enter' && timeLeft > 0) {
		const value = input.value.trim();
		if (!value) return;
		const result = checkAnswer(value);
		const correct = result !== null;
		flash(input, correct);
		if (correct) {
		  const li = document.createElement('li');
		  li.textContent = result;
		  matchedList.appendChild(li);
		}
		input.value = '';
		}
});

startQuiz();
