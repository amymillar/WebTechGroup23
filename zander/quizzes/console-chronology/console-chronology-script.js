//Importing my console bank list
import { consoleBank } from '../../data/consoleBank.js';

//Defining the amount of consoles that will be used and holding them in "selected"
const total = 10;
let selected;

//Getting all the elements to be used
const timelineEl = document.getElementById('timeline');
const cardsEl = document.getElementById('cards');
const checkBtn = document.getElementById('check');
const restartBtn = document.getElementById('restart');
const resultEl = document.getElementById('result');

//Setting up the quiz
function init() {
	//Ensuring the original consoleBank isnt modified
	selected = [...consoleBank]
	//Common shuffle method
	.sort(() => 0.5 - Math.random())
	//Defining the slice to only have 10 consoles
	.slice(0, total);
	
	//Sorting the slots so they are in chronological order
	//Copies selected and sorts it by year
	const ordered = [...selected].sort((a, b) => a.year - b.year);
	timelineEl.innerHTML = '';
	ordered.forEach(c => {
		//Controlling the timeline slot
		const slot = document.createElement('div');
		slot.className = 'slot';
		slot.dataset.year = c.year;
		//Handling the card drops into the timelines
		slot.addEventListener('dragover', e => e.preventDefault());
		slot.addEventListener('drop', onDrop);
		timelineEl.append(slot);
		});

	//Creating the draggable cards
	cardsEl.innerHTML = '';
	selected.sort(() => 0.5 - Math.random()).forEach(c => {
		//Shuffling the cards and creating them/ Making them be draggable
		const card = document.createElement('div');
		card.className = 'card';
		card.draggable = true;
		card.dataset.year = c.year;
		card.addEventListener('dragstart', onDragStart);

		//Showing the console image
		const img = document.createElement('img');
		img.src = c.image;
		img.alt = c.name;
		img.alt = `${c.manufacturer} ${c.name}`;
		img.draggable = false;
		card.append(img);

		//Showing the manufacturer and name label
		const label = document.createElement('div');
		label.textContent = `${c.manufacturer} ${c.name}`;
		card.append(label);

		cardsEl.append(card);
		});

	//Clears the results text and reenables the check button
	resultEl.textContent = '';
	checkBtn.disabled = false;
	}

//Handles the dragging and makes sure the image doesnt get dragged away
let dragged;
function onDragStart(e) {
	dragged = e.target.closest('.card');
	e.dataTransfer.setData('text/plain', '');
	}

//Handles the dropping and sends a card back to the pool if the space is already occupied
function onDrop(e) {
	e.preventDefault();
	if (dragged) {
		if (e.currentTarget.firstChild) {
		cardsEl.appendChild(e.currentTarget.firstChild);
		}
		e.currentTarget.appendChild(dragged);
		}
	}

//Functionality of the "Check answers" button
checkBtn.addEventListener('click', () => {
	let score = 0;
	document.querySelectorAll('#timeline .slot').forEach(slot => {

		const year = slot.dataset.year;
		const card = slot.firstChild;
		
		//If its correct then add the correct style and increase score
		if (card && card.dataset.year === year) {
			score++;
			card.classList.add('correct');
		//Else show incorrect 
		} else if (card) {
			card.classList.add('incorrect');
			}
		});
	//Showing the result and disabling the check button so you can't keep pressing it
	resultEl.textContent = `You placed ${score} out of ${total} correctly.`;
	checkBtn.disabled = true;
	});

//Restarting the game
restartBtn.addEventListener('click', init);

//Initializing the game
init();